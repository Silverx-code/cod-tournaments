import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useTournaments } from "../context/TournamentContext";

const TournamentLive = () => {
  const { id } = useParams();
  const { getTournamentById } = useTournaments();
  const [resultSubmitted, setResultSubmitted] = useState(false);
  const [selectedResult, setSelectedResult] = useState("");

  const tournament = getTournamentById(id);

  const handleSubmitResult = (e) => {
    e.preventDefault();
    if (!selectedResult) return;

    // Simulate result submission
    setTimeout(() => {
      setResultSubmitted(true);
    }, 1000);
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
          <div className="inline-block px-4 py-2 bg-green-900 text-green-300 rounded-full text-sm font-medium mb-4">
            🔴 LIVE NOW
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">{tournament.name}</h1>
          <p className="text-gray-400">Tournament in Progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tournament Status */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">
                  <span className="text-4xl">🎮</span>
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">
                  Tournament Has Started!
                </h2>
                <p className="text-gray-400">
                  Join your assigned lobby and compete for the prize pool
                </p>
              </div>

              {/* Match Info */}
              <div className="p-6 bg-gray-800 rounded-lg mb-6">
                <h3 className="text-white font-bold mb-4">Match Instructions</h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <span className="text-gray-400">Lobby Code:</span>{" "}
                    <span className="font-mono bg-gray-900 px-2 py-1 rounded">
                      COD-{tournament.id}-2025
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Password:</span>{" "}
                    <span className="font-mono bg-gray-900 px-2 py-1 rounded">
                      WINNER123
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Game Mode:</span> {tournament.mode}
                  </p>
                  <p>
                    <span className="text-gray-400">Server:</span> Africa (Lagos)
                  </p>
                </div>
              </div>

              {/* Submit Result */}
              {!resultSubmitted ? (
                <div className="p-6 bg-gray-800 rounded-lg">
                  <h3 className="text-white font-bold mb-4">Submit Your Result</h3>
                  <form onSubmit={handleSubmitResult} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Match Result
                      </label>
                      <select
                        value={selectedResult}
                        onChange={(e) => setSelectedResult(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                      >
                        <option value="">Select your result</option>
                        <option value="win">Win</option>
                        <option value="loss">Loss</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={!selectedResult}
                      className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition-colors"
                    >
                      Submit Result
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-6 bg-green-900/30 border border-green-700 rounded-lg text-center">
                  <p className="text-green-300 text-lg font-medium mb-2">
                    ✓ Result Submitted!
                  </p>
                  <p className="text-gray-400 text-sm">
                    Waiting for admin verification
                  </p>
                </div>
              )}
            </div>

            {/* Tournament Bracket (Placeholder) */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-white text-xl font-bold mb-4">Tournament Bracket</h3>
              <div className="text-center py-12 text-gray-500">
                <p>Bracket will be displayed here</p>
                <p className="text-sm mt-2">Coming soon...</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tournament Stats */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-bold mb-4">Tournament Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
                  <p className="text-yellow-400 text-2xl font-bold">
                    ₦{tournament.prizePool.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Players</p>
                  <p className="text-white text-xl font-bold">
                    {tournament.registeredPlayers.length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Mode</p>
                  <p className="text-white text-lg">{tournament.mode}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium">
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Live Players */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-bold mb-4">Live Players</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {tournament.registeredPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {player.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-300 text-sm">{player.username}</span>
                    </div>
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentLive;