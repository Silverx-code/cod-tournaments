import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useTournaments } from "../context/TournamentContext";
import { useAuth } from "../context/AuthContext";

const Tournaments = () => {
  const navigate = useNavigate();
  const { tournaments, isUserRegistered, TOURNAMENT_STATUS } = useTournaments();
  const { user } = useAuth();

  const getStatusBadge = (status) => {
    const badges = {
      [TOURNAMENT_STATUS.OPEN]: {
        text: "Open for Registration",
        className: "bg-green-900 text-green-300 border-green-700",
      },
      [TOURNAMENT_STATUS.WAITING]: {
        text: "Waiting to Start",
        className: "bg-yellow-900 text-yellow-300 border-yellow-700",
      },
      [TOURNAMENT_STATUS.ONGOING]: {
        text: "In Progress",
        className: "bg-blue-900 text-blue-300 border-blue-700",
      },
      [TOURNAMENT_STATUS.COMPLETED]: {
        text: "Completed",
        className: "bg-gray-800 text-gray-400 border-gray-700",
      },
    };
    return badges[status] || badges[TOURNAMENT_STATUS.OPEN];
  };

  const handleRegister = (tournamentId) => {
    navigate(`/tournament/${tournamentId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Tournaments</h1>
          <p className="text-gray-400">
            Join competitive COD tournaments and win big prizes
          </p>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => {
            const badge = getStatusBadge(tournament.status);
            const isRegistered = isUserRegistered(tournament.id, user?.id);
            const isFull = tournament.registeredPlayers.length >= tournament.maxPlayers;

            return (
              <div
                key={tournament.id}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all"
              >
                {/* Tournament Image */}
                <div className="h-48 bg-gray-800 relative">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}
                    >
                      {badge.text}
                    </span>
                  </div>
                </div>

                {/* Tournament Info */}
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {tournament.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {tournament.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-xs">Entry Fee</p>
                      <p className="text-white font-semibold">
                        ₦{tournament.entryFee.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Prize Pool</p>
                      <p className="text-yellow-400 font-semibold">
                        ₦{tournament.prizePool.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Players</p>
                      <p className="text-white font-semibold">
                        {tournament.registeredPlayers.length}/{tournament.maxPlayers}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Mode</p>
                      <p className="text-white font-semibold">{tournament.mode}</p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="mb-4 p-3 bg-gray-800 rounded-md">
                    <p className="text-gray-400 text-xs mb-1">Starts</p>
                    <p className="text-white text-sm font-medium">
                      {tournament.date} at {tournament.time}
                    </p>
                  </div>

                  {/* Action Button */}
                  {isRegistered ? (
                    <button
                      onClick={() => navigate(`/waiting/${tournament.id}`)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
                    >
                      View Tournament
                    </button>
                  ) : tournament.status === TOURNAMENT_STATUS.OPEN && !isFull ? (
                    <button
                      onClick={() => handleRegister(tournament.id)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
                    >
                      Register Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-800 text-gray-500 font-medium py-3 px-6 rounded-md cursor-not-allowed"
                    >
                      {isFull ? "Tournament Full" : "Registration Closed"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tournaments available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;