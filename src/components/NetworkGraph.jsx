 function NetworkGraph({ network }) {
  const total = 10;
  const attacker = Math.floor(network.attackerPower / 10);

  return (
    <div className="panel">
      <h3>🌐 Network Nodes</h3>

      <svg width="300" height="200">
        {[...Array(total)].map((_, i) => (
          <circle
            key={i}
            cx={30 + i * 25}
            cy="100"
            r="10"
            fill={i < attacker ? "red" : "#00f7ff"}
          />
        ))}
      </svg>

      <p>Attacker Power: {network.attackerPower}%</p>
      <p>Sybil Nodes: {network.sybilNodes}</p>
    </div>
  );
}
export default NetworkGraph;