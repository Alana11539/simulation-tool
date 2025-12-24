import { useParams, useNavigate } from "react-router-dom";
import attackData from "../data/attackData.jsx";
import "../styles/page.css";

function Study() {
  const { id } = useParams(); // route param
  const navigate = useNavigate();

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
    <div className="container" style={{ position: 'relative' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #374151',
          background: '#111827',
          color: '#e5e7eb',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => e.target.style.background = '#1f2937'}
        onMouseLeave={(e) => e.target.style.background = '#111827'}
      >
        ←
      </button>
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
