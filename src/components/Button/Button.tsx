import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/colors";

interface ButtonProps {
  width?: string;
  height?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  value: string;
  icon?: string; // optional icon
  bgColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  width,
  height,
  onClick,
  value,
  icon,
  bgColor,
}) => {
  return (
    <SButtonDiv width={width} height={height} $bgColor={bgColor} onClick={onClick}>
      <SButton>{value}</SButton>
      {icon && <SideIcon $icon={icon} />}
    </SButtonDiv>
  );
};

const SButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const SButtonDiv = styled.div<{
  width?: string;
  height?: string;
  $bgColor?: string;
}>`
  width: ${({ width }) => (width ? width : "10rem")};
  height: ${({ height }) => (height ? height : "3rem")};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;
  padding: 0 0.8rem;
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : "#24193f")};
  color: ${COLORS.GREENISH_BLUE};
  font-weight: 500;
  font-size: 1.1rem;

  &:hover {
    background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : "#463473")};
  }
`;

const SideIcon = styled.div<{ $icon: string }>`
  background-image: ${({ $icon }) => `url(${$icon})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 1.875rem;
  height: 1.875rem;
`;
