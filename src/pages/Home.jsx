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
    <div className="container floating-particles">
      <div className="hero-section">
        <h1 className="hero-title">CryptoSec Simulator</h1>
        <h2 className="hero-subtitle">Explore Blockchain Vulnerabilities</h2>
        <p className="homepage-description">
          Dive into the world of blockchain security with our interactive simulation platform. Learn about and visualize various cryptocurrency attacks including phishing, 51% attacks, Sybil attacks, and more.
        </p>
      </div>

      <div className="card-grid">
        {attacks.map(a => (
          <AttackCard key={a.id} attack={a} />
        ))}
      </div>
    </div>
  );
}
export default  Home;
