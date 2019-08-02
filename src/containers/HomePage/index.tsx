import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Lottie, { Options, EventListener } from "react-lottie";
import animationData from "../../lotties/checklist.json";
import { Button, Icon } from "antd";
const defaultOptions: Options = {
  loop: true,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const HomeLottie = styled.div`
  position: fixed;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  z-index: -1;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2em;
`;
const HomeHeading = styled.h2`
  font-size: 2.4rem;
  color: white;
  padding: 0 2em;
`;

const HomePage: React.FC = (props: any) => {
  const navigate = () => {
    props.history.push("/todos");
  };
  const eventListeners: EventListener[] = [
    {
      eventName: "complete",
      callback: () => {
        console.log("the animation completed:");
      }
    }
  ];

  return (
    <div>
      <HomeLottie>
        <Lottie
          options={defaultOptions}
          width={window.innerWidth}
          height={window.innerHeight}
          eventListeners={eventListeners}
        />
      </HomeLottie>
      <HomeContainer>
        <HomeHeading className="router--tranistion">
          Start adding your todos....
        </HomeHeading>
        <Button
          type="default"
          ghost
          onClick={navigate}
          className="router--tranistion"
        >
          Start now
          <Icon type="right" />
        </Button>
      </HomeContainer>
    </div>
  );
};

export default HomePage;
