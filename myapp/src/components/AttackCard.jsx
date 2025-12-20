import { useNavigate } from "react-router-dom";

function AttackCard({ attack }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h2>{attack.name}</h2>
      <p>{attack.description}</p>

      <div className="card-actions">
        <button
          className="btn"
          onClick={() => navigate(`/study/${attack.id}`)}
        >
          Study
        </button>

        <button
          className="btn primary"
          onClick={() => navigate(`/simulate/${attack.id}`)}
        >
          Simulate
        </button>
      </div>
    </div>
  );
}

export default AttackCard;
