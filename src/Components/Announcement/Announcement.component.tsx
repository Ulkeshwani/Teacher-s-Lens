import React from "react";
import { Avatar } from "@mui/material";
import { SeverityPill } from "Components/Serverity-pills/ServerityPills.component";

import "./Announcement.styles.css";

const Announcement: React.FC<AnnoucementProps> = (Props: AnnoucementProps) => {
  return (
    <div className="_Announcement_Container">
      <div className="_Inner_Container">
        <Avatar className="_People_Avatar">{Props.author?.charAt(0)}</Avatar>
        <label className="Host">{Props.title}</label>

        <label className="_current_Time">
          {" "}
          <SeverityPill color={"warning"}>{Props.createdAt}</SeverityPill>
        </label>
      </div>
      <div className="_announcement_Desc_container">
        <p className="_Desc">{Props.description}</p>
      </div>
    </div>
  );
};

export default Announcement;
