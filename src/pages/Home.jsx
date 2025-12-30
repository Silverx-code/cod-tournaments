import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Call of Duty <span className="text-gray-400">Tournaments</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Competitive COD tournaments. Real players. Real prizes.
          Prove your dominance on the battlefield.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 transition px-8 py-4 rounded-lg font-bold">
            Join Tournament
          </button>

          <button className="border border-gray-700 hover:bg-gray-800 transition px-8 py-4 rounded-lg font-bold">
            View Tournaments
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Ranked Matches",
            desc: "Skill-based competitive matchmaking with verified stats.",
          },
          {
            title: "Cash Prizes",
            desc: "Win real money. Prize pools revealed before match day.",
          },
          {
            title: "Fair Play",
            desc: "Strict rules, anti-cheat checks, and fair competition.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-500 transition"
          >
            <h3 className="text-xl font-bold mb-3 text-gray-200">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Status Section */}
      <section className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="flex justify-center items-center gap-3 text-gray-300">
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          System Status: ONLINE
        </div>
      </section>
    </div>
  );
};

export default Home;
