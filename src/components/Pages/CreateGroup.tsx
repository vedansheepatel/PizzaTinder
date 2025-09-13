
// const CreateGroup: React.FC = () => {
//   const [groupName, setGroupName] = useState("");
//   const [hostName, setHostName] = useState("");
//   const [peopleCount, setPeopleCount] = useState(1);
//   const [pizzaType, setPizzaType] = useState("build");

//  const increment = () =>
//   setPeopleCount((prev) => (prev < 6 ? prev + 1 : prev));
// const decrement = () =>
//   setPeopleCount((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleSubmit = () => {
//     console.log({ groupName, hostName, peopleCount, pizzaType });
//     // here you can navigate to the next page later
//   };

//   return (
//     <Container>
//       <InputField
//         placeholder="Group Name"
//         value={groupName}
//         onChange={(e) => setGroupName(e.target.value)}
//       />
//       <InputField
//         placeholder="Host Name"
//         value={hostName}
//         onChange={(e) => setHostName(e.target.value)}
//       />
//       <Label>Select number of people</Label>
//       <NumberSelector>
//         <NumberButton onClick={decrement}>-</NumberButton>
//         {peopleCount}
//         <NumberButton onClick={increment}>+</NumberButton>
//       </NumberSelector>
//       <Dropdown value={pizzaType} onChange={(e) => setPizzaType(e.target.value)}>
//         <option value="build">Build Your Own</option>
//         <option value="set">Set Pizza</option>
//         <option value="shortlist">Shortlist of Toppings</option>
//       </Dropdown>
//       <SubmitButton onClick={handleSubmit}>Create Group</SubmitButton>
//     </Container>
//   );
// };
// export default CreateGroup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
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
    border-color: #ff6600; /* focus highlight */
  }
`;

const NumberSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
`;

const NumberButton = styled.button`
  background-color: #ff6600;
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
    border-color: #ff6600;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff6600;
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

const CreateGroup: React.FC = () => {
  const [groupName, setGroupName] = useState("");
  const [hostName, setHostName] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [pizzaType, setPizzaType] = useState<"build" | "set" | "shortlist">("build");
  const navigate = useNavigate();
  const { createRoom } = useRoom();

  const increment = () => setPeopleCount((prev) => (prev < 6 ? prev + 1 : prev));
  const decrement = () => setPeopleCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async () => {
    const room = await createRoom(groupName, hostName, peopleCount, pizzaType);

    if (pizzaType === "build") {
       navigate("/qr-display", { state: { roomId: room.id } });
    } else if (pizzaType === "set") {
      navigate("/select-set-pizza");
    } else {
      navigate("/collection-pizza");
    }
  };

  return (
    <Container>
      <InputField
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <InputField
        placeholder="Host Name"
        value={hostName}
        onChange={(e) => setHostName(e.target.value)}
      />
      <Label>Select number of people</Label>
      <NumberSelector>
        <NumberButton onClick={decrement}>-</NumberButton>
        {peopleCount}
        <NumberButton onClick={increment}>+</NumberButton>
      </NumberSelector>
      <Dropdown
        value={pizzaType}
        onChange={(e) => setPizzaType(e.target.value as "build" | "set" | "shortlist")}
        >
    <option value="build">Build Your Own</option>
    <option value="set">Set Pizza</option>
    <option value="shortlist">Collection of Pizza</option>
</Dropdown>
      <SubmitButton onClick={handleSubmit}>Create Group</SubmitButton>
    </Container>
  );
};

export default CreateGroup;
