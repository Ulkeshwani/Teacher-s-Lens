import React, { useEffect, useRef, useState } from "react";
import "./index.css";

interface Props {
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  });

  return (
    // <div className="outerContainer">
    //   <div className="innerContainer">
    //     <div className="peerVideoOverlay">Attendee Name</div>
    <video ref={ref} muted={isMuted} autoPlay></video>
    //   </div>
    // </div>
  );
};

export default Video;
