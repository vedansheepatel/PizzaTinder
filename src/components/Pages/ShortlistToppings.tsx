// src/components/Pages/ShortlistSelection.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LargeButton from "../LargeButton";

// Define topping categories
const toppingsByCategory: Record<string, string[]> = {
  Meats: ["Pepperoni", "Sausage", "Chicken", "Bacon"],
  Cheeses: ["Mozzarella", "Cheddar", "Parmesan", "Goat Cheese"],
  Veggies: ["Mushrooms", "Onions", "Olives", "Peppers", "Spinach", "Tomatoes"],
};

const ShortlistSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const roomId = params.get("roomId");

  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const handleCreateGroup = async () => {
    if (!roomId || selectedToppings.length === 0) return;

    await updateDoc(doc(db, "rooms", roomId), {
      pizzaType: "shortlist",
      shortlistedToppings: selectedToppings,
    });

    navigate(`/qr-display?roomId=${roomId}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Create a Shortlist</h2>
      <p>Select toppings from each category:</p>

      <div style={{ maxWidth: "400px", margin: "1rem auto", textAlign: "left" }}>
        {Object.entries(toppingsByCategory).map(([category, toppings]) => (
          <div key={category} style={{ marginBottom: "1rem" }}>
            <div
              onClick={() => toggleCategory(category)}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                background: "#f0f0f0",
                padding: "0.5rem",
                borderRadius: "6px",
              }}
            >
              {category} {openCategory === category ? "▲" : "▼"}
            </div>
            {openCategory === category && (
              <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                {toppings.map((topping) => (
                  <label key={topping} style={{ display: "block", marginBottom: "0.25rem" }}>
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(topping)}
                      onChange={() => toggleTopping(topping)}
                    />{" "}
                    {topping}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <LargeButton
  label="Create Group"
  onClick={handleCreateGroup}
  disabled={selectedToppings.length === 0}
/>
    </div>
  );
};

export default ShortlistSelection;
