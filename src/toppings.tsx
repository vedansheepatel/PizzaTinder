export type Topping = {
  name: string;
  image: string; // path relative to /src/assets/toppings
  category: "meat" | "cheese" | "veggie"; // optional for shortlist
};

import bacon from "./assets/Toppings/Bacon.png";
import basil from "./assets/Toppings/Basil.png";
import blackOlives from "./assets/Toppings/Black Olives.png";
import broccoli from "./assets/Toppings/Broccoli.png"
import bellPepper from "./assets/Toppings/Bell Peppers.png"
import greenOlives from "./assets/Toppings/Green Olives.png"
import ham from "./assets/Toppings/Ham.png"
import jalapenos from "./assets/Toppings/Jalapenos.png"
import mushrooms from "./assets/Toppings/Mushrooms.png"
import onions from "./assets/Toppings/Onions.png"
import pepperoni from "./assets/Toppings/Pepperoni.png"
import pineapple from "./assets/Toppings/Black Olives.png"
import tomatoes from "./assets/Toppings/Tomatoes.png";
import spinach from "./assets/Toppings/Spinich.png"


export const allToppings: Topping[] = [
  { name: "Bacon", image: bacon, category: "meat" },
  { name: "Basil", image: basil, category: "veggie" },
  { name: "Black olives", image: blackOlives, category: "veggie" },
  { name: "Broccoli", image: broccoli, category: "veggie" },
  { name: "Bell Peppers", image: bellPepper, category: "veggie" },
  { name: "Green Olives", image: greenOlives, category: "veggie" },
  { name: "Ham", image: ham, category: "meat" },
  { name: "Jalapenos", image: jalapenos, category: "veggie" },
  { name: "Mushrooms", image: mushrooms, category: "veggie" },
  { name: "Onions", image: onions, category: "veggie" },
  { name: "Pepperoni", image: pepperoni, category: "meat" },
  { name: "Pineapple", image: pineapple, category: "veggie" },
  { name: "Tomatoes", image: tomatoes, category: "veggie" },
  { name: "Spinach", image: spinach, category: "veggie" },
];
