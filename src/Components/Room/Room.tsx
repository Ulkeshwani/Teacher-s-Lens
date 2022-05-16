import React, { useState, useRef, useEffect, useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import io from "socket.io-client";
import { WebRTCUser } from "./types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDB, logout } from "utils/firebase";
import { useLocation, useHistory } from "react-router-dom";
import Video from "Components/Video";

import "./Room.styles.css";
import { ChatNavigation } from "Components/ChatSidebar/Chat.component";

type LocationProps = {
  state: {
    roomID: string;
  };
};

type MessageProps = {
  yourself: boolean;
  message: string;
};

const SOCKET_SERVER_URL = "wss://teachers-lens-websocket-server.glitch.me";

const Room = () => {
  const senders = useRef<Array<RTCRtpSender>>([]);
  const [Hide, setHide] = useState(false);
  const [mic, setMic] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const sendChannel = useRef<RTCDataChannel>();
  const [messages, setMessages] = useState<Array<MessageProps>>([]);
  const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation<LocationProps>();
  const [isUserReady, setIsUserReady] = useState(false);
  const [roomID, setRoomID] = useState(
    location.state?.state?.roomID
      ? location.state?.state?.roomID
      : window.location.pathname.split("/")[2]
  );

  const handleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleMic = () => {
    setIsVideoOn(!mic);
  };

  const handleClose = () => {
    setHide(!Hide);
  };

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

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
          frameRate: { max: 59 },
        },
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socketRef.current) return;
      socketRef.current.emit("join_room", {
        room: roomID,
        email: user?.email,
      });
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);

  const createPeerConnection = useCallback(
    (socketID: string, email: string) => {
      try {
        const pc = new RTCPeerConnection(pc_config);

        pc.onicecandidate = (e) => {
          if (!(socketRef.current && e.candidate)) return;
          console.log("onicecandidate");
          socketRef.current.emit("candidate", {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
            candidateReceiveID: socketID,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        pc.ontrack = (e) => {
          console.log("ontrack success");
          setUsers((oldUsers) =>
            oldUsers
              .filter((user) => user.id !== socketID)
              .concat({
                id: socketID,
                email,
                stream: e.streams[0],
              })
          );
        };

        if (localStreamRef.current) {
          console.log("localstream add");
          localStreamRef.current.getTracks().forEach((track) => {
            if (!localStreamRef.current) return;
            pc.addTrack(track, localStreamRef.current);
          });
        } else {
          console.log("no local stream");
        }

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    []
  );

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {});
    console.log(roomID);
    getLocalStream();

    socketRef.current.on(
      "all_users",
      (allUsers: Array<{ id: string; email: string }>) => {
        allUsers.forEach(async (user) => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.email);
          if (!(pc && socketRef.current)) return;
          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log("create offer success");
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socketRef.current.emit("offer", {
              sdp: localSdp,
              offerSendID: socketRef.current.id,
              offerSendEmail: "offerSendSample@sample.com",
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      }
    );

    socketRef.current.on(
      "getOffer",
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendEmail: string;
      }) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        console.log("get offer");
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log("answer set remote description success");
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit("answer", {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      }
    );

    socketRef.current.on(
      "getAnswer",
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log("get answer");
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );

    socketRef.current.on(
      "getCandidate",
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendID: string;
      }) => {
        console.log("get candidate");
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log("candidate add success");
      }
    );

    socketRef.current.on("user_exit", (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
      setIsUserReady(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection, getLocalStream]);

  const sendMessage = (message: string) => {
    if (sendChannel.current) {
      console.log(sendChannel.current);
      sendChannel.current.send(message);
      setMessages((messages) => [...messages, { yourself: false, message }]);
    }
  };

  return (
    <React.Fragment>
      {isUserReady ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isUserReady}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <section className="Video_wrapper">
        <div className="Video_Host_Container">
          <div className="video-overlay "> The Attendee Name </div>
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
        socket={socketRef.current}
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
