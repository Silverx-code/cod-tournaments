import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useTournaments } from "../context/TournamentContext";
import { useAuth } from "../context/AuthContext";

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTournamentById, registerUser, markAsPaid, isUserRegistered } = useTournaments();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const tournament = getTournamentById(id);
  const isRegistered = isUserRegistered(parseInt(id), user?.id);

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

  const handleRegister = () => {
    setShowPayment(true);
  };

  const handleFakePayment = async () => {
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Register user
    registerUser(tournament.id, user.id, user.username);

    // Mark as paid
    markAsPaid(tournament.id, user.id);

    setLoading(false);

    // Navigate to waiting room
    navigate(`/waiting/${tournament.id}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tournament Header */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 mb-6">
          <div className="h-64 bg-gray-800">
            <img
              src={tournament.image}
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-white text-3xl font-bold mb-4">{tournament.name}</h1>
            <p className="text-gray-400 mb-6">{tournament.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Entry Fee</p>
                <p className="text-white text-xl font-bold">
                  ₦{tournament.entryFee.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
                <p className="text-yellow-400 text-xl font-bold">
                  ₦{tournament.prizePool.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Players</p>
                <p className="text-white text-xl font-bold">
                  {tournament.registeredPlayers.length}/{tournament.maxPlayers}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Mode</p>
                <p className="text-white text-xl font-bold">{tournament.mode}</p>
              </div>
            </div>

            {/* Tournament Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-300">
                <span className="w-32 text-gray-400">Date:</span>
                <span>{tournament.date}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="w-32 text-gray-400">Time:</span>
                <span>{tournament.time}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="w-32 text-gray-400">Status:</span>
                <span className="capitalize">{tournament.status}</span>
              </div>
            </div>

            {/* Payment Section */}
            {!showPayment && !isRegistered ? (
              <button
                onClick={handleRegister}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Register for Tournament
              </button>
            ) : isRegistered ? (
              <div className="text-center p-6 bg-green-900/30 border border-green-700 rounded-lg">
                <p className="text-green-300 text-lg font-medium mb-2">
                  ✓ You're Registered!
                </p>
                <button
                  onClick={() => navigate(`/waiting/${tournament.id}`)}
                  className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Go to Waiting Room
                </button>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-white text-xl font-bold mb-4">Complete Payment</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Entry Fee</span>
                    <span className="text-white font-semibold">
                      ₦{tournament.entryFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Processing Fee</span>
                    <span className="text-white font-semibold">₦0</span>
                  </div>
                  <div className="border-t border-gray-700 mt-4 pt-4">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold text-xl">
                        ₦{tournament.entryFee.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleFakePayment}
                  disabled={loading}
                  className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    `Pay ₦${tournament.entryFee.toLocaleString()}`
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center mt-4">
                  This is a simulated payment for demo purposes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;