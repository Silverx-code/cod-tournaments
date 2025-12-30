const TournamentCard = ({ tournament }) => {
  return (
    <div className="bg-gray-900 p-6 rounded border border-red-600 text-white">
      <h3 className="text-xl font-bold">{tournament.name}</h3>
      <p className="text-red-500">{tournament.prize}</p>
      <p className="text-gray-400">
        {tournament.players}/{tournament.maxPlayers} players
      </p>
      <p className="text-sm">{tournament.date}</p>

      <button className="mt-4 w-full bg-red-600 py-2 rounded">
        REGISTER
      </button>
    </div>
  );
};

export default TournamentCard;
