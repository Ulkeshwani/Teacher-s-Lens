import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import {
  MicOff,
  Mic,
  ScreenShare,
  Camera,
  Groups,
  Chat,
} from "@mui/icons-material";

import { getDate } from "Helpers/Helpers";
import CustomButton from "Components/CustomButton/CustomButton.component";
import "./Chat.styles.css";

export const ChatNavigation: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <ChatDrawer Hide={props.Hide} setHide={props.setHide} />
      <VideoControlPanel
        Hide={props.Hide}
        setHide={props.setHide}
        senders={props.senders}
        micMuted={props.micMuted}
        setMicMuted={props.setMicMuted}
        checkVideo={props.checkVideo}
        setCheckVideo={props.setCheckVideo}
      />
    </React.Fragment>
  );
};

export const VideoControlPanel = (props: Props) => {
  let localStream: MediaStream;
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(getDate());
  }, []);
  const _handleShareScreen = async () => {
    //@ts-ignore
    await navigator.mediaDevices.getDisplayMedia().then((stream) => {
      const screenTrack = stream.getTracks()[0];
      props.senders.current
        .find((sender) => sender.track?.kind === "video")
        ?.replaceTrack(screenTrack);
      screenTrack.onended = async () => {
        navigator.mediaDevices
          .getUserMedia({
            audio: props.micMuted,
            video: {
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
              frameRate: { max: 59 },
            },
          })
          .then((stream) => {
            localStream = stream;
            props.senders.current
              .find((sender) => sender.track?.kind === "video")
              ?.replaceTrack(localStream.getVideoTracks()[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    });
  };
  return (
    <div className="Bottom_Navigation_Wrapper">
      <span className="Daytime">{time}</span>
      <div className="Bottom_Navigation_Container">
        <CustomButton onClick={() => props.setHide()} title="Chat">
          <Chat style={{ color: "white" }} />
        </CustomButton>
        <CustomButton title="Mute / Unmute" onClick={props.setMicMuted}>
          {props.micMuted ? (
            <Mic style={{ color: " white" }} />
          ) : (
            <MicOff style={{ color: "white" }} />
          )}
        </CustomButton>
        <CustomButton title="Webcam On / Off">
          <Camera style={{ color: "white" }} />
        </CustomButton>
        <CustomButton onClick={_handleShareScreen} title="Share Screen">
          <ScreenShare style={{ color: "white" }} />
        </CustomButton>
        <CustomButton title="Peoples">
          <Groups style={{ color: "white" }} />
        </CustomButton>
      </div>
    </div>
  );
};

export const ChatDrawer: React.FC<MicroServicesProps> = ({ Hide, setHide }) => {
  return (
    <Drawer
      anchor="right"
      open={Hide}
      onBackdropClick={setHide}
      sx={{
        display: { xs: "none", sm: "flex" },
        "& .MuiDrawer-paper": {
          marginTop: 2,
          marginRight: 2,
          boxSizing: "border-box",
          width: 450,
          borderRadius: 1,
        },
      }}
    >
      <section className="inCallMessage_Wrapper">
        <span className="Chat_header">In-Call Messages</span>
        <div className="inCallMessage_alert">
          Message Can Be Only Seen By People In the Call and Deleted When Call
          Ends
        </div>
        <article className="inCallMessage_Container"></article>
      </section>
    </Drawer>
  );
};

interface MicroServicesProps {
  Hide: boolean;
  setHide: () => void;
}
interface IChatProps {
  localStream?: MediaStream;
  senders: React.MutableRefObject<RTCRtpSender[]>;
  micMuted: boolean;
  checkVideo: boolean;
  setCheckVideo: () => void;
  setMicMuted: () => void;
}

type Props = MicroServicesProps & IChatProps;
