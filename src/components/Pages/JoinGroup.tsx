// src/components/Pages/JoinPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRoom } from "../../hooks/useRoom";


type RoomData = {
  id: string;
  groupName: string;
  hostName: string;
  peopleCount: number;
  pizzaType: "build" | "set" | "shortlist";
  participants: string[];
};

const JoinPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { joinRoom } = useRoom();

  const params = new URLSearchParams(location.search);
const roomId = params.get("roomId"); // roomId comes from the URL query string
  const [room, setRoom] = useState<RoomData | null>(null);
  const [participantName, setParticipantName] = useState("");

  // Fetch room details to show name & total people
  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      const roomSnap = await getDoc(doc(db, "rooms", roomId));
      if (roomSnap.exists()) {
        setRoom(roomSnap.data() as RoomData);
      } else {
        alert("Room not found!");
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleJoin = async () => {
    if (!participantName) return alert("Enter your name!");
    if (!room) return;

    if (room.participants.includes(participantName)) {
      return alert("This name is already taken in the room!");
    }

   if (!roomId) {
  alert("Room ID is missing!");
  return;
}

await joinRoom(roomId, participantName);

    // Navigate to waiting screen
    navigate(`/qr-display?roomId=${roomId}`);
  };

  if (!room) return <div>Loading room...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>Join the Swipe!</h2>
      <p>Room: {room.groupName}</p>
      <p>
        Participants: {room.participants.length} / {room.peopleCount}
      </p>

      <input
        type="text"
        placeholder="Enter your name"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        style={{ fontSize: "1.25rem", padding: "0.75rem", margin: "1rem 0" }}
      />
      <br />
      <button
        onClick={handleJoin}
        style={{
          backgroundColor: "#ff6600",
          color: "white",
          fontSize: "1.25rem",
          padding: "1rem 2rem",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinPage;
