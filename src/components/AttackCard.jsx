import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AttackCard({ attack }) {
  const navigate = useNavigate();

  // Images mapping
  const attackImages = {
    phishing: [
      "/pishing3.jpg",
    ],
    fiftyone: [
      "/51-2.jpg",
    ],
    sybil: [
      "/sybil2.png",
      
    ],
    hotwallet: [
      "/hot2.jpg",
      
    ],
    exchange: [
      "/e2.webp",
     
    ],
  };

  // Slide state
  const [slide, setSlide] = useState(0);

  // Normalize id for 51% attack
  const attackKey = attack.id === "51" ? "fiftyone" : attack.id;
  const images = attackImages[attackKey] || [];

  // Auto-slide carousel every 3 sec
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setSlide(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="card">
      <h2>{attack.name}</h2>

      {/* Carousel */}
      {images.length > 0 && (
        <div className="carousel" style={{ marginBottom: '20px' }}>
          <img
            src={images[slide]}
            alt={`${attack.name} visual`}
            className="carousel-img"
          />
        </div>
      )}

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
