import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

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

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);

    const mockRankings = [
      { id: 1, username: "ProGamer123", wins: 45, losses: 12, kd: 2.8, points: 1250, rank: 1 },
      { id: 2, username: "SniperKing", wins: 42, losses: 15, kd: 2.5, points: 1180, rank: 2 },
      { id: 3, username: "WarMachine", wins: 38, losses: 18, kd: 2.3, points: 1100, rank: 3 },
    ];

    setTimeout(() => {
      setRankings(mockRankings);
      setLoading(false);
    }, 500);
  }, [filter]);

  return React.createElement(
    "div",
    { className: "min-h-screen bg-black" },
    React.createElement(Navigation, null),

    React.createElement(
      "div",
      { className: "p-6 text-white" },

      React.createElement("h1", { className: "text-4xl font-bold mb-4" }, "Player Rankings"),

      React.createElement(
        "div",
        { className: "mb-4 space-x-4" },

        React.createElement(
          "button",
          {
            onClick: () => setFilter("all"),
            className: "px-4 py-2 bg-blue-600 rounded",
          },
          "All Time"
        ),

        React.createElement(
          "button",
          {
            onClick: () => setFilter("monthly"),
            className: "px-4 py-2 bg-gray-700 rounded",
          },
          "Monthly"
        ),

        React.createElement(
          "button",
          {
            onClick: () => setFilter("weekly"),
            className: "px-4 py-2 bg-gray-700 rounded",
          },
          "Weekly"
        )
      ),

      loading
        ? React.createElement("p", null, "Loading rankings...")
        : React.createElement(
            "ul",
            null,
            rankings.map((player) =>
              React.createElement(
                "li",
                {
                  key: player.id,
                  className: `mb-2 font-bold ${getRankColor(player.rank)}`,
                },
                `${getRankBadge(player.rank)} ${player.username} - ${player.points} pts`
              )
            )
          )
    )
  );
};

export default Rankings;
