import styled from "styled-components"
import { SLogo } from "../../App.styled"
import githubLogo from "/assets/svgs/githubLogo.svg";

const GITHUB_LINK = "https://github.com/gabadadzeluca/exam-finder-client";


export const Footer = () =>{
  return(
    <SFooterDiv>
      <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
        <SLogo $logo={githubLogo} width="2rem"/>
      </a>
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