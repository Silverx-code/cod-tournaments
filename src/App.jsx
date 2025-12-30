import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProfileCreation from "./pages/auth/ProfileCreation";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import WaitingRoom from "./pages/WaitingRoom";
import TournamentLive from "./pages/TournamentLive";
import Rankings from "./pages/Rankings";
import Chat from "./pages/Chat";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-creation" element={<ProfileCreation />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/waiting/:id" element={<WaitingRoom />} />
          <Route path="/tournament-live/:id" element={<TournamentLive />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div style={{color:'white'}}>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;