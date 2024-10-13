import React, { ReactNode } from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/colors";

interface ButtonProps {
  width?: string;
  height?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
  icon?: string; // optional icon
}

export const Button: React.FC<ButtonProps> = ({
  width,
  height,
  onClick,
  value,
  icon,
}) => {
  console.log(icon);
  return (
    <SButtonDiv width={width} height={height}>
      <SButton onClick={onClick}>{value}</SButton>
      {icon && <SideIcon $icon={icon} />}
    </SButtonDiv>
  );
};

const SButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const SButtonDiv = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => (width ? width : "10rem")};
  height: ${({ height }) => (height ? height : "3rem")};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;
  padding: 0 0.8rem;
  font-weight: 500;
  background-color: #5012a7;
  color: ${COLORS.GREENISH_BLUE};
  font-size: 1.1rem;
`;

const SideIcon = styled.div<{ $icon: string }>`
  background-image: ${({ $icon }) => `url(${$icon})`};
  background-size: cover;
  background-position: center;
  width: 1.875rem;
  height: 1.875rem;
`;
