import styled from "styled-components";
import { COLORS } from "./utils/colors";
import searchIcon from "/assets/svgs/searchIcon.svg";
import brightSearchIcon from "/assets/svgs/searchIconBright.svg";

export const SFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SMainContainerDiv = styled(SFlexContainer)`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  color: ${COLORS.GREENISH_BLUE};
`;
export const SInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  border: 0.125rem solid white;
  border-radius: 0.8rem;
  /* margin-top: 4rem; */
  margin-bottom: 1.5rem;
`;

export const SSearchButton = styled.button`
  all: unset;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2rem;
  width: 20%;

  &:hover {
    cursor: pointer;
    background-image: url(${brightSearchIcon});
  }

  @media (max-width: 768px) {
    background-size: 1.75rem;
  }

  @media (max-width: 576px) {
    background-size: 1rem;
  }
`;

export const SButtonsDiv = styled(SFlexContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > div {
    margin-bottom: 3rem;
  }

  @media (max-width: 992px) {
    align-items: center;
  }
`;

export const SLoadingDiv = styled.div``;
export const SLastRefreshP = styled.p`
  margin-bottom: 2rem;
  font-size: 1.25rem;
  @media (max-width: 992px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }
`;

export const SDataAndButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;

  @media (max-width: 1200px) {
  }

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }
`;

export const SLogo = styled.div<{ $logo: string; width?: string; }>`
  background-image: ${({ $logo }) => `url(${$logo})`};
  width: ${({width})=>width ? width : '10rem'};
  height: ${({width})=>width ? width : '10rem'};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const SError = styled.p`
  color: #d1060e;
  font-size: 0.9375rem;
  margin-bottom: 4rem;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 0.6rem;
    max-width: 11rem;
    text-align: center;
  }
`;

export const SLabel = styled.p`
  font-size: 0.75rem;
  color: gray;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 0.6rem;
    max-width: 10rem;
    text-align: center;
  }
`;
export const SInputWrapper = styled.div`
// wraps input and label together
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 4rem;
`;
