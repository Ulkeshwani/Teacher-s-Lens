import React from "react";
import { Avatar, Button } from "@material-ui/core";

import "./Meeting.styles.css"

const Meeting: React.FC<MeetingProps> = (Props: MeetingProps) => {
    return (
        <div className="_meetingInvite_Wrapper">
            <div className="_meetInvite_Container">
                <Avatar className="_People_Avatar">A</Avatar>
                <label className="Host">Ongoing Class</label>
                <label className="_current_Time">Date</label>
            </div>
            <div className="_MeetJoin_container">
                <p className="_Desc">
                    ...
                </p>
            </div>
            <div className="_Button_Container">
                <Button className="_Join_Meet">Join Classroom</Button>
            </div>
        </div>
    )
}

export default Meeting;