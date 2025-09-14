// import React from "react";
// import styled from "styled-components";

// type PizzaButtonProps = {
//   label: string;
//   onClick: () => void;
// };

// const StyledButton = styled.button`
//   background-color: #ff6600; /* pizza orange */
//   color: white;
//   font-size: 1.25rem;
//   font-weight: bold;
//   padding: 1rem 2rem;
//   border-radius: 12px;
//   border: none;
//   width: 80%;
//   max-width: 320px;
//   text-align: center;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   cursor: pointer;

//   &:hover {
//     background-color: #e65c00;
//   }

//   &:active {
//     background-color: #cc5200;
//   }
// `;

// const ButtonWrapper = styled.div`
//   position: fixed;
//   bottom: 2rem;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   justify-content: center;
//   width: 100%;
// `;

// const PizzaButton: React.FC<PizzaButtonProps> = ({ label, onClick }) => {
//   return (
//     <ButtonWrapper>
//       <StyledButton onClick={onClick}>{label}</StyledButton>
//     </ButtonWrapper>
//   );
// };

// export default PizzaButton;
// PizzaButton.tsx
import React from "react";
import styled from "styled-components";

type PizzaButtonProps = {
  label: string;
  onClick: () => void | Promise<void>; // allow async too
  disabled?: boolean; // <-- add this
};

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#FF9505")};
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#e65c00")};
  }

  &:active {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#cc5200")};
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

const PizzaButton: React.FC<PizzaButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <ButtonWrapper>
      <StyledButton onClick={onClick} disabled={disabled}>
        {label}
      </StyledButton>
    </ButtonWrapper>
  );
};

export default PizzaButton;
