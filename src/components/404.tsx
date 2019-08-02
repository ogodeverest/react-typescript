import React from "react";
import Lottie, { Options, EventListener } from "react-lottie";
import animationData from "../lotties/404.json";

const defaultOptions: Options = {
  loop: true,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const NotFound = () => {
  return (
    <Lottie
      options={defaultOptions}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default NotFound;
