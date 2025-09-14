import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import styled from "styled-components";
import Logo from "../Logo";
import { Title, Subtitle, Paragraph } from "../Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1.5rem;
`;

const InputField = styled.input`
  font-size: 1.25rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 2px solid #ccc;
  width: 80%;
  max-width: 320px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #FF9505; /* focus highlight */
  }
`;

const NumberSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
`;

const NumberButton = styled.button`
  background-color: #FF9505;
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #e65c00;
  }
`;

const Dropdown = styled.select`
  font-size: 1.25rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 2px solid #ccc;
  width: 80%;
  max-width: 320px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #FF9505;
  }
`;

const SubmitButton = styled.button`
  background-color: #FF9505;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  width: 80%;
  max-width: 320px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #e65c00;
  }

  &:active {
    background-color: #cc5200;
  }
`;
const Label = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

// ...InputField, NumberSelector, NumberButton, Dropdown, SubmitButton, Label (same as before)

const LogoWrapper = styled.div`
  width: 160px; /* default size on desktop */
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 600px) {
    width: 100px; /* smaller size on mobile */
  }
`;

const CreateGroup: React.FC = () => {
  const [hostName, setHostName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [pizzaType, setPizzaType] = useState <"set" | "shortlist">("set");
  const navigate = useNavigate();
  const { createRoom } = useRoom();

  const increment = () => setPeopleCount((prev) => (prev < 6 ? prev + 1 : prev));
  const decrement = () => setPeopleCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async () => {
    const room = await createRoom( hostName, groupName, peopleCount, pizzaType);

    if (pizzaType === "set") {
  navigate(`/set?roomId=${room.id}`);
} else if (pizzaType === "shortlist") {
  navigate(`/shortlist?roomId=${room.id}`);
}
  };

  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <Title> 
       <span style={{ color: "#000000" }}>Slice</span>
       <span style={{ color: "#FF9505" }}>Swipe</span>
       </Title>

      <InputField
        placeholder="Host Name"
        value={hostName}
        onChange={(e) => setHostName(e.target.value)}
      />
      <InputField
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <Label>Select number of people</Label>
      <NumberSelector>
        <NumberButton onClick={decrement}>-</NumberButton>
        {peopleCount}
        <NumberButton onClick={increment}>+</NumberButton>
      </NumberSelector>
      <Dropdown
        value={pizzaType}
        onChange={(e) => setPizzaType(e.target.value as "set" | "shortlist")}
        >
    
    <option value="set">Set Pizza</option>
    <option value="shortlist">Shortlist Toppings</option>
</Dropdown>
      <SubmitButton onClick={handleSubmit}>Next</SubmitButton>
    </Container>
  );
};

export default CreateGroup;
