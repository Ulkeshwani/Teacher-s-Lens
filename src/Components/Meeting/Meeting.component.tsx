import React from "react";
import { Avatar } from "@mui/material";
import CustomButton from "Components/CustomButton/CustomButton.component";

import "./Meeting.styles.css";

const Meeting: React.FC<MeetingProps> = (Props: MeetingProps) => {
  const _handleClick = () => {
    alert("Clicked");
  };
  return (
    <div className="_meetingInvite_Wrapper">
      <div className="_meetInvite_Container">
        <Avatar className="_People_Avatar">A</Avatar>
        <label className="Host">Ongoing Class</label>
        <label className="_current_Time">Date</label>
      </div>
      <div className="_MeetJoin_container">
        <p className="_Desc">...</p>
      </div>
      <div className="_Button_Container">
        <CustomButton className="_Join_Meet" onClick={_handleClick}>
          Join Classroom
        </CustomButton>
      </div>
    </div>
  );
};

export default Meeting;
