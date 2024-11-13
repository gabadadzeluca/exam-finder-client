import styled from "styled-components"
import { SLogo } from "../../App.styled"
import githubLogo from "/assets/svgs/githubLogo.svg";
import catImg from "/assets/images/cat.png";

const GITHUB_LINK = "https://github.com/gabadadzeluca/exam-finder-client";


export const Footer = () =>{
  return(
    <SFooterDiv>
      <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
        <SLogo $logo={githubLogo} width="2rem"/>
      </a>
      <SCat catImg={catImg} />
    </SFooterDiv>
  )
}

const SFooterDiv = styled.div`
  width: 95%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
`
const SCat = styled.div<{catImg: string}>`
  width: 12rem;
  height: 12rem;
  background-image: url(${({ catImg }) => catImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  bottom: -0.75rem;
  left: 1rem;

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
`