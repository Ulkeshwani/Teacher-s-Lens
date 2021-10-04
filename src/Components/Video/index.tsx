import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";

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

  return <video ref={ref} muted={isMuted} autoPlay></video>;
};

export default Video;
