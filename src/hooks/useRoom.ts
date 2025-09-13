// import { useState } from "react";
// import { Room } from "../components/room";
// import { db } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";

// export const useRoom = () => {
//   const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

//   const createRoom = async (groupName: string, hostName: string, peopleCount: number, pizzaType: Room["pizzaType"]) => {
//     const room: Room = {
//       id: uuidv4(),
//       groupName,
//       hostName,
//       peopleCount,
//       pizzaType,
//       participants: [hostName], // host auto-joined
//     };

//     setCurrentRoom(room);

//     // Save to Firebase
//     await setDoc(doc(db, "rooms", room.id), room);

//     return room;
//   };

//   return { currentRoom, createRoom };
// };
import { useState } from "react";
import { Room } from "../components/room";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const useRoom = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  // Create a new room
  const createRoom = async (
    groupName: string,
    hostName: string,
    peopleCount: number,
    pizzaType: Room["pizzaType"]
  ) => {
    const room: Room = {
      id: uuidv4(),
      groupName,
      hostName,
      peopleCount,
      pizzaType,
      participants: [hostName], // host auto-joined
    };

    setCurrentRoom(room);

    // Save to Firebase
    await setDoc(doc(db, "rooms", room.id), room);

    return room;
  };

  // Join an existing room
  const joinRoom = async (roomId: string, participantName: string) => {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      participants: arrayUnion(participantName),
    });
  };

  return { currentRoom, createRoom, joinRoom };
};
