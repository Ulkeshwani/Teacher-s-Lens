import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import Video from "Components/Video";

import "./Room.styles.css";

type CallProperties = {
  roomID?: string;
};

const Room = ({ roomID }: CallProperties) => {
  const localUuid: string = roomID as string;
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);
  const senders = useRef<Array<RTCRtpSender>>([]);

  let localVideoRef = useRef<HTMLVideoElement>(null);

  let sendPC: RTCPeerConnection;
  let receivePCs: { [socketId: string]: RTCPeerConnection };
  let localStream: MediaStream;

  const pc_config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    let newSocket = io.connect("http://localhost:8080");

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
        audio: false,
        video: {
          width: 480,
          height: 480,
        },
      })
      .then((stream) => {
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        localStream = stream;

        sendPC = createSenderPeerConnection(newSocket, localStream);
        createSenderOffer(newSocket);

        newSocket.emit("joinRoom", {
          id: newSocket.id,
          roomID: localUuid,
        });
        updateLayout();
      })
      .catch((error) => {
        console.log(`getUserMedia error: ${error}`);
      });
  }, []);
  const updateLayout = () => {
    var rowHeight = "70vh";
    var colWidth = "80vw";

    var numVideos = Object.keys(users).length + 1; // add one to include local video

    if (numVideos > 1 && numVideos <= 4) {
      // 2x2 grid
      rowHeight = "48vh";
      colWidth = "48vw";
    } else if (numVideos > 4) {
      // 3x3 grid
      rowHeight = "32vh";
      colWidth = "32vw";
    }

    document.documentElement.style.setProperty(`--rowHeight`, rowHeight);
    document.documentElement.style.setProperty(`--colWidth`, colWidth);
  };
  const _handleShareScreen = async () => {
    //@ts-ignore
    await navigator.mediaDevices.getDisplayMedia().then((stream) => {
      const screenTrack = stream.getTracks()[0];
      senders.current
        .find((sender) => sender.track?.kind === "video")
        ?.replaceTrack(screenTrack);
      screenTrack.onended = async () => {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              width: 480,
              height: 480,
            },
          })
          .then((stream) => {
            localStream = stream;
            // console.log(localStream?.getVideoTracks()[0]);
            senders.current
              .find((sender) => sender.track?.kind === "video")
              ?.replaceTrack(localStream.getVideoTracks()[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    });
  };
  const createReceivePC = (id: string, newSocket: SocketIOClient.Socket) => {
    try {
      console.log(`socketID(${id}) user entered`);
      let pc = createReceiverPeerConnection(id, newSocket);
      createReceiverOffer(pc, newSocket, id);
    } catch (error) {
      console.log(error);
    }
  };

  const createSenderOffer = async (newSocket: SocketIOClient.Socket) => {
    try {
      let sdp = await sendPC.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
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
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <video muted ref={localVideoRef} autoPlay controls></video>

      {users.map((user, index) => {
        return <Video key={index} stream={user.stream} />;
      })}
      {/* <button onClick={_handleShareScreen}>Share Screen</button> */}
    </>
  );
};

export default Room;
