import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useTournaments } from "../context/TournamentContext";
import { useAuth } from "../context/AuthContext";

const WaitingRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTournamentById, startTournament, TOURNAMENT_STATUS } = useTournaments();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(300); // 5 minutes fake countdown
  const [chatMessages, setChatMessages] = useState([
    { id: 1, username: "System", message: "Welcome to the waiting room!", timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const tournament = getTournamentById(id);
  const isAdmin = user?.role === "admin"; // You can set this in AuthContext

  useEffect(() => {
    if (tournament?.status === TOURNAMENT_STATUS.ONGOING) {
      navigate(`/tournament-live/${id}`);
    }
  }, [tournament, id, navigate, TOURNAMENT_STATUS]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTournament = () => {
    startTournament(tournament.id);
    navigate(`/tournament-live/${tournament.id}`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        username: user.username,
        message: newMessage,
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
  };

  if (!tournament) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-white text-2xl">Tournament not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-white text-3xl font-bold mb-2">{tournament.name}</h1>
          <p className="text-gray-400">Waiting Room</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">
                  <span className="text-4xl">⏳</span>
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">
                  {tournament.status === TOURNAMENT_STATUS.WAITING
                    ? "Waiting for Tournament to Start"
                    : "Get Ready!"}
                </h2>
                <p className="text-gray-400">
                  The tournament will begin shortly. Stay tuned!
                </p>
              </div>

              {/* Countdown */}
              <div className="text-center p-6 bg-gray-800 rounded-lg mb-6">
                <p className="text-gray-400 text-sm mb-2">Time Until Start</p>
                <p className="text-white text-4xl font-bold font-mono">
                  {formatTime(countdown)}
                </p>
              </div>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg mb-6">
                  <p className="text-yellow-300 text-sm mb-3">Admin Controls</p>
                  <button
                    onClick={handleStartTournament}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    Start Tournament Now
                  </button>
                </div>
              )}

              {/* Tournament Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-400 text-sm mb-1">Players</p>
                  <p className="text-white text-xl font-bold">
                    {tournament.registeredPlayers.length}/{tournament.maxPlayers}
                  </p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
                  <p className="text-yellow-400 text-xl font-bold">
                    ₦{tournament.prizePool.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-white text-xl font-bold mb-4">Tournament Rules</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span>No cheating or exploiting game mechanics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span>Respect all players and admins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span>Follow match schedules and be ready on time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span>Report any technical issues immediately</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-gray-800 flex flex-col h-[600px]">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-white font-bold">Chat</h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <span className="text-gray-400 font-medium">{msg.username}:</span>{" "}
                    <span className="text-gray-300">{msg.message}</span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <button
                    type="submit"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;