import React, { useState, useEffect } from "react";

// ─── Color System ──────────────────────────────────────────────────────────
const colors = {
  primary: "#2d6a4f",
  accent: "#52b788",
  light: "#d8f3dc",
  dark: "#1b4332",
  highlight: "#74c69d",
  neutral: "#f8f9fa",
  text: "#212529"
};

// ─── Fonts (injected via style tag) ────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --green-deep: #1a3c2e;
      --green-mid: #2d6a4f;
      --green-accent: #40916c;
      --green-light: #74c69d;
      --green-pale: #d8f3dc;
      --cream: #faf9f6;
      --charcoal: #1c1c1e;
      --muted: #6b7280;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      overflow-x: hidden;
    }

    .font-display { font-family: 'Cormorant Garamond', serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-thumb { background: var(--green-accent); border-radius: 3px; }

    /* Fade-up animation */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-24px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .anim-fadeup  { animation: fadeUp  0.7s ease forwards; }
    .anim-fadein  { animation: fadeIn  0.6s ease forwards; }
    .anim-slide   { animation: slideRight 0.6s ease forwards; }

    .delay-100 { animation-delay: 0.1s; opacity: 0; }
    .delay-200 { animation-delay: 0.2s; opacity: 0; }
    .delay-300 { animation-delay: 0.3s; opacity: 0; }
    .delay-400 { animation-delay: 0.4s; opacity: 0; }
    .delay-500 { animation-delay: 0.5s; opacity: 0; }
    .delay-600 { animation-delay: 0.6s; opacity: 0; }

    /* Hover card lift */
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 48px rgba(26,60,46,0.15);
    }

    /* Pill tag */
    .pill {
      display: inline-flex; align-items: center; gap: 4px;
      background: var(--green-pale); color: var(--green-mid);
      font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em;
      padding: 4px 12px; border-radius: 99px;
    }

    /* Nav blur */
    .nav-blur {
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    /* Green underline */
    .green-underline {
      position: relative;
    }
    .green-underline::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 56px; height: 3px;
      background: var(--green-accent);
      border-radius: 2px;
    }

    /* Star fill */
    .star-filled { color: #f59e0b; }
    .star-empty  { color: #d1d5db; }

    /* Image overlay */
    .img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(10,30,20,0.85) 0%, rgba(10,30,20,0.2) 60%, transparent 100%);
    }

    /* Section divider */
    .section-line {
      width: 56px; height: 3px;
      background: linear-gradient(90deg, var(--green-accent), var(--green-light));
      border-radius: 2px;
      margin: 0 auto 1.5rem;
    }

    /* Mobile nav */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-links.open { display: flex; flex-direction: column; }
    }
  `}</style>
);

// ─── Navbar ─────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(45,106,79,0.1)" : "none",
        transition: "background 0.4s ease, border 0.4s ease",
      }}
      className="nav-blur"
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #2d6a4f, #40916c)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
              <circle cx="12" cy="9" r="2.5" fill="#2d6a4f"/>
            </svg>
          </div>
          <span className="font-display" style={{
            fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.01em",
            color: scrolled ? "var(--green-deep)" : "white",
            transition: "color 0.3s",
          }}>
            Voyara
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "2.25rem", alignItems: "center" }} className="nav-links">
          {["Home", "Destinations", "Guides", "Contact"].map(link => (
            <a key={link} href="#" style={{
              fontSize: "0.9rem", fontWeight: 500,
              color: scrolled ? "var(--charcoal)" : "rgba(255,255,255,0.88)",
              textDecoration: "none", letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "var(--green-accent)"}
              onMouseLeave={e => e.target.style.color = scrolled ? "var(--charcoal)" : "rgba(255,255,255,0.88)"}
            >
              {link}
            </a>
          ))}
          <button style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: "white", border: "none", borderRadius: 99,
            padding: "10px 22px", fontSize: "0.875rem", fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.02em",
            boxShadow: `0 4px 14px ${colors.primary}59`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = `0 6px 20px ${colors.primary}73`; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = `0 4px 14px ${colors.primary}59`; }}
          >
            Start Exploring
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
          className="md:hidden"
          aria-label="Menu"
        >
          <div style={{ width: 22, height: 2, background: scrolled ? "var(--charcoal)" : "white", marginBottom: 5, transition: "background 0.3s" }} />
          <div style={{ width: 22, height: 2, background: scrolled ? "var(--charcoal)" : "white", marginBottom: 5, transition: "background 0.3s" }} />
          <div style={{ width: 14, height: 2, background: scrolled ? "var(--charcoal)" : "white", transition: "background 0.3s" }} />
        </button>
      </div>
    </nav>
  );
};

// ─── Hero ───────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{
    position: "relative", height: "100vh", minHeight: 640,
    display: "flex", alignItems: "center", justifyContent: "center",
    overflow: "hidden",
  }}>
    {/* Background */}
    <img
      src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1800&auto=format&fit=crop"
      alt="Kerala backwaters"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
    />
    {/* Overlay */}
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(135deg, rgba(27,67,50,0.6) 0%, rgba(45,106,79,0.7) 60%, rgba(82,183,136,0.5) 100%)",
    }} />

    {/* Grain texture */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.03,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
    }} />

    {/* Content */}
    <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 820 }}>
      <div className="pill anim-fadein delay-100" style={{ marginBottom: "1.5rem", background: "rgba(116,198,157,0.15)", color: "var(--green-light)", border: "1px solid rgba(116,198,157,0.3)" }}>
        <span>✦</span> Now in Early Access — Kerala
      </div>

      <h1
        className="font-display anim-fadeup delay-200"
        style={{
          fontSize: "clamp(2.4rem, 6vw, 5rem)",
          fontWeight: 600,
          lineHeight: 1.1,
          color: "white",
          letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
        }}
      >
        Don't Just Visit.<br />
        <em style={{ fontStyle: "italic", color: colors.highlight }}>Experience It</em> With a Local.
      </h1>

      <p className="anim-fadeup delay-300" style={{
        fontSize: "clamp(1rem, 2vw, 1.2rem)",
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.7,
        maxWidth: 560, margin: "0 auto 2.5rem",
        fontWeight: 300,
      }}>
        Book trusted local guides and discover hidden places tourists miss — from backwater villages to misty hilltop trails.
      </p>

      <div className="anim-fadeup delay-400" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => {
            const section = document.getElementById("guides");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: "white",
            border: "none",
            borderRadius: 99,
            padding: "15px 32px",
            fontSize: "0.975rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: `0 8px 25px ${colors.primary}66`,
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Find a Guide →
        </button>
        <button style={{
          background: "rgba(255,255,255,0.1)",
          color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 99,
          padding: "15px 32px", fontSize: "0.975rem", fontWeight: 500,
          cursor: "pointer", backdropFilter: "blur(8px)",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          Become a Guide
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="anim-fadein delay-600" style={{ marginTop: "4rem" }}>
        <div style={{
          width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          margin: "0 auto",
        }} />
      </div>
    </div>

    {/* Stats bar */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "rgba(10,30,20,0.7)", backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(116,198,157,0.15)",
      padding: "1.25rem 2rem",
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem",
      }}>
        {[
          ["Launching Soon", "Local Guides"],
          ["Be the First", "Kerala Destinations"],
          ["Early Access", "Happy Travelers"],
          ["Building Trust", "Average Rating"],
        ].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div className="font-display" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--green-light)", letterSpacing: "-0.01em" }}>{num}</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Value Proposition ──────────────────────────────────────────────────────
const ValueProp = () => {
  const features = [
    { icon: "🗺️", title: "Hidden Local Spots", desc: "Skip the tour buses. Your guide knows the secret beaches, ancient temples, and viewpoints that aren't on any map." },
    { icon: "🍛", title: "Authentic Food Experiences", desc: "Eat where locals eat. From toddy shops to rooftop fish curries — real Kerala on your plate." },
    { icon: "🎭", title: "Cultural Insights", desc: "Understand what you're seeing. Every ritual, every craft, every face — explained with lived experience." },
    { icon: "✅", title: "Verified Safe Guides", desc: "Every guide is background-checked, reviewed, and certified. You travel, we handle the trust." },
  ];

  return (
    <section style={{ background: "white", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-line" />
          <h2 className="font-display" style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 600,
            color: colors.dark, letterSpacing: "-0.02em", marginBottom: "0.75rem",
          }}>
            Skip the Tourist Traps
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Real travel is messy, unplanned, and deeply human. Voyara connects you to people who live it every day.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {features.map((f, i) => (
            <div key={i} className="card-hover" style={{
              background: "white", borderRadius: 20,
              padding: "2rem 1.75rem",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transform: "translateY(0)",
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                fontSize: "1.75rem", marginBottom: "1rem",
                width: 52, height: 52, borderRadius: 14,
                background: "var(--green-pale)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: colors.text, marginBottom: "0.5rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.75 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ───────────────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Choose Your Destination", desc: "Browse Kerala's finest destinations — from Munnar's tea gardens to Kochi's colonial streets. Pick where you want to go.", icon: "📍" },
    { num: "02", title: "Select Your Guide", desc: "Filter by language, specialty, budget, and ratings. Read real reviews from verified travelers.", icon: "🧭" },
    { num: "03", title: "Book Instantly", desc: "Confirm in seconds. Secure payment, instant confirmation, direct contact with your guide.", icon: "⚡" },
  ];

  return (
    <section style={{
      background: `linear-gradient(180deg, ${colors.light} 0%, white 100%)`,
      padding: "6rem 2rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: 400, height: 400, borderRadius: "50%",
        background: "rgba(64,145,108,0.12)",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80,
        width: 280, height: 280, borderRadius: "50%",
        background: "rgba(116,198,157,0.08)",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <div className="section-line" style={{ background: "linear-gradient(90deg, var(--green-light), var(--green-pale))" }} />
          <h2 className="font-display" style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em",
            color: "white", marginBottom: "0.75rem",
          }}>
            How It Works
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 400, margin: "0 auto" }}>
            Three steps from your couch to a real Kerala adventure.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(116,198,157,0.15)",
              borderRadius: 24, padding: "2.5rem 2rem",
              backdropFilter: "blur(8px)",
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span className="font-display" style={{
                  fontSize: "2.5rem", fontWeight: 700,
                  color: "rgba(116,198,157,0.3)", lineHeight: 1,
                }}>
                  {step.num}
                </span>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(64,145,108,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem",
                }}>
                  {step.icon}
                </div>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "white", marginBottom: "0.75rem" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
                {step.desc}
              </p>

              {i < 2 && (
                <div style={{
                  position: "absolute", right: -0.75, top: "50%",
                  color: "var(--green-accent)", fontSize: "1.5rem",
                }}>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Explore Places ─────────────────────────────────────────────────────────
const places = [
  {
    name: "Fort Kochi",
    tag: "Heritage & Culture",
    desc: "Wander Dutch cemeteries, Chinese fishing nets at sunrise, and spice markets that smell like the 1500s.",
    img: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&auto=format&fit=crop",
    guides: 84,
  },
  {
    name: "PARAVOOR",
    tag: "Hills & Tea Gardens",
    desc: "Endless emerald tea estates, rolling mist, elephant sightings, and cardamom-scented air above 6,000 feet.",
    img: "https://images.unsplash.com/photo-1587653915936-d8d30a22e079?w=800&auto=format&fit=crop",
    guides: 62,
  },
  {
    name: "CHERAI",
    tag: "Backwaters & Villages",
    desc: "Glide through a network of canals, sleep on a houseboat, and watch village life unfold on the water.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&crop=center",
    guides: 97,
  },
];

const ExplorePlaces = () => (
  <section style={{ padding: "7rem 2rem", background: "var(--cream)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: "3.5rem" }}>
        <div className="section-line" style={{ margin: "0 0 1.25rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 className="font-display" style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 600,
              color: "var(--green-deep)", letterSpacing: "-0.02em",
            }}>
              Explore Places
            </h2>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>Three of Kerala's most unforgettable destinations.</p>
          </div>
          <a href="#" style={{ color: "var(--green-accent)", fontWeight: 500, textDecoration: "none", fontSize: "0.9rem" }}>
            View all destinations →
          </a>
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}>
        {places.map((place, i) => (
          <div key={i} className="card-hover" style={{
            borderRadius: 24, overflow: "hidden",
            background: "white",
            boxShadow: "0 2px 20px rgba(26,60,46,0.08)",
            border: "1px solid rgba(45,106,79,0.06)",
          }}>
            <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
              <img
                src={place.img} alt={place.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}
              />
              <div className="img-overlay" />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span className="pill" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}>
                  {place.tag}
                </span>
              </div>
              <div style={{ position: "absolute", bottom: 14, right: 14 }}>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", background: "rgba(0,0,0,0.35)", padding: "4px 10px", borderRadius: 99 }}>
                  {place.guides} guides available
                </span>
              </div>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 className="font-display" style={{ fontSize: "1.45rem", fontWeight: 700, color: colors.dark, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                {place.name}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                {place.desc}
              </p>
            <button style={{
              width: "100%", background: colors.primary,
              color: "white", border: "none", borderRadius: 12,
              padding: "12px", fontSize: "0.875rem", fontWeight: 600,
              cursor: "pointer", transition: "background 0.2s, transform 0.2s",
              transform: "scale(1)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = colors.accent; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.transform = "scale(1)"; }}
            >
                Explore with Guide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Featured Guides ────────────────────────────────────────────────────────
const guides = [
  {
    name: "Abishek Rajan",
    location: "Fort Kochi",
    rating: 0,
    reviews: 0,
    langs: ["English", "Malayalam", "Hindi"],
    price: "log in to verify",
    specialty: "Heritage & History",
  },
  {
    name: "Eldho Sibi",
    location: "Munnar",
    rating: 0,
    reviews: 0,
    langs: ["English", "Malayalam", "Tamil"],
    price: "log in to verify",
    specialty: "Nature & Wildlife",
    },
  {
    name: "Parvathy",
    location: "Alleppey",
    rating: 0,
    reviews: 0,
    langs: ["English", "Malayalam"],
    price: "log in to verify",
    specialty: "Backwaters & Villages",
    },
];

const FeaturedGuides = ({ onBookNow }) => (
  <section id="guides" style={{
    padding: "7rem 2rem",
    background: "linear-gradient(180deg, var(--green-pale) 0%, var(--cream) 100%)",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <div className="section-line" />
        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em",
          color: colors.dark, marginBottom: "0.75rem",
        }}>
          Meet Your Guides
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 440, margin: "0 auto" }}>
          Our first cohort of early-access guides — verified locals ready to show you Kerala before the crowds arrive.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}>
        {guides.map((g, i) => (
          <div key={i} className="card-hover" style={{
            background: "white", borderRadius: 24,
            padding: "2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
            transform: "translateY(0)",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1.05rem", color: "var(--charcoal)" }}>{g.name}</h3>
                <p style={{ fontSize: "0.72rem", color: "var(--green-accent)", fontWeight: 500, marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>✔</span> Identity Verified
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>📍 {g.location}</p>
                <span className="pill" style={{ fontSize: "0.7rem" }}>{g.specialty}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.04em",
                background: "rgba(64,145,108,0.1)", color: "var(--green-accent)",
                padding: "3px 10px", borderRadius: 99, border: "1px solid rgba(64,145,108,0.2)",
              }}>
                Early Guide
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>New · Recently Joined</span>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Speaks</p>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {g.langs.map(l => (
                  <span key={l} style={{
                    background: "#f3f4f6", color: "#374151",
                    fontSize: "0.75rem", padding: "3px 10px", borderRadius: 99,
                  }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--green-mid)" }}>
                  Contact to know
                </span>
              </div>
              <button 
                onClick={onBookNow}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "9px 20px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: `0 4px 12px ${colors.primary}4d`,
                 transition: "transform 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Trust Section ──────────────────────────────────────────────────────────
const TrustSection = () => {
  const items = [
    { icon: "🔍", title: "Background Verified", desc: "Every guide undergoes a thorough police verification and identity check before joining Voyara." },
    { icon: "🪪", title: "ID Authenticated", desc: "Government-issued ID verification ensures you always know who's guiding you." },
    { icon: "🔐", title: "Secure Booking", desc: "SSL-encrypted payments, zero hidden fees, and instant refunds for cancellations." },
    { icon: "⭐", title: "Ratings & Reviews", desc: "Every booking results in a verified review. No fake ratings, no exceptions." },
  ];

  return (
    <section style={{ padding: "6rem 2rem", background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
          alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <div className="section-line" style={{ margin: "0 0 1.5rem" }} />
            <h2 className="font-display" style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em",
              color: colors.dark, marginBottom: "1rem",
            }}>
              Your Safety<br />Matters to Us
            </h2>
            <p style={{ color: colors.text, lineHeight: 1.8, marginBottom: "2rem", maxWidth: 380 }}>
              We don't just list guides — we vet them. Every person on Voyara has passed our safety checks, so you can focus on the experience.
            </p>
            <button style={{
              background: colors.primary, color: "white",
              border: "none", borderRadius: 12, padding: "13px 26px",
              fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
              transform: "scale(1)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = colors.accent; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Learn about our safety process
            </button>
          </div>

          {/* Right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {items.map((item, i) => (
              <div key={i} style={{
                background: i % 2 === 0 ? "var(--green-pale)" : "var(--green-deep)",
                borderRadius: 20, padding: "1.5rem",
                transition: "transform 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h4 style={{
                  fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.4rem",
                  color: i % 2 === 0 ? "var(--green-deep)" : "white",
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: "0.78rem", lineHeight: 1.65,
                  color: i % 2 === 0 ? "var(--muted)" : "rgba(255,255,255,0.6)",
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Final CTA ───────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section
    style={{
      position: "relative",
      overflow: "hidden",
      padding: "8rem 2rem",
      background: `linear-gradient(135deg, ${colors.dark} 0%, #0d2b1f 100%)`,
      textAlign: "center",
    }}
  >
    {/* Background decoration */}
    <div
      style={{
        position: "absolute",
        top: -100,
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(64,145,108,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -60,
        right: -60,
        width: 240,
        height: 240,
        borderRadius: "50%",
        background: "rgba(116,198,157,0.07)",
      }}
    />

    <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
      <div
        className="pill"
        style={{
          background: "rgba(116,198,157,0.12)",
          color: "var(--green-light)",
          border: "1px solid rgba(116,198,157,0.2)",
          marginBottom: "1.5rem",
        }}
      >
        ✦ Ready to explore?
      </div>

      <h2
        className="font-display"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          fontWeight: 600,
          color: "white",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          marginBottom: "1.25rem",
        }}
      >
        Start Exploring Kerala
        <br />
        <em style={{ color: colors.highlight, fontStyle: "italic" }}>
          Like a Local
        </em>
      </h2>

      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "1.05rem",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}
      >
        We're just getting started. Be among the first travelers to experience
        Kerala through the eyes of a local — early access, real connections, no
        tourist traps.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* PRIMARY BUTTON */}
        <button
          onClick={() => {
            const section = document.getElementById("guides");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            } else {
              console.warn("guides section not found");
            }
          }}
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: "white",
            border: "none",
            borderRadius: 99,
            padding: "16px 36px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Find Your Guide →
        </button>

        {/* SECONDARY BUTTON */}
        <button
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 99,
            padding: "16px 36px",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
        >
          Browse Destinations
        </button>
      </div>
    </div>
  </section>
);
// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    background: "#0a1a11", color: "rgba(255,255,255,0.55)",
    padding: "3.5rem 2rem 2rem",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem",
        marginBottom: "3rem",
      }}>
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #2d6a4f, #40916c)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
                <circle cx="12" cy="9" r="2.5" fill="#2d6a4f"/>
              </svg>
            </div>
            <span className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "white" }}>Voyara</span>
          </div>
          <p style={{ fontSize: "0.84rem", lineHeight: 1.75 }}>
            Connecting travelers with verified local guides for real, unfiltered Kerala experiences.
          </p>
        </div>

        {[
          ["Explore", ["Destinations", "Find a Guide", "How It Works", "Safety"]],
          ["Guides", ["Become a Guide", "Guide Dashboard", "Payouts", "Resources"]],
          ["Company", ["About Us", "Blog", "Careers", "Contact"]],
        ].map(([title, links]) => (
          <div key={title}>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>{title}</h4>
            <ul style={{ listStyle: "none" }}>
              {links.map(l => (
                <li key={l} style={{ marginBottom: "0.5rem" }}>
                  <a href="#" style={{
                    color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.84rem",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.target.style.color = "var(--green-light)"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        paddingTop: "1.5rem",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        fontSize: "0.8rem",
      }}>
        <span>© 2025 Voyara. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Cookies"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--green-light)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    message: ""
  });
  const [error, setError] = useState("");

  return (
    <>
      <FontStyle />
      <Navbar />
      <main>
        <Hero />
        <ValueProp />
        <HowItWorks />
        <ExplorePlaces />
        <FeaturedGuides onBookNow={() => setShowForm(true)} />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
 <a
  href="https://wa.me/919778405403?text=Hi%20I%20found%20Voyara%20and%20want%20to%20book%20a%20guide"
  target="_blank"
  rel="noopener noreferrer"
  title="Chat on WhatsApp"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#25D366",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
    zIndex: 1000,
    textDecoration: "none",
  }}
  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="28"
    height="28"
    fill="white"
  >
    <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.7L.5 31.5l8-2.1c2.2 1.2 4.6 1.8 7.1 1.8 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.3 0-4.5-.6-6.5-1.7l-.5-.3-4.7 1.2 1.3-4.6-.3-.5c-1.2-2-1.9-4.3-1.9-6.7C3.4 8.6 9.6 2.4 16 2.4S28.6 8.6 28.6 16 22.4 28.8 16 28.8zm7.5-9.3c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.6-.2-.9.2s-1 1.3-1.2 1.6c-.2.2-.4.3-.8.1-2.3-1.1-3.8-2-5.3-4.5-.4-.7.4-.6 1.1-2 .1-.2.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.7.1-1 .5s-1.4 1.4-1.4 3.4 1.5 4 1.7 4.3c.2.3 3 4.6 7.4 6.5 1 .4 1.8.6 2.4.8 1 .3 1.9.2 2.6.1.8-.1 2.4-1 2.8-1.9.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.7-.5z"/>
  </svg>
</a>
      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "400px",
          }}>
            <h2>Request a Guide</h2>
            <input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
            />
            <input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
            />
            <textarea
              placeholder="Tell us what you want to explore (food, places, etc.)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
            />
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}
            <button
              disabled={!formData.name || !formData.location}
              onClick={() => {
                if (!formData.name || !formData.location) {
                  setError("Please fill all required fields");
                  return;
                }

                const text = `Hi, my name is ${formData.name}.
I am from ${formData.location}.
I need: ${formData.message}`;

                const url = `https://wa.me/919778405403?text=${encodeURIComponent(text)}`;

                window.open(url, "_blank");

                setShowForm(false);
                setFormData({
                  name: "",
                  location: "",
                  message: ""
                });
                setError("");
              }}
              style={{
                width: "100%",
                padding: "12px",
                background: !formData.name || !formData.location ? "#ccc" : "#2d6a4f",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: !formData.name || !formData.location ? "not-allowed" : "pointer"
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "gray",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
