
// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { doc, onSnapshot } from "firebase/firestore";
// import QRCode from "react-qr-code";

// interface RoomData {
//   id: string;
//   groupName: string;
//   hostName: string;
//   peopleCount: number;
//   participants: string[];
// }

// type Props = {
//   roomId?: string; // optional if you pass via props
// };

// const QRDisplay: React.FC<Props> = ({ roomId }) => {
//   const [room, setRoom] = useState<RoomData | null>(null);

//   useEffect(() => {
//     const id = roomId || localStorage.getItem("currentRoomId"); // fallback
//     if (!id) return;

//     // Listen for real-time updates on the room
//     const unsubscribe = onSnapshot(doc(db, "rooms", id), (docSnap) => {
//       if (docSnap.exists()) {
//         setRoom(docSnap.data() as RoomData);
//       }
//     });

//     return () => unsubscribe();
//   }, [roomId]);

//   if (!room) return <div>Loading room...</div>;

//   return (
//     <div style={{ textAlign: "center", marginTop: "4rem" }}>
//       <h2>{room.groupName} - Build Your Own Pizza Room</h2>
//       <p>Host: {room.hostName}</p>

//       <QRCode value={room.id} size={200} />

//       <p>
//         Participants: {room.participants.length} / {room.peopleCount}
//       </p>

//       <p>Show this QR code to your friends to join the room!</p>
//     </div>
//   );
// };

// export default QRDisplay;
// src/components/Pages/QRDisplay.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import QRCode from "react-qr-code";

type RoomData = {
  id: string;
  groupName: string;
  hostName: string;
  peopleCount: number;
  pizzaType: "build" | "set" | "shortlist";
  participants: string[];
};

const QRDisplay: React.FC = () => {
  const location = useLocation();
   const navigate = useNavigate();
//   const { roomId } = location.state as { roomId: string }; // get room ID from navigation state
  

const params = new URLSearchParams(location.search);
const roomId = params.get("roomId") || (location.state as { roomId?: string })?.roomId;

const [room, setRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
      if (docSnap.exists()) {
        setRoom(docSnap.data() as RoomData);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  if (!room) return <div>Loading room...</div>;

  const allJoined = room.participants.length === room.peopleCount;

  const handleStart = () => {
    // Navigate to the swipe page (or whatever page comes next)
    navigate("/swipe", { state: { roomId: room.id } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>{room.groupName}</h2>
      <p>Host: {room.hostName}</p>

      <div style={{ display: "inline-block", margin: "2rem 0" }}>
        <QRCode value={`https://76b3398967f0.ngrok-free.app/join?roomId=${room.id}`} size={200} />
      </div>

      <p>
        Participants: {room.participants.length} / {room.peopleCount}
      </p>

      <p>Show this QR code to your friends to join the room!</p>
       <button
        onClick={handleStart}
        disabled={!allJoined}
        style={{
          marginTop: "2rem",
          backgroundColor: allJoined ? "#ff6600" : "#ccc",
          color: "white",
          fontSize: "1.25rem",
          padding: "1rem 2rem",
          borderRadius: "12px",
          border: "none",
          cursor: allJoined ? "pointer" : "not-allowed",
        }}
      >
        Start the Swipe
      </button>
    </div>
  );
};

export default QRDisplay;
