import { Link, useNavigate } from "react-router-dom";
import destinations from "../data/destinations";

const Destinations = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #020617 58%, #03122c 100%)",
        color: "white",
        padding: "4rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "72rem",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <Link
            to="/"
            style={{
              color: "#4ade80",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <div className="section-container">
          <h1>Explore Destinations</h1>
          <p>Pick a Kerala destination and find trusted local guides.</p>

          <div className="destinations-grid">
            {destinations.map((d) => (
              <div key={d.id} className="destination-card">
                <img src={d.image} alt={d.name} />

                <div className="card-content">
                  <span className="destination-tag">{d.tag}</span>
                  <h3>{d.name}</h3>
                  <p>{d.description}</p>

                  <button
                    className="primary-btn"
                    onClick={() => navigate(`/guides?location=${d.name}`)}
                  >
                    Explore with a Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
