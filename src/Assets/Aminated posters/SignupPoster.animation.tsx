import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../Data/Join Us.json";

class SignupPoster extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <Lottie
        options={defaultOptions}
        width="50vw"
        style={{ display: "inline-block" }}
      />
    );
  }
}

export default SignupPoster;
