import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion as Motion,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Languages,
  Menu,
  MapPin,
  MapPinned,
  MessageCircle,
  Mountain,
  PhoneCall,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";

import guides from "../data/guides";
import alleppeyImage from "../assets/destinations/alleppey.jpg";
import athirappillyImage from "../assets/destinations/athirappilly.jpg";
import fortKochiImage from "../assets/destinations/fort-kochi.jpg";
import kovalamImage from "../assets/destinations/kovalam.jpg";
import munnarImage from "../assets/destinations/munnar.jpg";
import thekkadyImage from "../assets/destinations/thekkady.jpg";
import varkalaImage from "../assets/destinations/varkala.jpg";
import wayanadImage from "../assets/destinations/wayanad.jpg";

const WHATSAPP_NUMBER = "919778405403";

const destinations = [
  {
    id: "fort-kochi",
    name: "Fort Kochi",
    guideQuery: "Kochi",
    image: fortKochiImage,
    tag: "Heritage Harbor",
    description:
      "Colonial lanes, spice markets, art cafes, and sunset walks by the Chinese fishing nets.",
  },
  {
    id: "munnar",
    name: "Munnar",
    guideQuery: "Munnar",
    image: munnarImage,
    tag: "Tea Country",
    description:
      "Misty tea estates, quiet viewpoints, forest roads, and cool hill-station mornings.",
  },
  {
    id: "alleppey",
    name: "Alleppey",
    guideQuery: "Alleppey",
    image: alleppeyImage,
    tag: "Backwaters",
    description:
      "Slow canals, village paths, canoe rides, and local kitchens along the Vembanad backwaters.",
  },
  {
    id: "varkala",
    name: "Varkala",
    guideQuery: "Varkala",
    image: varkalaImage,
    tag: "Cliff Coast",
    description:
      "Red cliffs, golden beaches, sea-view cafes, and peaceful temple-side coastal walks.",
  },
  {
    id: "wayanad",
    name: "Wayanad",
    guideQuery: "Wayanad",
    image: wayanadImage,
    tag: "Wild Highlands",
    description:
      "Forest trails, waterfalls, caves, coffee estates, and deep Western Ghats scenery.",
  },
  {
    id: "kovalam",
    name: "Kovalam",
    guideQuery: "Kovalam",
    image: kovalamImage,
    tag: "Lighthouse Bay",
    description:
      "Curved beaches, lighthouse views, seafood stops, and easygoing coastal evenings.",
  },
  {
    id: "thekkady",
    name: "Thekkady",
    guideQuery: "Thekkady",
    image: thekkadyImage,
    tag: "Spice Forest",
    description:
      "Periyar forest edges, spice gardens, boating routes, and wildlife-focused day plans.",
  },
  {
    id: "athirappilly",
    name: "Athirappilly",
    guideQuery: "Athirappilly",
    image: athirappillyImage,
    tag: "Waterfall Run",
    description:
      "Rainforest roads, roaring falls, river viewpoints, and lush day trips from central Kerala.",
  },
];

const trustItems = [
  {
    title: "Verified Local Guides",
    description: "Profiles are reviewed before travelers connect.",
    icon: ShieldCheck,
  },
  {
    title: "Direct WhatsApp Contact",
    description: "Plan details, availability, and budget directly.",
    icon: MessageCircle,
  },
  {
    title: "Local Experiences Only",
    description: "Kerala itineraries shaped by people who know the place.",
    icon: MapPinned,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const sectionViewport = { once: true, amount: 0.18 };
const pageGutter = "px-4 sm:px-6 lg:px-8";
const sectionClass = `${pageGutter} py-16 sm:py-20 lg:py-24`;
const containerClass = "mx-auto max-w-6xl";
const eyebrowClass =
  "mb-3 inline-flex rounded-full border border-[#22c55e]/25 bg-[#22c55e]/10 px-3 py-1 text-xs font-bold uppercase text-[#86efac]";
const elevatedCardClass =
  "border border-white/[0.08] bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(15,23,42,0.82))] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_22px_60px_rgba(2,6,23,0.42)]";

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const getGuideCount = (destination) => {
  const name = destination.name.toLowerCase();
  const query = destination.guideQuery.toLowerCase();

  return guides.filter((guide) => {
    const location = guide.location.toLowerCase();
    return (
      location.includes(query) ||
      query.includes(location) ||
      name.includes(location)
    );
  }).length;
};

const openHirevoyWhatsApp = () => {
  const message =
    "Hi! I found Hirevoy and want to explore Kerala with a trusted local guide.";

  if (window.gtag) {
    window.gtag("event", "whatsapp_click", { source: "homepage" });
  }

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
};

const openGuideWhatsApp = (guide) => {
  const payload = {
    guideId: guide.id,
    guideName: guide.name,
    location: guide.location,
    ts: Date.now(),
  };

  localStorage.setItem("lastLead", JSON.stringify(payload));

  if (window.gtag) {
    window.gtag("event", "whatsapp_click", { guide: guide.name });
  }

  const message = `Hi! I found Hirevoy.

I'm interested in booking a local guide.

Location: ${guide.location}
Guide: ${guide.name}
Budget: Rs.${guide.price}

Can you share details and availability?`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
};

const PrimaryButton = ({
  children,
  className = "",
  icon: Icon = ArrowRight,
  to,
  variant = "solid",
  ...props
}) => {
  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22c55e]";
  const variants = {
    solid:
      "bg-[#22c55e] text-[#020617] shadow-[0_10px_26px_rgba(34,197,94,0.22)] hover:bg-[#4ade80] hover:-translate-y-0.5",
    glass:
      "border border-white/15 bg-white/[0.07] text-[#f8fafc] backdrop-blur-md hover:border-[#22c55e]/45 hover:bg-white/[0.11] hover:-translate-y-0.5",
  };
  const buttonClass = `${baseClass} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );

  if (to) {
    return (
      <Link className={buttonClass} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClass} type="button" {...props}>
      {content}
    </button>
  );
};

const SectionHeading = ({ eyebrow, title, children, align = "center" }) => (
  <Motion.div
    className={`mb-9 max-w-3xl sm:mb-12 ${
      align === "left" ? "mr-auto text-left" : "mx-auto text-center"
    }`}
    initial="hidden"
    variants={fadeUp}
    viewport={sectionViewport}
    whileInView="visible"
  >
    <span className={eyebrowClass}>{eyebrow}</span>
    <h2 className="text-[2rem] font-extrabold leading-[1.08] text-[#f8fafc] sm:text-4xl lg:text-[3rem]">
      {title}
    </h2>
    {children ? (
      <p
        className={`mt-4 max-w-2xl text-base leading-7 text-[#cbd5e1] ${
          align === "left" ? "" : "mx-auto"
        }`}
      >
        {children}
      </p>
    ) : null}
  </Motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeAndScroll = (id) => {
    setIsOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-white/[0.09] bg-[#020617]/72 px-3 py-2 shadow-[0_12px_42px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:gap-4 sm:px-5">
        <Link
          aria-label="Hirevoy home"
          className="flex min-w-0 items-center gap-2"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#22c55e] text-sm font-extrabold text-[#020617] sm:h-10 sm:w-10">
            H
          </span>
          <span className="truncate text-lg font-extrabold text-[#f8fafc] sm:text-xl">
            Hirevoy
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-[#cbd5e1] md:flex">
          <button
            className="transition hover:text-[#22c55e]"
            onClick={() => scrollToId("destinations")}
            type="button"
          >
            Destinations
          </button>
          <Link className="transition hover:text-[#22c55e]" to="/guides">
            Guides
          </Link>
          <button
            className="transition hover:text-[#22c55e]"
            onClick={() => scrollToId("experience")}
            type="button"
          >
            Experience
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <PrimaryButton
            className="min-h-10 px-3 py-2 text-xs sm:px-4 sm:text-sm"
            icon={Compass}
            onClick={() => closeAndScroll("destinations")}
          >
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start Exploring</span>
          </PrimaryButton>
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[#f8fafc] transition hover:border-[#22c55e]/40 hover:bg-white/[0.1] md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <Motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-[#020617]/88 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:hidden"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <button
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#cbd5e1] transition hover:bg-white/[0.06] hover:text-[#f8fafc]"
              onClick={() => closeAndScroll("destinations")}
              type="button"
            >
              Destinations
            </button>
            <Link
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#cbd5e1] transition hover:bg-white/[0.06] hover:text-[#f8fafc]"
              onClick={() => setIsOpen(false)}
              to="/guides"
            >
              Guides
            </Link>
            <button
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#cbd5e1] transition hover:bg-white/[0.06] hover:text-[#f8fafc]"
              onClick={() => closeAndScroll("experience")}
              type="button"
            >
              Experience
            </button>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section
      className={`relative isolate flex min-h-[92svh] items-center overflow-hidden ${pageGutter} pb-16 pt-28 sm:min-h-[94svh] sm:pb-20`}
    >
      <img
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
        decoding="async"
        fetchPriority="high"
        loading="eager"
        src={munnarImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.58)_48%,#020617_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(34,197,94,0.13),transparent_58%)]" />

      <Motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial="hidden"
        variants={stagger}
        animate="visible"
      >
        <Motion.div
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase text-[#d9f99d] backdrop-blur-md sm:text-sm"
          variants={fadeUp}
        >
          <Mountain aria-hidden="true" className="h-4 w-4" />
          Kerala local guide platform
        </Motion.div>
        <Motion.h1
          className="mx-auto max-w-4xl text-[clamp(2.85rem,11vw,5.9rem)] font-extrabold leading-[0.96] text-[#f8fafc]"
          variants={fadeUp}
        >
          Explore Kerala Beyond Tourist Traps
        </Motion.h1>
        <Motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#dbe4ef] sm:text-lg sm:leading-8"
          variants={fadeUp}
        >
          Connect with trusted local guides across Kerala for authentic travel
          experiences.
        </Motion.p>
        <Motion.div
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          variants={fadeUp}
        >
          <PrimaryButton className="w-full sm:w-auto" to="/guides">
            Explore Guides
          </PrimaryButton>
          <PrimaryButton
            className="w-full sm:w-auto"
            to="/destinations"
            variant="glass"
          >
            Browse Destinations
          </PrimaryButton>
        </Motion.div>
      </Motion.div>
    </section>
  );
};

const TrustBar = () => (
  <section className={`relative z-10 -mt-8 ${pageGutter}`}>
    <Motion.div
      className={`${containerClass} grid gap-3 rounded-[1.75rem] border border-white/[0.08] bg-[#0f172a]/78 p-3 shadow-[0_18px_56px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:grid-cols-3`}
      initial="hidden"
      variants={stagger}
      viewport={sectionViewport}
      whileInView="visible"
    >
      {trustItems.map((item) => {
        const Icon = item.icon;
        return (
          <Motion.div
            className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"
            key={item.title}
            variants={fadeUp}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#22c55e]/12 text-[#86efac]">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-bold text-[#f8fafc]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#cbd5e1]">
                {item.description}
              </p>
            </div>
          </Motion.div>
        );
      })}
    </Motion.div>
  </section>
);

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();
  const count = getGuideCount(destination);
  const guideLabel =
    count > 0
      ? `${count} ${count === 1 ? "guide" : "guides"} listed`
      : "Guide matching on request";

  return (
    <Motion.article
      className={`group relative h-[430px] overflow-hidden rounded-[1.75rem] ${elevatedCardClass} transition duration-300 hover:-translate-y-1.5 hover:border-[#22c55e]/35 sm:h-[460px]`}
      initial="hidden"
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <img
        alt={`${destination.name}, Kerala`}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
        decoding="async"
        loading="lazy"
        src={destination.image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.35)_38%,rgba(2,6,23,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase text-[#f8fafc] backdrop-blur-md">
            {destination.tag}
          </span>
          <span className="rounded-full bg-[#020617]/72 px-3 py-1 text-[0.7rem] font-semibold text-[#bbf7d0] backdrop-blur-md">
            {guideLabel}
          </span>
        </div>
        <h3 className="text-[1.65rem] font-extrabold leading-tight text-[#f8fafc]">
          {destination.name}
        </h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-[#d8e1ed]">
          {destination.description}
        </p>
        <PrimaryButton
          className="mt-5 w-full"
          onClick={() => navigate(`/guides?location=${destination.guideQuery}`)}
        >
          Explore with a Guide
        </PrimaryButton>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-transparent transition duration-300 group-hover:ring-[#22c55e]/30" />
    </Motion.article>
  );
};

const DestinationsSection = () => (
  <section
    className={`${sectionClass} scroll-mt-28`}
    id="destinations"
  >
    <div className={containerClass}>
      <SectionHeading
        eyebrow="Destinations"
        title="Choose Where Kerala Opens Up"
      >
        Start with the place, then connect with a local guide who can shape the
        day around your pace, budget, and interests.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            destination={destination}
            key={destination.id}
          />
        ))}
      </div>
    </div>
  </section>
);

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();
  const languages = guide.languages?.join(", ") || guide.language;

  return (
    <Motion.article
      className={`group flex min-h-[300px] cursor-pointer flex-col rounded-[1.75rem] p-5 outline-none transition duration-300 hover:-translate-y-1 hover:border-[#22c55e]/35 focus-visible:border-[#22c55e] sm:p-6 ${elevatedCardClass}`}
      initial="hidden"
      onClick={() => {
        if (window.gtag) {
          window.gtag("event", "guide_click", { guide: guide.name });
        }
        navigate(`/guides/${guide.id}`);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate(`/guides/${guide.id}`);
        }
      }}
      role="button"
      tabIndex={0}
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[1.35rem] font-extrabold leading-tight text-[#f8fafc]">
            {guide.name}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#cbd5e1]">
            <MapPin aria-hidden="true" className="h-4 w-4 text-[#22c55e]" />
            {guide.location}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/10 px-2.5 py-1 text-[0.72rem] font-bold text-[#86efac]">
          <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
          Verified
        </span>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm text-[#cbd5e1]">
        <div className="flex items-start gap-3">
          <Languages
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
          />
          <span>{languages}</span>
        </div>
        <div className="h-px bg-white/[0.07]" />
        <div className="flex items-center gap-3">
          <WalletCards
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[#22c55e]"
          />
          <span>Rs.{guide.price}/day</span>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-[#86efac]">
        Verified Local Guide
      </p>

      <PrimaryButton
        className="mt-auto w-full"
        icon={MessageCircle}
        onClick={(event) => {
          event.stopPropagation();
          openGuideWhatsApp(guide);
        }}
      >
        Chat with Guide
      </PrimaryButton>
    </Motion.article>
  );
};

const FeaturedGuides = () => (
  <section className={`${sectionClass} bg-[linear-gradient(180deg,#020617_0%,#06101f_44%,#020617_100%)]`}>
    <div className={containerClass}>
      <SectionHeading eyebrow="Featured Guides" title="Meet Local Experts">
        Browse trusted Kerala guides by location, language, and daily price.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {guides.slice(0, 3).map((guide) => (
          <GuideCard guide={guide} key={guide.id} />
        ))}
      </div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section
    className={`${sectionClass} scroll-mt-28 overflow-hidden`}
    id="experience"
  >
    <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}>
      <Motion.div
        className="grid h-[430px] grid-cols-6 grid-rows-6 gap-3 sm:h-[540px] lg:h-[620px]"
        initial="hidden"
        variants={fadeUp}
        viewport={sectionViewport}
        whileInView="visible"
      >
        <img
          alt="A Kerala backwater route"
          className="col-span-4 row-span-4 h-full w-full rounded-[1.5rem] border border-white/[0.08] object-cover shadow-[0_18px_50px_rgba(2,6,23,0.42)]"
          decoding="async"
          loading="lazy"
          src={alleppeyImage}
        />
        <img
          alt="Fort Kochi heritage streets"
          className="col-span-2 row-span-2 h-full w-full rounded-[1.5rem] border border-white/[0.08] object-cover shadow-[0_18px_50px_rgba(2,6,23,0.32)]"
          decoding="async"
          loading="lazy"
          src={fortKochiImage}
        />
        <img
          alt="Varkala cliff coast"
          className="col-span-2 row-span-2 h-full w-full rounded-[1.5rem] border border-white/[0.08] object-cover shadow-[0_18px_50px_rgba(2,6,23,0.32)]"
          decoding="async"
          loading="lazy"
          src={varkalaImage}
        />
        <div
          className={`col-span-3 row-span-2 flex flex-col justify-end rounded-[1.5rem] p-4 sm:p-5 ${elevatedCardClass}`}
        >
          <span className="text-xs font-bold uppercase text-[#86efac] sm:text-sm">
            Local-first
          </span>
          <p className="mt-2 text-base font-bold leading-6 text-[#f8fafc] sm:text-lg">
            Plans shaped around real Kerala, not fixed tourist scripts.
          </p>
        </div>
        <img
          alt="Munnar tea hills"
          className="col-span-3 row-span-2 h-full w-full rounded-[1.5rem] border border-white/[0.08] object-cover shadow-[0_18px_50px_rgba(2,6,23,0.32)]"
          decoding="async"
          loading="lazy"
          src={munnarImage}
        />
      </Motion.div>

      <SectionHeading
        align="left"
        eyebrow="Experience"
        title="Travel Kerala Like a Local"
      >
        Hirevoy helps travelers move from a destination list to an actual local
        plan. Browse Kerala places, compare trusted guides, and start the
        conversation directly on WhatsApp.
      </SectionHeading>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className={`relative overflow-hidden border-y border-white/[0.08] bg-[#0f172a] ${pageGutter} py-16 sm:py-20 lg:py-24`}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15),transparent_64%)]" />
    <Motion.div
      className="relative mx-auto max-w-4xl text-center"
      initial="hidden"
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <span className={eyebrowClass}>Start the trip</span>
      <h2 className="mx-auto mt-5 max-w-3xl text-[2.2rem] font-extrabold leading-[1.05] text-[#f8fafc] sm:text-5xl">
        Ready to Explore Kerala?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#cbd5e1]">
        Pick a guide, choose a destination, and plan with someone who knows the
        route beyond the obvious stops.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <PrimaryButton className="w-full sm:w-auto" to="/guides">
          Find a Guide
        </PrimaryButton>
        <PrimaryButton
          className="w-full sm:w-auto"
          to="/destinations"
          variant="glass"
        >
          Browse Destinations
        </PrimaryButton>
      </div>
    </Motion.div>
  </section>
);

const Footer = () => (
  <footer className={`border-t border-white/10 bg-[#020617] ${pageGutter} py-10`}>
    <div className={`${containerClass} grid gap-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md md:grid-cols-[1.2fr_1fr_1fr]`}>
      <div>
        <Link className="inline-flex items-center gap-2" to="/">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#22c55e] text-sm font-extrabold text-[#020617]">
            H
          </span>
          <span className="text-xl font-extrabold text-[#f8fafc]">
            Hirevoy
          </span>
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#cbd5e1]">
          Premium Kerala guide discovery with direct local connections.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-[#f8fafc]">Explore</h3>
        <div className="mt-4 grid gap-3 text-sm text-[#cbd5e1]">
          <Link className="transition hover:text-[#22c55e]" to="/guides">
            Guides
          </Link>
          <Link className="transition hover:text-[#22c55e]" to="/destinations">
            Destinations
          </Link>
          <button
            className="text-left transition hover:text-[#22c55e]"
            onClick={() => scrollToId("experience")}
            type="button"
          >
            Experience
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[#f8fafc]">Contact</h3>
        <p className="mt-4 flex items-center gap-2 text-sm text-[#cbd5e1]">
          <MapPin aria-hidden="true" className="h-4 w-4 text-[#22c55e]" />
          Kerala, India
        </p>
        <PrimaryButton
          className="mt-5 w-full sm:w-auto"
          icon={PhoneCall}
          onClick={openHirevoyWhatsApp}
        >
          WhatsApp Contact
        </PrimaryButton>
      </div>

      <p className="border-t border-white/10 pt-5 text-sm text-[#94a3b8] md:col-span-3">
        Copyright 2026 Hirevoy. Explore Kerala with trusted local guides.
      </p>
    </div>
  </footer>
);

const WhatsAppFab = () => (
  <button
    aria-label="Chat with Hirevoy on WhatsApp"
    className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#22c55e] text-[#020617] shadow-[0_14px_34px_rgba(34,197,94,0.32)] transition hover:-translate-y-0.5 hover:bg-[#4ade80] sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    onClick={openHirevoyWhatsApp}
    type="button"
  >
    <MessageCircle aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
  </button>
);

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.08),transparent_34%),#020617] text-[#f8fafc]">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <DestinationsSection />
        <FeaturedGuides />
        <ExperienceSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Home;
