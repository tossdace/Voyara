import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import guides from "../data/guides";

const handleWhatsAppClick = (guide) => {
  // Persist lead intent
  const payload = {
    guideId: guide.id,
    guideName: guide.name,
    location: guide.location,
    ts: Date.now()
  };
  localStorage.setItem("lastLead", JSON.stringify(payload));

  // Track event
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', { guide: guide.name });
  }

  const msg = `Hi! I found Hirevoy 👋

I'm interested in booking a local guide.

📍 Location: ${guide.location}
👤 Guide: ${guide.name}
💰 Budget: ₹${guide.price}

Can you share details and availability?`;

  window.open(
    `https://wa.me/919778405403?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener,noreferrer"
  );
};

const GuideCard = ({ guide, highlight = false, index = 0 }) => {
  const navigate = useNavigate();
  const languages = guide.languages?.join(", ") || guide.language;

  return (
    <div
      className="guide-card"
      onClick={() => {
        if (window.gtag) {
          window.gtag('event', 'guide_click', { guide: guide.name });
        }
        navigate(`/guides/${guide.id}`);
      }}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <h3 className="guide-name">{guide.name}</h3>

      <p className="guide-meta">
        {guide.languages.join(", ")} • ₹{guide.price}/day
      </p>

      <div className="guide-trust">
        <span>✓ Verified</span>
        <span>{guide.location}</span>
        <span>{guide.travelers || 120}+ travelers</span>
      </div>

      <button
        className="guide-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleWhatsAppClick(guide);
        }}
      >
        Chat with Guide
      </button>
    </div>
  );
};

const Guides = () => {
  const [searchParams] = useSearchParams();
  const locationFilter = searchParams.get("location") || "";
  const [search, setSearch] = useState(() => locationFilter);
  const [budget, setBudget] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);

  const hasActiveFilters = search || budget || language;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', { page_title: 'Guides' });
    }
  }, []);

  useEffect(() => {
    if (hasActiveFilters) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasActiveFilters]);

  const clearFilters = () => {
    setSearch("");
    setBudget("");
    setLanguage("");
  };

  const filtered = guides.filter((guide) => {
    return (
      guide.location.toLowerCase().includes(search.toLowerCase()) &&
      (budget === "" || guide.price <= budget) &&
      (language === "" || guide.language === language)
    );
  });

  const topGuides = filtered.slice(0, 2);
  const remainingGuides = filtered.slice(2);

  if (loading) {
    return (
      <p
        style={{
          padding: "2rem",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
        }}
      >
        Loading guides...
      </p>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1rem", fontWeight: "700", color: "white" }}>
          Find Trusted Local Guides
        </h1>

        {search && (
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <p style={{ color: "#4ade80", fontWeight: "500" }}>
              Showing trusted guides in {search}
            </p>
            <button
              type="button"
              onClick={() => navigate('/destinations')}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                background: "transparent",
                border: "1px solid #4ade80",
                borderRadius: "0.5rem",
                color: "#4ade80",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Change location
            </button>
          </div>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            style={{
              marginBottom: "1rem",
              padding: "6px 10px",
              background: "#ef4444",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: "white",
            }}
          >
            Clear Filter
          </button>
        )}

        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "1.5rem",
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "6px",
          }}
        />

        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              padding: "8px",
              background: "#0f172a",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
            }}
          >
            <option value="">All Budgets</option>
            <option value="1000">Under ₹1000</option>
            <option value="1500">Under ₹1500</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "8px",
              background: "#0f172a",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
            }}
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              No guides found for "{search}"
            </p>

            <button
              type="button"
              onClick={clearFilters}
              style={{
                marginTop: "0.75rem",
                padding: "0.6rem 1rem",
                background: "#22c55e",
                border: "none",
                borderRadius: "0.5rem",
                color: "#020617",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              View All Guides
            </button>
          </div>
        ) : (
          <div className="section-container">
            <div className="grid-3">
              {filtered.map((guide) => (
                <div key={guide.id} className="card">
                  <h3 className="card-title">{guide.name}</h3>

                  <p className="card-desc">
                    {guide.location} • ₹{guide.price}/day
                  </p>

                  <p className="card-desc">
                    ✓ Verified • {guide.travelers || 120}+ travelers
                  </p>

                  <button
                    className="card-btn"
                    onClick={() => handleWhatsAppClick(guide)}
                  >
                    Chat with Guide
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;
