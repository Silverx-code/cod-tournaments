import StatCard from "../components/StatCard";

// In your component:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard
    title="Total Wins"
    value="145"
    icon="🏆"
    change="+12"
    changeType="positive"
  />
  
  <StatCard
    title="Win Rate"
    value="68%"
    icon="📊"
    change="+5%"
    changeType="positive"
  />
  
  <StatCard
    title="K/D Ratio"
    value="2.45"
    icon="🎯"
    change="-0.15"
    changeType="negative"
  />
  
  <StatCard
    title="Tournaments"
    value="23"
    icon="🎮"
    change="+3"
    changeType="positive"
  />
</div>

export default StatCard;
