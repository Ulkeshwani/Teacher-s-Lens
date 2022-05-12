import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import Video from "Components/Video";

import "./Room.styles.css";
import { ChatNavigation } from "Components/ChatSidebar/Chat.component";
import data from "@iconify/icons-eva/arrow-ios-forward-fill";

type CallProperties = {
  roomID?: string;
};

type MessageProps = {
  yourself: boolean;
  message: string;
};

const Room = ({ roomID }: CallProperties) => {
  const localUuid: string = roomID as string;
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);
  const senders = useRef<Array<RTCRtpSender>>([]);
  const [Hide, setHide] = useState(false);
  const [mic, setMic] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const sendChannel = useRef<RTCDataChannel>();
  const [messages, setMessages] = useState<Array<MessageProps>>([]);

  let newSocket = io.connect("ws://localhost:8080");

  const handleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleMic = () => {
    setIsVideoOn(!mic);
  };

  const handleClose = () => {
    setHide(!Hide);
  };

  let localVideoRef = useRef<HTMLVideoElement>(null);

  let sendPC: RTCPeerConnection;
  let receivePCs: { [socketId: string]: RTCPeerConnection };
  let localStream: MediaStream;

  const pc_config = {
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun.stunprotocol.org:3478",
        ],
      },
    ],
  };

  useEffect(() => {
    newSocket.on("userEnter", (data: { id: string }) => {
      createReceivePC(data.id, newSocket);
    });

    newSocket.on("allUsers", (data: { users: Array<{ id: string }> }) => {
      let len = data.users.length;
      for (let i = 0; i < len; i++) {
        createReceivePC(data.users[i].id, newSocket);
      }
    });

    newSocket.on("userExit", (data: { id: string }) => {
      receivePCs[data.id].close();
      delete receivePCs[data.id];
      setUsers((users) => users.filter((user) => user.id !== data.id));
    });

    newSocket.on(
      "getSenderAnswer",
      async (data: { sdp: RTCSessionDescription }) => {
        try {
          console.log("get sender answer");
          console.log(data.sdp);
          await sendPC.setRemoteDescription(
            new RTCSessionDescription(data.sdp)
          );
          console.log(sendPC);
        } catch (error) {
          console.log(error);
        }
      }
    );

    newSocket.on(
      "getSenderCandidate",
      async (data: { candidate: RTCIceCandidateInit }) => {
        try {
          console.log("get sender candidate");
          if (!data.candidate) return;
          sendPC.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log("candidate add success");
        } catch (error) {
          console.log(error);
        }
      }
    );

    newSocket.on(
      "getReceiverAnswer",
      async (data: { id: string; sdp: RTCSessionDescription }) => {
        try {
          console.log(`get socketID(${data.id})'s answer`);
          let pc: RTCPeerConnection = receivePCs[data.id];
          await pc.setRemoteDescription(data.sdp);
          console.log(`socketID(${data.id})'s set remote sdp success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    newSocket.on(
      "getReceiverCandidate",
      async (data: { id: string; candidate: RTCIceCandidateInit }) => {
        try {
          console.log(data);
          console.log(`get socketID(${data.id})'s candidate`);
          let pc: RTCPeerConnection = receivePCs[data.id];
          if (!data.candidate) return;
          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log(`socketID(${data.id})'s candidate add success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({
        audio: mic,
        video: isVideoOn
          ? {
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
              frameRate: { max: 59 },
            }
          : false,
      })
      .then((stream) => {
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        localStream = stream;
        sendPC = createSenderPeerConnection(newSocket, localStream);
        sendChannel.current = sendPC.createDataChannel("sendChannel");
        sendChannel.current.onopen = (event) => {
          console.log("WebRTC Data channel is Now Open", event);
        };
        sendChannel.current.onmessage = handleReceiveMessage;
        console.log("Data Channel State", sendChannel);
        createSenderOffer(newSocket);
        newSocket.emit("joinRoom", {
          id: newSocket.id,
          roomID: localUuid,
        });
      })
      .catch((error) => {
        console.log(`getUserMedia error: ${error}`);
      });
  }, []);

  const createReceivePC = (id: string, newSocket: SocketIOClient.Socket) => {
    try {
      console.log(`socketID(${id}) user entered`);
      let pc = createReceiverPeerConnection(id, newSocket);
      createReceiverOffer(pc, newSocket, id);
    } catch (error) {
      console.log(error);
    }
  };

  //Create Offer
  const createSenderOffer = async (newSocket: SocketIOClient.Socket) => {
    try {
      let sdp = await sendPC.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      console.log("create sender offer success");
      await sendPC.setLocalDescription(new RTCSessionDescription(sdp));
      newSocket.emit("senderOffer", {
        sdp,
        senderSocketID: newSocket.id,
        roomID: localUuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createReceiverOffer = async (
    pc: RTCPeerConnection,
    newSocket: SocketIOClient.Socket,
    senderSocketID: string
  ) => {
    try {
      console.log(pc);
      pc.ondatachannel = (event) => {
        console.log("On Data Channel Fired", event);
        sendChannel.current = event.channel;
        sendChannel.current.onmessage = handleReceiveMessage;
      };
      let sdp = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      console.log("create receiver offer success");
      await pc.setLocalDescription(new RTCSessionDescription(sdp));

      newSocket.emit("receiverOffer", {
        sdp,
        receiverSocketID: newSocket.id,
        senderSocketID,
        roomID: localUuid,
      });
      console.log(senderSocketID);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReceiveMessage = (event: MessageEvent<any>) => {
    setMessages((messages) => [
      ...messages,
      { yourself: true, message: event.data },
    ]);
  };

  //callUser
  const createSenderPeerConnection = (
    newSocket: SocketIOClient.Socket,
    localStream: MediaStream
  ): RTCPeerConnection => {
    let pc = new RTCPeerConnection(pc_config);
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("sender PC onicecandidate");
        newSocket.emit("senderCandidate", {
          candidate: e.candidate,
          senderSocketID: newSocket.id,
        });
      }
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    if (localStream) {
      console.log("localstream add");
      localStream.getTracks().forEach((track) => {
        senders.current.push(pc.addTrack(track, localStream));
      });
    } else {
      console.log("no local stream");
    }
    // return pc
    return pc;
  };

  const createReceiverPeerConnection = (
    socketID: string,
    newSocket: SocketIOClient.Socket
  ): RTCPeerConnection => {
    let pc = new RTCPeerConnection(pc_config);
    // add pc to peerConnections object
    receivePCs = { ...receivePCs, [socketID]: pc };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("receiver PC onicecandidate");
        newSocket.emit("receiverCandidate", {
          candidate: e.candidate,
          receiverSocketID: newSocket.id,
          senderSocketID: socketID,
        });
      }
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    pc.ontrack = (e) => {
      console.log("ontrack success");
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: e.streams[0],
        },
      ]);
    };

    // return pc
    return pc;
  };

  const sendMessage = (message: string) => {
    if (sendChannel.current) {
      console.log(sendChannel.current);
      sendChannel.current.send(message);
      setMessages((messages) => [...messages, { yourself: false, message }]);
    }
  };

  return (
    <React.Fragment>
      <section className="Video_wrapper">
        <div className="Video_Host_Container">
          {/* <div className="video-overlay "> The Attendee Name </div> */}
          <video muted={mic} ref={localVideoRef} autoPlay />
          {users.length > 0
            ? users.map((user, index) => {
                return <Video key={index} stream={user.stream} muted={mic} />;
              })
            : null}
        </div>
      </section>
      <ChatNavigation
        sendMessage={sendMessage}
        messages={messages}
        roomId={roomID}
        socket={newSocket}
        senders={senders}
        setHide={handleClose}
        Hide={Hide}
        micMuted={mic}
        setMicMuted={handleMic}
        checkVideo={isVideoOn}
        setCheckVideo={handleVideo}
      />
    </React.Fragment>
  );
};

export default Room;
