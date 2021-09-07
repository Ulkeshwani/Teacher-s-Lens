import React from "react";
import { Avatar } from "@material-ui/core";

import "./Announcement.styles.css"

const Announcement: React.FC<AnnoucementProps> = (Props: AnnoucementProps) => {
    return (
        <div className="_Announcement_Container" >
            <div className="_Inner_Container">
                <Avatar className="_People_Avatar">A</Avatar>
                <label className="Host">Announcement</label>
                <label className="_current_Time">Date</label>
            </div>
            <div className="_announcement_Desc_container">
                <p className="_Desc">
                    a book or other written or printed work, regarded in terms of its
                    content rather than its physical form. a book or other written or
                    printed work, regarded in terms of its content rather than its
                </p>
            </div>
        </div >
    );
}

export default Announcement;