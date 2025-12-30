import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Home = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);
  const [crosshair, setCrosshair] = useState({ x: 0, y: 0 });
  const [shots, setShots] = useState([]);

  /* Generate floating bubbles */
  useEffect(() => {
    const items = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 30 + Math.random() * 60,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 10,
    }));
    setBubbles(items);
  }, []);

  /* Track mouse for crosshair */
  useEffect(() => {
    const move = (e) => setCrosshair({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Click shooting effect */
  const shoot = (e) => {
    const shot = { id: Date.now(), x: e.clientX, y: e.clientY };
    setShots((prev) => [...prev, shot]);

    setTimeout(() => {
      setShots((prev) => prev.filter((s) => s.id !== shot.id));
    }, 500);
  };

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden cursor-none"
      onClick={shoot}
    >
      <Navigation />

      {/* Floating bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-gray-700/20 backdrop-blur-sm border border-gray-700 animate-float"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            bottom: "-120px",
          }}
        />
      ))}

      {/* Crosshair */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: crosshair.x,
          top: crosshair.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative w-8 h-8">
          <div className="absolute left-0 top-1/2 w-3 h-0.5 bg-gray-300" />
          <div className="absolute right-0 top-1/2 w-3 h-0.5 bg-gray-300" />
          <div className="absolute top-0 left-1/2 h-3 w-0.5 bg-gray-300" />
          <div className="absolute bottom-0 left-1/2 h-3 w-0.5 bg-gray-300" />
          <div className="absolute inset-1/2 w-1 h-1 bg-gray-300 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Shot effects */}
      {shots.map((s) => (
        <div
          key={s.id}
          className="fixed pointer-events-none animate-ping"
          style={{
            left: s.x,
            top: s.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 bg-gray-400 rounded-full opacity-60" />
        </div>
      ))}

      {/* HERO */}
      <section className="relative z-10 py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Call of Duty <span className="text-gray-400">Tournaments</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Competitive COD tournaments. Real players. Real prizes.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/tournaments")}
            className="bg-gray-800 hover:bg-gray-700 transition px-8 py-4 rounded-lg font-bold"
          >
            Join Tournament
          </button>

          <button
            onClick={() => navigate("/tournaments")}
            className="border border-gray-700 hover:bg-gray-800 transition px-8 py-4 rounded-lg font-bold"
          >
            View Tournaments
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Ranked Matches",
            desc: "Skill-based competitive matchmaking.",
          },
          {
            title: "Cash Prizes",
            desc: "Win real money in organized tournaments.",
          },
          {
            title: "Fair Play",
            desc: "Zero tolerance for cheating and exploits.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition"
          >
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* STATUS */}
      <section className="relative z-10 bg-gray-900 border-t border-gray-800 py-10 text-center text-gray-300">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" />
          System Status: ONLINE
        </span>
      </section>
    </div>
  );
};

export default Home;
