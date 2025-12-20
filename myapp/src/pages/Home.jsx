import AttackCard from "../components/AttackCard";

const attacks = [
  { id: "phishing", name: "Phishing Attack", description: "User deception based attack" },
  { id: "51", name: "51% Attack", description: "Majority control over blockchain network" },
  { id: "exchange", name: "Exchange Hack", description: "Centralized exchange compromise" },
  { id: "hotwallet", name: "Hot Wallet Attack", description: "Online wallet exploitation" },
  { id: "sybil", name: "Sybil Attack", description: "Multiple fake identities in network" }
];

function Home() {
  return (
    <div className="container">
      <h1>Crypto Attack Simulation Platform</h1>

      <div className="card-grid">
        {attacks.map(a => (
          <AttackCard key={a.id} attack={a} />
        ))}
      </div>
    </div>
  );
}
export default  Home;