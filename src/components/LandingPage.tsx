import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Pizza Tinder 🍕</h1>
      <button
        className="bg-red-500 text-white px-6 py-3 rounded-lg"
        onClick={() => navigate("/create")}
      >
        Create Group
      </button>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        onClick={() => navigate("/join/")}
      >
        Join Group
      </button>
    </div>
  );
};

export default LandingPage;