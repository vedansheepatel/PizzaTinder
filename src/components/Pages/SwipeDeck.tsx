
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Room } from "../../components/room";
import { allToppings } from "../../toppings";
import SwipeCard from "../SwipeCard"; // make sure this handles drag/swipe
import CheckImg from "../../assets/Toppings/rightswipe.png"
import XImg from "../../assets/Toppings/leftswipe.png"

type Topping = {
  name: string;
  image: string;
  category?: string;
};

const SwipeScreen: React.FC = () => {
  const location = useLocation();
  const { roomId, participantName } = location.state as {
    roomId: string;
    participantName: string;
  };

  const [room, setRoom] = useState<Room | null>(null);
  const [deck, setDeck] = useState<Topping[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Subscribe to room updates
  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
      if (docSnap.exists()) {
        const roomData = docSnap.data() as Room;
        setRoom(roomData);

        // Only initialize deck if empty (first load)
        setDeck((prevDeck) => {
          if (prevDeck.length === 0) {
            let toppingNames: string[] = [];
            if (roomData.pizzaType === "set") {
              toppingNames = roomData.selectedPizza?.toppings || [];
            } else if (roomData.pizzaType === "shortlist") {
              toppingNames = roomData.shortlistedToppings || [];
            }
            return allToppings.filter((t) => toppingNames.includes(t.name));
          }
          return prevDeck;
        });
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleSwipe = async (direction: "like" | "dislike") => {
    if (!room || currentIndex >= deck.length) return;

    const topping = deck[currentIndex];

    // Initialize participantData if needed
    const participantData = room.participantData || {};
    if (!participantData[participantName]) {
      participantData[participantName] = { likedToppings: [], dislikedToppings: [] };
    }

    // Update liked or disliked toppings
    if (direction === "like") {
      participantData[participantName].likedToppings.push(topping.name);
    } else {
      participantData[participantName].dislikedToppings.push(topping.name);
    }

    // Update Firestore
    await updateDoc(doc(db, "rooms", roomId), { participantData });

    // Move to next card
    setCurrentIndex((prev) => prev + 1);
  };

  if (!room) return <div>Loading room...</div>;
  if (currentIndex >= deck.length)
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        No more toppings to swipe!
      </div>
    );

  const topping = deck[currentIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Swipe Toppings</h2>

      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "300px",
          margin: "2rem auto",
        }}
      >
        {/* Use your SwipeCard component for draggable behavior */}
       <SwipeCard
  key={topping.name}
  image={topping.image}
  topping={topping.name}
  onSwipe={(dir, toppingName) =>
    handleSwipe(dir === "right" ? "like" : "dislike")
  }
/>
      </div>
<div
  style={{
    position: "fixed",
    bottom: 20,
    left: 20,
    width: 60,
    height: 60,
    cursor: "pointer",
    zIndex: 10,
  }}
  onClick={() => handleSwipe("dislike")}
>
  <img src={XImg} alt="dislike" style={{ width: "100%", height: "100%" }} />
</div>

<div
  style={{
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    cursor: "pointer",
    zIndex: 10,
  }}
  onClick={() => handleSwipe("like")}
>
  <img src={CheckImg} alt="like" style={{ width: "100%", height: "100%" }} />
</div>

      <p>
        {currentIndex + 1} / {deck.length} toppings
      </p>
    </div>
  );
};

export default SwipeScreen;
