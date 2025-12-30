import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <button
        onClick={handleLogout}
        className="bg-red-600 px-6 py-3 text-white rounded"
      >
        CONFIRM LOGOUT
      </button>
    </div>
  );
};

export default Logout;
