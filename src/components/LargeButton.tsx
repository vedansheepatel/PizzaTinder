import React from "react";
import styled from "styled-components";

type PizzaButtonProps = {
  label: string;
  onClick: () => void;
};

const StyledButton = styled.button`
  background-color: #ff6600; /* pizza orange */
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  width: 80%;
  max-width: 320px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #e65c00;
  }

  &:active {
    background-color: #cc5200;
  }
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PizzaButton: React.FC<PizzaButtonProps> = ({ label, onClick }) => {
  return (
    <ButtonWrapper>
      <StyledButton onClick={onClick}>{label}</StyledButton>
    </ButtonWrapper>
  );
};

export default PizzaButton;
