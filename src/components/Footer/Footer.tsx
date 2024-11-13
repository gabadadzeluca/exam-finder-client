import { useState } from "react";
import styled from "styled-components";
import { SLogo } from "../../App.styled";
import catImg from "/assets/images/cat.png";
import catStkImg from "/assets/images/catStk.png";
import githubLogo from "/assets/svgs/githubLogo.svg";

const GITHUB_LINK = "https://github.com/gabadadzeluca/exam-finder-client";

const getRandomRms = (): number[] => {
  const min = 1;
  const max = 30;
  const leftRms = Math.floor(Math.random() * (max - min + 1)) + min;
  const bottomRms = Math.floor(Math.random() * (max - min + 1)) + min;
  return [leftRms, bottomRms];
};

export const Footer = () => {
  const [leftRms, setLeftRms] = useState(1);
  const [bottomRms, setBottomRms] = useState(-0.75);

  const randomizeCatPosition = () => {
    const [l, b] = getRandomRms();
    setLeftRms(l);
    setBottomRms(b);
  };

  return (
    <SFooterDiv>
      <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
        <SLogo $logo={githubLogo} width="2rem" />
      </a>
      <SCat
        catImg={catImg}
        leftRms={leftRms}
        bottomRms={bottomRms}
        onClick={randomizeCatPosition}
      />
    </SFooterDiv>
  );
};

const SFooterDiv = styled.div`
  width: 95%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
`;
const SCat = styled.div<{ catImg: string; leftRms: number; bottomRms: number }>`
  width: 12rem;
  height: 12rem;
  background-image: url(${({ catImg }) => catImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: ${({ leftRms }) => (leftRms ? `${leftRms}rem` : "1rem")};
  bottom: ${({ bottomRms }) => (bottomRms ? `${bottomRms}rem` : "-0.75`rem")};
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    scale: 1.2;
    opacity: 1;
    background-image: url(${catStkImg});
  }

  @media (max-width: 1200px) {
    width: 12rem;
    height: 12rem;
  }

  @media (max-width: 992px) {
    width: 10rem;
    height: 10rem;
  }

  @media (max-width: 768px) {
    width: 8rem;
    height: 8rem;
  }

  @media (max-width: 576px) {
    width: 6rem;
    height: 6rem;
  }
`;
