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

    return <Lottie options={defaultOptions} width="50vw" />;
  }
}

export default LandingPoster;
