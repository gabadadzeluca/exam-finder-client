import styled from "styled-components";
import { COLORS } from "./utils/colors";
import searchIcon from "./assets/svgs/searchIcon.svg";
import brightSearchIcon from "./assets/svgs/searchIconBright.svg";

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
  margin-top: 4rem;
  margin-bottom: 5rem;
`;

export const SSearchButton = styled.button`
  all: unset;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  width: 20%;

  &:hover {
    cursor: pointer;
    background-image: url(${brightSearchIcon});
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
  font-size: 1.25rem;
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