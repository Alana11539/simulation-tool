import { useParams } from "react-router-dom";
import attackData from "../data/attackData.jsx";
import "../styles/page.css";

function Study() {
  const { id } = useParams(); // route param

  console.log("Route ID:", id);
  console.log("Attack IDs:", attackData.map(a => a.numericId));

  // ✅ FIX: use attackData + id
  const attack = attackData.find(
    a => a.numericId === id || a.id === id
  );

  console.log("Attack Found:", attack);

  // ✅ FIX: correct variable name
  if (!attack) return <h2>Attack not found</h2>;

  return (
    <div className="container">
      <h1>{attack.name}</h1>

      <p>
        <strong>Description:</strong> {attack.description}
      </p>

      <p>
        <strong>How it Works:</strong> {attack.howItWorks}
      </p>

      <h3>Steps</h3>
      <ul>
        {attack.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>

      <p>
        <strong>Real World Cases:</strong>
        <br />
        {attack.realWorldCases}
      </p>

      <p>
        <strong>Prevention:</strong>
        <br />
        {attack.prevention}
      </p>

      <p>
        <strong>Additional Notes:</strong>
        <br />
        {attack.additionalNotes}
      </p>
    </div>
  );
}

export default Study;
