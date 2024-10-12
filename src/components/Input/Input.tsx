import React from "react";
import styled from "styled-components";

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

const SInputContainer = styled.div`
  background-color: red;
`;

const SInput = styled.input`
  all: unset;
`;
