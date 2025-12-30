import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <h1 className="text-white text-4xl p-6">
        Welcome back, {user.username}
      </h1>
    </div>
  );
};

export default Home;
