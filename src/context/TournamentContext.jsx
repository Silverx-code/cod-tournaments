import { createContext, useContext, useState, useEffect } from "react";

const TournamentContext = createContext(null);

export const useTournaments = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error("useTournaments must be used within a TournamentProvider");
  }
  return context;
};

const TOURNAMENT_STATUS = {
  OPEN: "open",
  WAITING: "waiting",
  ONGOING: "ongoing",
  COMPLETED: "completed",
};

const MOCK_TOURNAMENTS = [
  {
    id: 1,
    name: "Winter Championship 2025",
    description: "Epic 64-player tournament with huge prizes",
    entryFee: 2000,
    prizePool: 100000,
    maxPlayers: 64,
    mode: "Battle Royale",
    date: "Jan 15, 2025",
    time: "8:00 PM",
    status: "open",
    registeredPlayers: [],
    image: "https://via.placeholder.com/400x200/1f2937/ffffff?text=Winter+Championship"
  },
  {
    id: 2,
    name: "Speed Run Series",
    description: "Fast-paced Team Deathmatch action",
    entryFee: 1500,
    prizePool: 50000,
    maxPlayers: 32,
    mode: "Team Deathmatch",
    date: "Jan 12, 2025",
    time: "6:00 PM",
    status: "open",
    registeredPlayers: [],
    image: "https://via.placeholder.com/400x200/1f2937/ffffff?text=Speed+Run"
  },
  {
    id: 3,
    name: "Pro League Finals",
    description: "The ultimate test for professionals",
    entryFee: 5000,
    prizePool: 250000,
    maxPlayers: 16,
    mode: "Search & Destroy",
    date: "Jan 20, 2025",
    time: "9:00 PM",
    status: "waiting",
    registeredPlayers: [],
    image: "https://via.placeholder.com/400x200/1f2937/ffffff?text=Pro+League"
  },
];

export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState(() => {
    const saved = localStorage.getItem("tournaments");
    return saved ? JSON.parse(saved) : MOCK_TOURNAMENTS;
  });

  const [userRegistrations, setUserRegistrations] = useState(() => {
    const saved = localStorage.getItem("userRegistrations");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("tournaments", JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem("userRegistrations", JSON.stringify(userRegistrations));
  }, [userRegistrations]);

  const getTournamentById = (id) => {
    return tournaments.find((t) => t.id === parseInt(id));
  };

  const isUserRegistered = (tournamentId, userId) => {
    return userRegistrations.some(
      (reg) => reg.tournamentId === tournamentId && reg.userId === userId
    );
  };

  const registerUser = (tournamentId, userId, username) => {
    // Add to user registrations
    setUserRegistrations((prev) => [
      ...prev,
      {
        id: Date.now(),
        tournamentId,
        userId,
        username,
        registeredAt: new Date().toISOString(),
        hasPaid: false,
      },
    ]);

    // Add to tournament's registered players
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === tournamentId
          ? {
              ...t,
              registeredPlayers: [
                ...t.registeredPlayers,
                { userId, username, registeredAt: new Date().toISOString() },
              ],
            }
          : t
      )
    );
  };

  const markAsPaid = (tournamentId, userId) => {
    setUserRegistrations((prev) =>
      prev.map((reg) =>
        reg.tournamentId === tournamentId && reg.userId === userId
          ? { ...reg, hasPaid: true, paidAt: new Date().toISOString() }
          : reg
      )
    );
  };

  const updateTournamentStatus = (tournamentId, newStatus) => {
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === tournamentId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const startTournament = (tournamentId) => {
    updateTournamentStatus(tournamentId, TOURNAMENT_STATUS.ONGOING);
  };

  const completeTournament = (tournamentId) => {
    updateTournamentStatus(tournamentId, TOURNAMENT_STATUS.COMPLETED);
  };

  const getUserRegistration = (tournamentId, userId) => {
    return userRegistrations.find(
      (reg) => reg.tournamentId === tournamentId && reg.userId === userId
    );
  };

  const value = {
    tournaments,
    userRegistrations,
    TOURNAMENT_STATUS,
    getTournamentById,
    isUserRegistered,
    registerUser,
    markAsPaid,
    updateTournamentStatus,
    startTournament,
    completeTournament,
    getUserRegistration,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};