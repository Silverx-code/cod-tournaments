import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  console.log("Rankings state:", rankings, "Type:", typeof rankings, "Is array:", Array.isArray(rankings));

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      
      const mockRankings = [
        { id: 1, username: "ProGamer123", wins: 45, losses: 12, kd: 2.8, points: 1250, rank: 1 },
        { id: 2, username: "SniperKing", wins: 42, losses: 15, kd: 2.5, points: 1180, rank: 2 },
        { id: 3, username: "WarMachine", wins: 38, losses: 18, kd: 2.3, points: 1100, rank: 3 },
        { id: 4, username: "GhostRider", wins: 35, losses: 20, kd: 2.1, points: 1050, rank: 4 },
        { id: 5, username: "TacticalOps", wins: 32, losses: 22, kd: 2.0, points: 980, rank: 5 },
        { id: 6, username: "EliteForce", wins: 30, losses: 25, kd: 1.9, points: 920, rank: 6 },
        { id: 7, username: "NightHawk", wins: 28, losses: 27, kd: 1.8, points: 880, rank: 7 },
        { id: 8, username: "StormBreaker", wins: 25, losses: 28, kd: 1.7, points: 820, rank: 8 },
        { id: 9, username: "IronFist", wins: 22, losses: 30, kd: 1.5, points: 760, rank: 9 },
        { id: 10, username: "Phoenix", wins: 20, losses: 32, kd: 1.4, points: 700, rank: 10 },
      ];

      setTimeout(() => {
        setRankings(mockRankings);
        setLoading(false);
      }, 500);
    };

    fetchRankings();
  }, [filter]);

  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-white";
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Player Rankings</h1>
          <p className="text-gray-400">Top players competing in COD tournaments</p>
        </div>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === "all"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === "monthly"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilter("weekly")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === "weekly"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            This Week
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent"></div>
            <p className="text-gray-400 mt-4">Loading rankings...</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Wins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Losses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      K/D Ratio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {rankings.map((player) => (
                    <tr key={player.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                          {getRankBadge(player.rank)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">{player.username}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-green-400 font-medium">{player.wins}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-red-400 font-medium">{player.losses}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-400 font-medium">{player.kd}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-yellow-400 font-bold">{player.points}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {rankings.map((player) => (
                <div key={player.id} className="p-4 border-b border-gray-800 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                        {getRankBadge(player.rank)}
                      </span>
                      <span className="text-white font-medium">{player.username}</span>
                    </div>
                    <span className="text-yellow-400 font-bold">{player.points} pts</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Wins: </span>
                      <span className="text-green-400 font-medium">{player.wins}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Losses: </span>
                      <span className="text-red-400 font-medium">{player.losses}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">K/D: </span>
                      <span className="text-gray-300 font-medium">{player.kd}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rankings;