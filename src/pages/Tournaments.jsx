import Navigation from "../components/Navigation";
import tournaments from "../data/tournaments";
import TournamentCard from "../components/TournamentCard";

const Tournaments = () => (
  <div className="min-h-screen bg-black">
    <Navigation />
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {tournaments.map(t => (
        <TournamentCard key={t.id} tournament={t} />
      ))}
    </div>
  </div>
);

export default Tournaments;
