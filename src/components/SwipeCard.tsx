
// import React from "react";
// import { motion, PanInfo } from "framer-motion";

// type SwipeCardProps = {
//   topping: string;
//   image: string;
//   onSwipe: (direction: "left" | "right", topping: string) => void;
// };

// const SwipeCard: React.FC<SwipeCardProps> = ({ topping, image, onSwipe }) => {
//   const handleDragEnd = (_: any, info: PanInfo) => {
//     if (info.offset.x > 100) onSwipe("right", topping);
//     else if (info.offset.x < -100) onSwipe("left", topping);
//   };

//   return (
//     <motion.div
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       onDragEnd={handleDragEnd}
//       whileDrag={{ rotate: 10 }}
//       style={{
//         width: "90vw",
//         maxWidth: "400px",
//         height: "70vh",
//         background: "#fff",
//         borderRadius: "16px",
//         boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "absolute",
//         top: "10vh",
//         left: "50%",
//         transform: "translateX(-50%)",
//       }}
//     >
//       <img
//         src={image}
//         alt={topping}
//         style={{ maxWidth: "100%", maxHeight: "80%", objectFit: "contain", borderRadius: "12px" }}
//       />
//       <h2 style={{ marginTop: "1rem" }}>{topping}</h2>
//     </motion.div>
//   );
// };

// export default SwipeCard;

import React, { useState } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";

type SwipeCardProps = {
  topping: string;
  image: string;
  onSwipe: (direction: "left" | "right", topping: string) => void;
};

const SwipeCard: React.FC<SwipeCardProps> = ({ topping, image, onSwipe }) => {
  const [swiped, setSwiped] = useState(false);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (swiped) return; // prevent multiple triggers

    const threshold = 100; // pixels
    if (info.offset.x > threshold) {
      setSwiped(true);
      onSwipe("right", topping);
    } else if (info.offset.x < -threshold) {
      setSwiped(true);
      onSwipe("left", topping);
    }
    // Otherwise, do nothing → stays in place
  };

  return (
    <AnimatePresence>
      {!swiped && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          whileDrag={{ rotate: 10 }}
          style={{
            width: "90vw",
            maxWidth: "400px",
            height: "70vh",
            background: "#FF9505",
            borderRadius: "16px",
            boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "10vh",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "grab",
          }}
        >
          <img
            src={image}
            alt={topping}
            style={{
              maxWidth: "100%",
              maxHeight: "80%",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
          <h2 style={{ marginTop: "1rem" }}>{topping}</h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwipeCard;
