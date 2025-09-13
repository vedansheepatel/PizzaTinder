export type Room = {
  id: string;           // unique room ID
  groupName: string;
  hostName: string;
  peopleCount: number;
  pizzaType: "build" | "set" | "shortlist";
  participants?: string[]; // optional list of joined users, host included
};