export type Room = {
  id: string;           // unique room ID
  groupName: string;
  hostName: string;
  peopleCount: number;
  pizzaType: "set" | "shortlist"; // type of pizza selection
  participants?: string[];        // list of joined users, host included

  // For "set" pizza type
  selectedPizza?: {
    name: string;          // e.g., "Veggie Supreme"
    toppings: string[];    // ["Mushrooms", "Onions", "Peppers"]
  };

  // For "shortlist" pizza type
  shortlistedToppings?: string[]; // toppings chosen by the host for swiping

  // Track each participant's swipes
  participantData?: {
    [participantName: string]: {
      likedToppings: string[];
      dislikedToppings: string[];
    };
  };
};
