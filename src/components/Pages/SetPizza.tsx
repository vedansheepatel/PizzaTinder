// src/components/Pages/SetPizzaSelection.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

type PizzaOption = {
  name: string;
  image: string;
  toppings: string[];
};

const pizzas: PizzaOption[] = [
  {
    name: "Veggie Supreme",
    image: "/images/veggie.png", // put pizza images in /public/images/
    toppings: ["Mushrooms", "Bell Pepper", "Black Olives", "Onions"],
  },
  {
    name: "Hawaiian",
    image: "/images/pepperoni.png",
    toppings: ["Ham", "Pineapple", "Bacon"],
  },
  {
    name: "Meat Lover",
    image: "/images/margherita.png",
    toppings: ["Pepperoni", "Ham", "Tomatoes", "Spinach", "Basil","Black Olives","Mushrooms"],
  },
];

const SetPizzaSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const roomId = params.get("roomId");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pizzas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pizzas.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    setSelected(currentIndex);
  };

  const handleCreateGroup = async () => {
    if (!roomId || selected === null) return;

    const pizza = pizzas[selected];

    await updateDoc(doc(db, "rooms", roomId), {
  pizzaType: "set",
  selectedPizza: {
    name: pizza.name,
    toppings: pizza.toppings,
  },
});

    // Go to QR Display
    navigate(`/qr-display?roomId=${roomId}`);
  };

  const pizza = pizzas[currentIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Select a Set Pizza</h2>

      {/* Pizza carousel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
        <button onClick={handlePrev} style={{ fontSize: "2rem", cursor: "pointer" }}>
          ◀
        </button>

        <div>
          <img
            src={pizza.image}
            alt={pizza.name}
            style={{ width: "200px", height: "200px", borderRadius: "12px", objectFit: "cover" }}
          />
          <h3 style={{ marginTop: "1rem" }}>{pizza.name}</h3>

          <div style={{ margin: "0.5rem 0" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="pizzaSelect"
                checked={selected === currentIndex}
                onChange={handleSelect}
              />{" "}
              Select this pizza
            </label>
          </div>

          {/* toppings inline with commas */}
          <p style={{ marginTop: "0.5rem", color: "#555" }}>
            {pizza.toppings.join(", ")}
          </p>
        </div>

        <button onClick={handleNext} style={{ fontSize: "2rem", cursor: "pointer" }}>
          ▶
        </button>
      </div>

      {/* Create group button */}
      <button
        onClick={handleCreateGroup}
        disabled={selected === null}
        style={{
          marginTop: "2rem",
          backgroundColor: selected !== null ? "#ff6600" : "#ccc",
          color: "white",
          fontSize: "1.25rem",
          padding: "1rem 2rem",
          borderRadius: "12px",
          border: "none",
          cursor: selected !== null ? "pointer" : "not-allowed",
        }}
      >
        Create Group
      </button>
    </div>
  );
};

export default SetPizzaSelection;
