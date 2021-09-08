import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../Data/lf30_editor_vqkrvqpo.json";

class LandingPoster extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return <Lottie options={defaultOptions} height={700} width="45vw" />;
  }
}

export default LandingPoster;
