import React, { useState, useEffect } from "react";
import { Drawer, TextField, Grid } from "@mui/material";
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

export const ChatNavigation = (props) => {
  return (
    <React.Fragment>
      <ChatDrawer
        Hide={props.Hide}
        setHide={props.setHide}
        socket={props.socket}
        roomId={props.roomId}
        sendMessage={props.sendMessage}
        messages={props.messages}
      />
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

export const VideoControlPanel = (props) => {
  let localStream;
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

export const ChatDrawer = ({
  Hide,
  setHide,
  socket,
  sendMessage,
  messages,
}) => {
  const [text, setText] = useState("");
  let roomID = window.location.pathname.split("/")[2];
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
        <article
          className="inCallMessage_Container"
          style={{
            height: "700px",
            overflowY: "scroll",
          }}
        >
          {messages.map((i) => {
            let index = messages.indexOf(i);
            return (
              <div key={index} className="inCallMessage">
                <p color="white">
                  {i.message}
                  <span color="white" className="time">
                    {i.timestamp}
                  </span>
                </p>
              </div>
            );
          })}
        </article>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Type a message"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: "default",
                  color: "black",
                  marginTop: "10px",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  padding: "5px",
                },
              }}
              value={text}
              variant="standard"
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid item>
            <CustomButton
              style={{ marginTop: "10px" }}
              variant="contained"
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            >
              Send Message
            </CustomButton>
          </Grid>
        </Grid>
      </section>
    </Drawer>
  );
};
