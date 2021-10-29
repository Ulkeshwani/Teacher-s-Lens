import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import {
  ChatDots,
  Microphone,
  Camera,
  DesktopDevice,
  PeopleGroup,
} from "akar-icons";
import { useLocation } from "react-router-dom";

import CustomButton from "Components/CustomButton/CustomButton.component";
import "./Chat.styles.css";

interface MicroServicesProps {
  Hide?: boolean;
  setHide: () => void;
}

export const ChatNavigation: React.FC = () => {
  const [Hide, setHide] = useState(false);

  const handleClose = () => {
    setHide(!Hide);
  };
  return (
    <React.Fragment>
      <ChatDrawer Hide={Hide} setHide={handleClose} />
      <VideoControlPanel Hide={Hide} setHide={handleClose} />
    </React.Fragment>
  );
};

const VideoControlPanel: React.FC<MicroServicesProps> = ({ setHide }) => {
  const [time, setTime] = useState("");
  const params = new URLSearchParams(window.location.search);
  const roomID = params.get("roomID");
  const getDate = () => {
    let date = new Date();
    let hours: string | number =
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    setTime(hours + ":" + minutes + " " + am_pm);
  };

  useEffect(() => {
    setInterval(getDate, 1000);
  }, []);
  return (
    <div className="Bottom_Navigation_Wrapper">
      <span className="Daytime">
        {time} | {roomID}{" "}
      </span>
      <div className="Bottom_Navigation_Container">
        <CustomButton onClick={() => setHide()} title="Chat">
          <ChatDots style={{ color: "white" }} size={26} />
        </CustomButton>
        <CustomButton title="Mute / Unmute">
          <Microphone style={{ color: " white" }} size={26} />
        </CustomButton>
        <CustomButton title="Webcam On / Off">
          <Camera style={{ color: "white" }} size={26} />
        </CustomButton>
        <CustomButton title="Share Screen">
          <DesktopDevice style={{ color: "white" }} size={26} />
        </CustomButton>
        <CustomButton title="Peoples">
          <PeopleGroup style={{ color: "white" }} size={26} />
        </CustomButton>
      </div>
    </div>
  );
};

const ChatDrawer: React.FC<MicroServicesProps> = ({ Hide, setHide }) => {
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
