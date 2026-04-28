import { Link, useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Fort Kochi",
    desc: "Historic coastal area known for colonial architecture, Chinese fishing nets, and cultural streets.",
    location: "Kochi"
  },
  {
    name: "Cherai Beach",
    desc: "A long, calm beach with shallow waters, coconut groves, and occasional dolphin sightings.",
    location: "Kochi"
  },
  {
    name: "Munnar",
    desc: "Hill station famous for tea plantations, misty valleys, and scenic viewpoints.",
    location: "Munnar"
  },
  {
    name: "Alleppey",
    desc: "Backwater paradise with houseboats, canals, and slow village life.",
    location: "Alleppey"
  },
  {
    name: "Wayanad",
    desc: "Forest-covered hills with waterfalls, caves, and wildlife experiences.",
    location: "Wayanad"
  },
  {
    name: "Varkala",
    desc: "Cliffside beach destination with cafes, sunsets, and spiritual vibes.",
    location: "Varkala"
  }
];

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

          <div className="grid-3">

            <div className="card">
              <h2 className="card-title">Fort Kochi</h2>
              <p className="card-desc">
                Historic coastal area known for colonial architecture, Chinese fishing nets, and cultural streets.
              </p>
              <button
                className="card-btn"
                onClick={() => navigate("/guides?location=Kochi")}
              >
                Find Guides
              </button>
            </div>

            <div className="card">
              <h2 className="card-title">Cherai Beach</h2>
              <p className="card-desc">
                A calm beach with shallow waters, coconut groves, and occasional dolphin sightings.
              </p>
              <button
                className="card-btn"
                onClick={() => navigate("/guides?location=Cherai")}
              >
                Find Guides
              </button>
            </div>

            <div className="card">
              <h2 className="card-title">Munnar</h2>
              <p className="card-desc">
                Tea plantations, misty hills, waterfalls, and cool climate perfect for nature lovers.
              </p>
              <button
                className="card-btn"
                onClick={() => navigate("/guides?location=Munnar")}
              >
                Find Guides
              </button>
            </div>

            <div className="card">
              <h2 className="card-title">Alleppey</h2>
              <p className="card-desc">
                Famous for houseboats, backwaters, and peaceful village life along canals.
              </p>
              <button
                className="card-btn"
                onClick={() => navigate("/guides?location=Alleppey")}
              >
                Find Guides
              </button>
            </div>

            <div className="card">
              <h2 className="card-title">Varkala</h2>
              <p className="card-desc">
                Cliffside beaches, cafes, sunset views, and a relaxed coastal vibe.
              </p>
              <button
                className="card-btn"
                onClick={() => navigate("/guides?location=Varkala")}
              >
                Find Guides
              </button>
            </div>

            <div className="card">
              <h2 className="card-title">Wayanad</h2>
              <p className="card-desc">
                Forests, waterfalls, caves, and wildlife experiences in the Western Ghats.
              </p>
              <button
                className="card-btn"
                onClick={() => navigate("/guides?location=Wayanad")}
              >
                Find Guides
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
