
import { useNavigate } from "react-router-dom";
import LargeButton from "../LargeButton";
import { Title, Subtitle, Paragraph } from "../Typography";
import Logo from "../Logo";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
   
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-6"
      style={{ textAlign: "center" }} // ensures logo and text centered
    >
      {/* Logo */}
      <div className="flex justify-center w-full">
        <Logo />
      </div>

      {/* Title */}
       <Title> 
        <span style={{ color: "#000000" }}>Slice</span>
       <span style={{ color: "#FF9505" }}>Swipe</span>
       </Title>

      {/* Subtitle */}
      <Subtitle>Swipe your way to the perfect pizza 🍕</Subtitle>

      {/* Spacer pushes button to bottom */}
      <div style={{ flex: 1 }}></div>

      {/* Button at bottom */}
      <LargeButton label="Create Group" onClick={() => navigate("/create")} />
    </div>
  );
};

export default LandingPage;
