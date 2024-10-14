import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/colors";

interface InputProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  type,
}) => {
  return (
    <SInputContainer>
      <SInput placeholder={placeholder} onChange={onChange} type={type} />
    </SInputContainer>
  );
};

const SInputContainer = styled.div``;

const SInput = styled.input`
  all: unset;
  width: 19rem;
  width: 90%;
  height: 4rem;
  color: ${COLORS.GREENISH_BLUE};
  padding: 0 0.9rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0.8rem;

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    font-size: 0.625rem;
  }
`;
