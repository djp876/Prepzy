"use client";

/**
 * HomeV14 — "Warm Editorial × Kinetic", the GSAP cut.
 *
 * A fresh, premium take on the locked v6 direction (warm cream / indigo / amber,
 * glassy pill nav, scroll-enlarge video, no "AI" copy, Atlas + persona tutors),
 * rebuilt with a Fraunces display + Poppins UI type pairing and a real GSAP
 * interaction layer:
 *   1 masked-line hero entrance (CSS-on-mount, bulletproof) + GSAP rotating word
 *   2 magnetic + label-slide primary CTA              3 dual living marquee
 *   4 GSAP ScrollTrigger scroll-enlarge video         5 count-up stats (Indian grouping)
 *   6 directional staggered reveals (ScrollTrigger.batch)
 *   7 pinned "Snap & Solve" feature scrub (desktop)   8 NEW "For parents" section
 *   9 auto-drifting / draggable / swipeable testimonials
 *
 * Single GSAP authority via gsap.matchMedia: desktop-maximal, mobile-fast,
 * full prefers-reduced-motion branch. GSAP is lazy-imported (never in the hero
 * critical path); the hero paints at frame 0 then animates. Native scroll only.
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUpRight,
  Play,
  Star,
  ChevronDown,
  Menu,
  LineChart,
  ShieldCheck,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import { ExperiencePrepzy } from "./ExperiencePrepzy";
import { CourseSelector } from "./CourseSelector";

/* ---------------- tokens (mirror tokens.css for inline use) ---------------- */
const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const AMBER_INK = "#d97706"; // display-size only
const AMBER_SM = "#b45309"; // AA-safe amber text < 24px
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const LAV1 = "#e7e3fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const DISPLAY = "var(--pz-font-display)";

const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"] as const;

// Real hosted demo clip (placeholder — swap for a real Prepzy screen-recording).
const VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4";

function ph(base: string, w: number, h?: number, faces?: boolean): string {
  return `${base}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}${faces ? "&crop=faces" : ""}`;
}
const POSTER = "https://images.unsplash.com/photo-1516534775068-ba3e7458af70";
const FACES = [
  "https://images.unsplash.com/photo-1633700199686-bd546d6abb65",
  "https://images.unsplash.com/photo-1684531764645-df295a321850",
  "https://images.unsplash.com/photo-1654650231825-f1c06db0c1ba",
  "https://images.unsplash.com/photo-1599418174475-a8b8141a5750",
  "https://images.unsplash.com/photo-1610021685934-882b5166986d",
];

const SR: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

/* ---------------- helpers ---------------- */
function indianGroup(n: number): string {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
}

/* ---------------- shared bits ---------------- */
function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="pz14-eyebrow">{children}</span>;
}

interface CTAProps {
  href: string;
  label: string;
  tone?: "purple" | "amber";
  big?: boolean;
  magnetic?: boolean;
}
function PrimaryCTA({ href, label, tone = "purple", big = false, magnetic = false }: CTAProps) {
  const amber = tone === "amber";
  const cls = [
    "pz14-cta",
    amber ? "pz14-cta--amber" : "",
    big ? "pz14-cta--big" : "",
    magnetic ? "pz14-magnetic" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <a href={href} className={cls}>
      <span className="pz14-roll" aria-hidden="true">
        <span className="pz14-roll-track">
          <span style={{ display: "block" }}>{label}</span>
          <span className="pz14-roll-b">{label}</span>
        </span>
      </span>
      <span style={SR}>{label}</span>
      <span
        className="pz14-cta-ico"
        style={{ width: big ? 32 : 30, height: big ? 32 : 30, background: amber ? INK : "rgba(255,255,255,0.22)" }}
      >
        <ArrowUpRight size={16} color={amber ? AMBER : "#fff"} />
      </span>
    </a>
  );
}

/* ---------------- nav ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links: Array<[string, string]> = [
    ["Learn", "#showcase"],
    ["Courses", "#courses"],
    ["For parents", "#parents"],
    ["About", "#about"],
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", padding: "16px 16px 0" }}>
      <nav className={`pz14-nav${scrolled ? " scrolled" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 32, width: "auto", display: "block" }} />
        <ul className="pz14-navlinks">
          {links.map(([l, href]) => (
            <li key={l}>
              <a href={href} className="pz14-navlink">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href="#"
            className="pz14-navlink"
            style={{ padding: "10px 4px" }}
          >
            Log in
          </a>
          <PrimaryCTA href="#" label="Get started" magnetic />
          <button
            aria-label="Open menu"
            className="pz14-menu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              borderRadius: "var(--pz-radius-pill)",
              background: LAV,
              border: "none",
              color: PURPLE,
              cursor: "pointer",
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- hero ---------------- */
function Hero() {
  return (
    <section className="pz14-hero">
      <div className="pz14-bg" aria-hidden="true">
        <div className="pz14-bg-move">
          <span className="pz14-blob pz14-blob-1" />
          <span className="pz14-blob pz14-blob-2" />
          <span className="pz14-blob pz14-blob-3" />
          <span className="pz14-blob pz14-blob-4" />
        </div>
        <div className="pz14-grain" />
      </div>

      <div className="pz14-hero-inner">
        <span
          className="pz14-rise"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "#fff",
            border: "1px solid var(--pz-line)",
            borderRadius: "var(--pz-radius-pill)",
            padding: "7px 14px",
            fontSize: 13,
            fontWeight: 600,
            color: PURPLE,
            boxShadow: "var(--pz-shadow-ink-sm)",
            animationDelay: "0.05s",
          }}
        >
          <span style={{ display: "inline-flex", gap: 2 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={13} fill={AMBER} color={AMBER} />
            ))}
          </span>
          Loved by 2,00,000+ learners
        </span>

        <h1 className="pz14-hl" aria-label="Your Personalized Learning Companion.">
          <span className="pz14-hl-mask">
            <span className="pz14-hl-line">
              Your{" "}
              <span className="pz14-rotw-wrap" aria-hidden="true" style={{ lineHeight: 1 }}>
                {ROT_WORDS.map((w) => (
                  <span key={w} className="pz14-rotw">
                    {w}
                  </span>
                ))}
                <span className="pz14-rotw-size">Personalized</span>
              </span>
            </span>
          </span>
          <span className="pz14-hl-mask">
            <span className="pz14-hl-line l2">Learning Companion.</span>
          </span>
        </h1>

        <p
          className="pz14-rise"
          style={{
            fontSize: "clamp(16px, 1.8vw, 19px)",
            color: MUTED,
            lineHeight: 1.55,
            margin: "20px auto 0",
            maxWidth: 540,
            animationDelay: "0.45s",
          }}
        >
          Video lessons, 24×7 doubt-solving and practice that actually sticks — a patient study
          companion for CBSE Classes 6–12 and NEET-UG, at an Indian price.
        </p>

        <div
          className="pz14-rise"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 30, flexWrap: "wrap", animationDelay: "0.6s" }}
        >
          <PrimaryCTA href="#" label="Get started free" big magnetic />
          <a
            href="#showcase"
            className="pz14-cta pz14-cta--ghost pz14-cta--big"
            style={{ paddingLeft: 14 }}
          >
            <span
              className="pz14-cta-ico"
              style={{ width: 32, height: 32, background: LAV }}
            >
              <Play size={14} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} />
            </span>
            Watch the demo
          </a>
        </div>

        <div
          className="pz14-rise"
          style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 26, animationDelay: "0.78s" }}
        >
          <span className="pz14-avatars">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {FACES.slice(0, 4).map((f) => (
              <img key={f} src={ph(f, 80, 80, true)} alt="Prepzy learner" />
            ))}
          </span>
          <span style={{ fontSize: 13.5, color: MUTED }}>
            Joined by students across <strong style={{ color: INK }}>India</strong>
          </span>
        </div>

        <a href="#showcase" className="pz14-rise pz14-scrollcue" style={{ animationDelay: "0.95s" }}>
          Scroll to explore
          <ChevronDown size={15} />
        </a>
      </div>
    </section>
  );
}

/* ---------------- dual living marquee ---------------- */
function Marquee() {
  const items = [
    "90+ textbooks",
    "3,000+ video lessons",
    "2L+ practice questions",
    "1,000+ hours",
    "Chapter-by-chapter",
    "Previous-year papers",
    "Mock exams",
    "Doubt-solving 24×7",
  ];
  const row = [...items, ...items];
  const cell = (t: string, i: number) => (
    <span key={i} className="pz14-marq-cell">
      {t}
      <i />
    </span>
  );
  return (
    <div className="pz14-marq-band">
      <div className="pz14-marq-mask">
        <div className="pz14-marq">{row.map(cell)}</div>
        <div className="pz14-marq pz14-marq-rev">{row.map(cell)}</div>
      </div>
    </div>
  );
}

/* ---------------- scroll-enlarge video ---------------- */
function ScrollVideo({ reduce }: { reduce: boolean }) {
  const vref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vref.current;
    if (!v || reduce) return;
    const tryPlay = () => v.play().catch(() => {});
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && tryPlay()),
      { threshold: 0.2 }
    );
    io.observe(v);
    tryPlay();
    return () => io.disconnect();
  }, [reduce]);
  return (
    <div id="showcase" className="pz14-sv-track">
      <section className="pz14-sv-sticky">
        <div className="pz14-sv-head" style={{ textAlign: "center", padding: "0 20px", marginBottom: "clamp(22px,3vw,38px)" }}>
          <Eyebrow>Experience Prepzy</Eyebrow>
          <h2 className="pz14-h2">Press play on better grades.</h2>
          <p style={{ fontSize: "clamp(15px,1.5vw,16.5px)", color: MUTED, margin: "12px auto 0", maxWidth: 460, lineHeight: 1.55 }}>
            Watch a real lesson unfold. Scroll to step inside.
          </p>
        </div>
        <div className="pz14-sv-card">
          <video
            ref={vref}
            src={VIDEO}
            poster={ph(POSTER, 1280, 720)}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="auto"
          />
          <span
            className="pz14-sv-label"
            style={{
              position: "absolute",
              left: 16,
              bottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(13,8,36,0.6)",
              color: "#fff",
              borderRadius: "var(--pz-radius-pill)",
              padding: "6px 13px",
              fontSize: 12,
              fontWeight: 600,
              backdropFilter: "blur(4px)",
            }}
          >
            <Play size={12} fill="#fff" color="#fff" /> Prepzy in 30 seconds
          </span>
        </div>
      </section>
    </div>
  );
}

/* ---------------- stats (count-up) ---------------- */
function StatBand() {
  const stats: Array<{ value: number; suffix: string; label: string }> = [
    { value: 90, suffix: "+", label: "textbooks" },
    { value: 3000, suffix: "+", label: "video lessons" },
    { value: 200000, suffix: "+", label: "practice questions" },
    { value: 1000, suffix: "+", label: "hours of learning" },
  ];
  return (
    <section style={{ background: CREAM, padding: "clamp(48px,7vw,92px) 16px" }}>
      <div className="pz14-stats pz14-rv" data-rv="up">
        {stats.map((s) => (
          <div className="pz14-stat" key={s.label}>
            <div className="pz14-stat-num" data-count={s.value} data-suffix={s.suffix}>
              {indianGroup(s.value)}
              {s.suffix}
            </div>
            <div className="pz14-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- pinned feature set-piece ---------------- */
interface Frame {
  kicker: string;
  title: string;
  body: string;
  chip: string;
  tone: string;
}
const FRAMES: Frame[] = [
  {
    kicker: "Snap & Solve",
    title: "Snap a doubt.",
    body: "Photograph any handwritten or printed problem — Atlas reads even messy handwriting.",
    chip: "📷 Question captured",
    tone: "linear-gradient(160deg,#ece9fb,#dcd8f6)",
  },
  {
    kicker: "Step by step",
    title: "See every step.",
    body: "No final-answer dumps. Atlas walks the working, the way a patient senior would.",
    chip: "✏️ Step 2 of 4",
    tone: "linear-gradient(160deg,#fff1da,#ffe2b8)",
  },
  {
    kicker: "NCERT-aligned",
    title: "Land the answer.",
    body: "Tied to the real NCERT method and marking scheme — never random internet answers.",
    chip: "✓ Solved · NCERT pg. 142",
    tone: "linear-gradient(160deg,#d9f3ea,#b9e8d7)",
  },
];
function Phone({ chip, tone }: { chip: string; tone: string }) {
  return (
    <div className="pz14-phone">
      <div className="pz14-phone-screen" style={{ background: tone }}>
        <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 14, padding: "12px 14px", fontSize: 13.5, fontWeight: 600, color: INK }}>
          {chip}
        </div>
      </div>
    </div>
  );
}
function FeatureShowcase() {
  return (
    <section className="pz14-feat" style={{ background: "#fff" }}>
      {/* desktop: pinned scrub */}
      <div className="pz14-feat-pinned">
        <div className="pz14-feat-sticky">
          <div className="pz14-feat-grid">
            <div style={{ position: "relative", minHeight: 260 }}>
              {FRAMES.map((f) => (
                <div data-frame="" key={f.title} className="pz14-frame">
                  <Eyebrow>{f.kicker}</Eyebrow>
                  <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,3.6vw,54px)", fontWeight: 700, letterSpacing: "-0.025em", color: INK, margin: "10px 0 14px", lineHeight: 1.04 }}>
                    {f.title}
                  </h2>
                  <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, maxWidth: 420 }}>{f.body}</p>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", minHeight: 484 }}>
              {FRAMES.map((f) => (
                <div data-phone="" key={f.title} style={{ position: "absolute" }}>
                  <Phone chip={f.chip} tone={f.tone} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* mobile / reduced-motion: stacked cards */}
      <div className="pz14-feat-stack" style={{ padding: "clamp(48px,8vw,90px) 16px" }}>
        <div className="pz14-rv" data-rv="up" style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>How Atlas helps</Eyebrow>
          <h2 className="pz14-h2">From a photo to a solved problem.</h2>
        </div>
        <div style={{ maxWidth: 520, margin: "28px auto 0", display: "flex", flexDirection: "column", gap: 16 }}>
          {FRAMES.map((f) => (
            <div
              key={f.title}
              className="pz14-rv"
              data-rv="up"
              style={{ background: CREAM, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: 22 }}
            >
              <Eyebrow>{f.kicker}</Eyebrow>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: INK, margin: "8px 0 6px" }}>{f.title}</h3>
              <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.55, margin: 0 }}>{f.body}</p>
              <div style={{ marginTop: 14, display: "inline-block", background: f.tone, borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 600, color: INK }}>
                {f.chip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- For parents ---------------- */
function Parents() {
  const points: Array<{ icon: ReactNode; title: string; body: string }> = [
    {
      icon: <LineChart size={20} color={PURPLE} />,
      title: "Progress you can see",
      body: "Simple weekly reports — what your child studied, where they're improving, what needs a nudge.",
    },
    {
      icon: <IndianRupee size={20} color={PURPLE} />,
      title: "One-time, no subscription",
      body: "Pay once for the year at an Indian price. No silent monthly renewals, no surprises.",
    },
    {
      icon: <ShieldCheck size={20} color={PURPLE} />,
      title: "15-day money-back",
      body: "Try every feature risk-free. If it isn't right for your family, get a full refund.",
    },
  ];
  return (
    <section id="parents" style={{ background: CREAM, padding: "clamp(20px,3vw,40px) 16px var(--pz-section-y)" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          background: LAV,
          borderRadius: 44,
          padding: "clamp(34px,5vw,72px)",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "clamp(28px,4vw,56px)",
          alignItems: "center",
        }}
        className="pz14-parents-grid"
      >
        <div className="pz14-rv" data-rv="left">
          <Eyebrow>For parents</Eyebrow>
          <h2 className="pz14-h2" style={{ marginBottom: 8 }}>
            Screen time, finally well spent.
          </h2>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.6, maxWidth: 460, margin: "0 0 24px" }}>
            A companion that does the patient explaining, and keeps you in the loop without the
            nagging. Built for Indian families.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {points.map((p) => (
              <div key={p.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span
                  style={{
                    flex: "none",
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--pz-shadow-ink-sm)",
                  }}
                >
                  {p.icon}
                </span>
                <span>
                  <span style={{ display: "block", fontSize: 16.5, fontWeight: 700, color: INK }}>{p.title}</span>
                  <span style={{ display: "block", fontSize: 14.5, color: MUTED, lineHeight: 1.55, marginTop: 2 }}>{p.body}</span>
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <PrimaryCTA href="#" label="See a sample report" magnetic />
          </div>
        </div>

        {/* parent dashboard mock */}
        <div
          className="pz14-rv pz14-lift"
          data-rv="right"
          style={{
            background: "#fff",
            borderRadius: 26,
            padding: 22,
            boxShadow: "var(--pz-shadow-ink-lg)",
            border: "1px solid var(--pz-line)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph(FACES[0], 88, 88, true)} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
              <span>
                <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: INK }}>Aanya's week</span>
                <span style={{ display: "block", fontSize: 12.5, color: AMBER_SM, fontWeight: 600 }}>Class 9 · on a 6-day streak</span>
              </span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: LAV1, color: PURPLE, borderRadius: 999, padding: "6px 11px", fontSize: 12, fontWeight: 700 }}>
              <Sparkles size={13} /> +18%
            </span>
          </div>
          {[
            { s: "Mathematics", v: 82, c: PURPLE },
            { s: "Science", v: 68, c: AMBER_INK },
            { s: "Social Science", v: 74, c: "#1d9e75" },
          ].map((r) => (
            <div key={r.s} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, fontWeight: 600, color: INK, marginBottom: 6 }}>
                <span>{r.s}</span>
                <span style={{ color: MUTED }}>{r.v}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: LAV1, overflow: "hidden" }}>
                <div style={{ width: `${r.v}%`, height: "100%", borderRadius: 999, background: r.c }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: CREAM, borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: PURPLE, fontFamily: DISPLAY }}>4h 20m</div>
              <div style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>studied this week</div>
            </div>
            <div style={{ flex: 1, background: CREAM, borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: PURPLE, fontFamily: DISPLAY }}>37</div>
              <div style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>doubts cleared</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- testimonials ---------------- */
interface Quote {
  q: string;
  n: string;
  m: string;
  img: string;
}
const QUOTES: Quote[] = [
  { q: "I stopped dreading maths. Ramanujan explains it like a friend.", n: "Aanya", m: "Class 9 · Pune", img: FACES[0] },
  { q: "My son finally studies on his own. The weekly reports keep me in the loop.", n: "Puneet", m: "Parent · Delhi", img: FACES[3] },
  { q: "The doubt-solving is instant. No more waiting for tuition.", n: "Rahul", m: "Class 11 · Hyderabad", img: FACES[2] },
  { q: "Snap a sum, get the steps. It's basically a tutor in my pocket.", n: "Meera", m: "Class 10 · Kochi", img: FACES[1] },
  { q: "NEET prep finally feels organised. The PYQ papers are gold.", n: "Sahil", m: "NEET · Jaipur", img: FACES[4] },
  { q: "Worth every rupee, and one-time. No monthly surprises.", n: "Lata", m: "Parent · Nagpur", img: FACES[0] },
];
function Testimonials() {
  // Track is doubled so the GSAP/rAF auto-drift loops seamlessly.
  const cards = [...QUOTES, ...QUOTES];
  return (
    <section style={{ background: "#fff", padding: "clamp(56px,8vw,110px) 0" }}>
      <div className="pz14-rv" data-rv="up" style={{ maxWidth: 1080, margin: "0 auto 30px", padding: "0 16px", textAlign: "center" }}>
        <Eyebrow>Loved by students &amp; parents</Eyebrow>
        <h2 className="pz14-h2">Real wins, every day.</h2>
        <p style={{ color: MUTED, fontSize: 14.5, marginTop: 10 }}>Drag, swipe or just watch them drift →</p>
      </div>
      <div className="pz14-tcar" aria-label="Student and parent testimonials">
        <div className="pz14-ttrack">
          {cards.map((t, i) => (
            <article key={i} className="pz14-tcard pz14-lift" aria-hidden={i >= QUOTES.length ? "true" : undefined}>
              <span style={{ display: "inline-flex", marginBottom: 12 }}>
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={15} fill={AMBER} color={AMBER} />
                ))}
              </span>
              <p style={{ fontSize: 16, color: INK, lineHeight: 1.55, margin: "0 0 18px", fontWeight: 500, flex: 1 }}>&ldquo;{t.q}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph(t.img, 96, 96, true)} alt={t.n} draggable={false} />
                <span>
                  <span style={{ display: "block", fontSize: 14.5, color: INK, fontWeight: 700 }}>{t.n}</span>
                  <span style={{ fontSize: 12.5, color: MUTED }}>{t.m}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- free band ---------------- */
function FreeBand() {
  return (
    <section style={{ padding: "clamp(40px,6vw,80px) 16px", background: CREAM }}>
      <div className="pz14-band pz14-rv" data-rv="up">
        <span
          aria-hidden="true"
          style={{ position: "absolute", width: 240, height: 240, top: -60, right: -40, borderRadius: "50%", filter: "blur(8px)", background: "rgba(255,184,77,0.22)" }}
        />
        <h2 style={{ position: "relative", fontFamily: DISPLAY, fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
          Start your first month <span style={{ color: AMBER, fontStyle: "italic" }}>free</span>.
        </h2>
        <p style={{ position: "relative", color: "rgba(255,255,255,0.82)", fontSize: 16, margin: "12px auto 0", maxWidth: 460 }}>
          No card needed. Full access to every subject — one-time for the year, no subscription.
        </p>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
          <PrimaryCTA href="#" label="Get started free" tone="amber" big magnetic />
          <a href="#" className="pz14-cta pz14-cta--onpurple">
            Log in
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs: Array<{ q: string; a: string }> = [
    { q: "Is the first month really free?", a: "Yes — full access for a month with no card required, and you can stop any time." },
    { q: "Which classes and exams are covered?", a: "CBSE Classes 6 to 12 across every subject, plus NEET-UG. More exams are on the way." },
    { q: "How does doubt-solving work?", a: "Type or snap a question and Atlas walks you through it step by step, any time of day." },
    { q: "Can parents track progress?", a: "Yes — parents get a simple dashboard with weekly progress and activity." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="about" style={{ background: "#fff", padding: "clamp(56px,8vw,110px) 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="pz14-rv" data-rv="up" style={{ textAlign: "center", marginBottom: 32 }}>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="pz14-h2">Good to know.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="pz14-faq-item">
                <button className="pz14-faq-q" aria-expanded={on} onClick={() => setOpen(on ? null : i)}>
                  {f.q}
                  <ChevronDown size={20} color={PURPLE} />
                </button>
                <div className={`pz14-acc${on ? " open" : ""}`}>
                  <div>
                    <p style={{ margin: 0, padding: "0 20px 18px", color: MUTED, fontSize: 14.5, lineHeight: 1.6, opacity: on ? 1 : 0, transition: "opacity var(--pz-dur) var(--pz-ease-out)" }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */
function Footer() {
  return (
    <footer className="pz14-footer">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Ready to make learning fun?</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PrimaryCTA href="#" label="Get started free" tone="amber" magnetic />
            <a href="#" className="pz14-cta pz14-cta--onpurple">
              Log in
            </a>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24, paddingTop: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 30, filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
            {["Courses", "Pricing", "For parents", "About us", "Contact"].map((l) => (
              <a key={l} href="#" className="pz14-navlink" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
                {l}
              </a>
            ))}
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5, marginTop: 28 }}>
          © {new Date().getFullYear()} Prepzy by GlobusLearn. Made for CBSE &amp; NEET learners.
        </p>
      </div>
    </footer>
  );
}

/* ---------------- reduced-motion flag ---------------- */
function useReduceFlag(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

/* ---------------- GSAP wiring (single authority) ---------------- */
function useGsapLayer(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    let mmRevert: (() => void) | null = null;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !root) return;
      gsap.registerPlugin(ScrollTrigger);

      const qa = <T extends HTMLElement>(sel: string): T[] => Array.from(root.querySelectorAll<T>(sel));
      const one = <T extends HTMLElement>(sel: string): T | null => root.querySelector<T>(sel);
      const mm = gsap.matchMedia();
      mmRevert = () => mm.revert();

      /* ---- all motion-OK contexts (desktop + mobile, not reduced) ---- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.documentElement.classList.add("pz14-js");
        const cleanups: Array<() => void> = [];

        // 6 · directional staggered reveals
        const rvs = qa(".pz14-rv");
        rvs.forEach((el) => {
          const dir = el.dataset.rv;
          const from = dir === "left" ? { x: -32 } : dir === "right" ? { x: 32 } : { y: 26 };
          gsap.set(el, { autoAlpha: 0, ...from });
        });
        const batch = ScrollTrigger.batch(rvs, {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { autoAlpha: 1, x: 0, y: 0, duration: 0.66, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });

        // 1 · rotating headline word
        const words = qa(".pz14-rotw");
        let wordTl: ReturnType<typeof gsap.timeline> | null = null;
        if (words.length > 1) {
          gsap.set(words, { yPercent: 110, autoAlpha: 0 });
          gsap.set(words[0], { yPercent: 0, autoAlpha: 1 });
          wordTl = gsap.timeline({ repeat: -1, defaults: { duration: 0.62, ease: "power3.inOut" } });
          words.forEach((w, i) => {
            const nxt = words[(i + 1) % words.length];
            wordTl!
              .to(w, { yPercent: -110, autoAlpha: 0 }, "+=1.9")
              .fromTo(nxt, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1 }, "<");
          });
        }

        // 5 · count-ups
        qa<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          el.textContent = indianGroup(0) + suffix;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = indianGroup(Math.round(obj.v)) + suffix;
            },
          });
        });

        // 4 · scroll-enlarge video (desktop only — mobile keeps it contained/fast)
        if (window.matchMedia("(min-width: 901px)").matches) {
          const track = one(".pz14-sv-track");
          const card = one(".pz14-sv-card");
          const head = one(".pz14-sv-head");
          const label = one(".pz14-sv-label");
          if (track && card) {
            const cw = Math.min(640, window.innerWidth * 0.9);
            const ch = cw * 0.5625;
            const cover = Math.max(window.innerWidth / cw, window.innerHeight / ch) * 1.32;
            const tl = gsap.timeline({
              scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.6 },
            });
            tl.to(card, { scale: cover, borderRadius: 0, ease: "none" }, 0);
            if (head) tl.to(head, { autoAlpha: 0, y: -24, ease: "none", duration: 0.18 }, 0);
            if (label) tl.to(label, { autoAlpha: 0, ease: "none", duration: 0.3 }, 0.04);
          }
        }

        // hero aurora cursor parallax
        const bgMove = one(".pz14-bg-move");
        if (bgMove && window.matchMedia("(pointer: fine)").matches) {
          let raf = 0;
          let tx = 0;
          let ty = 0;
          let cx = 0;
          let cy = 0;
          const onMove = (e: MouseEvent) => {
            tx = (e.clientX / window.innerWidth - 0.5) * 46;
            ty = (e.clientY / window.innerHeight - 0.5) * 46;
          };
          const tick = () => {
            cx += (tx - cx) * 0.06;
            cy += (ty - cy) * 0.06;
            bgMove.style.setProperty("--mx", `${cx.toFixed(1)}px`);
            bgMove.style.setProperty("--my", `${cy.toFixed(1)}px`);
            raf = requestAnimationFrame(tick);
          };
          window.addEventListener("mousemove", onMove);
          raf = requestAnimationFrame(tick);
          cleanups.push(() => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
          });
        }

        // 9 · testimonials: auto-drift + mouse-drag + native swipe (seamless via doubled track)
        const rail = one(".pz14-tcar");
        if (rail) {
          let raf = 0;
          let paused = false;
          let dragging = false;
          let startX = 0;
          let startScroll = 0;
          const half = () => rail.scrollWidth / 2;
          const tick = () => {
            if (!paused && !dragging) rail.scrollLeft += 0.4;
            if (rail.scrollLeft >= half()) rail.scrollLeft -= half();
            raf = requestAnimationFrame(tick);
          };
          const enter = () => {
            paused = true;
          };
          const leave = () => {
            paused = false;
          };
          const down = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            dragging = true;
            rail.classList.add("dragging");
            startX = e.clientX;
            startScroll = rail.scrollLeft;
          };
          const move = (e: PointerEvent) => {
            if (!dragging) return;
            rail.scrollLeft = startScroll - (e.clientX - startX);
          };
          const up = () => {
            dragging = false;
            rail.classList.remove("dragging");
          };
          rail.addEventListener("pointerenter", enter);
          rail.addEventListener("pointerleave", leave);
          rail.addEventListener("pointerdown", down);
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
          raf = requestAnimationFrame(tick);
          cleanups.push(() => {
            cancelAnimationFrame(raf);
            rail.removeEventListener("pointerenter", enter);
            rail.removeEventListener("pointerleave", leave);
            rail.removeEventListener("pointerdown", down);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
          });
        }

        return () => {
          document.documentElement.classList.remove("pz14-js");
          batch.forEach((b) => b.kill());
          wordTl?.kill();
          cleanups.forEach((fn) => fn());
        };
      });

      /* ---- desktop + motion-OK only: pinned feature scrub ---- */
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const feat = one(".pz14-feat");
        if (!feat) return;
        feat.classList.add("pz14-pinmode");
        const sticky = feat.querySelector<HTMLElement>(".pz14-feat-sticky");
        const frames = Array.from(feat.querySelectorAll<HTMLElement>(".pz14-feat-pinned [data-frame]"));
        const phones = Array.from(feat.querySelectorAll<HTMLElement>(".pz14-feat-pinned [data-phone]"));
        let tl: ReturnType<typeof gsap.timeline> | null = null;
        if (sticky && frames.length) {
          gsap.set([...frames.slice(1), ...phones.slice(1)], { autoAlpha: 0, y: 16 });
          gsap.set([frames[0], phones[0]], { autoAlpha: 1, y: 0 });
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: sticky,
              start: "top top",
              end: `+=${frames.length * 70}%`,
              scrub: 0.5,
              pin: sticky,
              anticipatePin: 1,
            },
          });
          for (let i = 1; i < frames.length; i++) {
            tl.to([frames[i - 1], phones[i - 1]], { autoAlpha: 0, y: -16, duration: 0.4 }, i)
              .fromTo([frames[i], phones[i]], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i);
          }
          tl.to({}, { duration: 0.5 });
        }
        ScrollTrigger.refresh();
        return () => {
          feat.classList.remove("pz14-pinmode");
          tl?.kill();
        };
      });

      /* ---- reduced motion: ensure final states ---- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        qa<HTMLElement>("[data-count]").forEach((el) => {
          el.textContent = indianGroup(Number(el.dataset.count || "0")) + (el.dataset.suffix || "");
        });
      });
    })();

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("pz14-js");
      mmRevert?.();
    };
  }, [rootRef]);
}

/* ---------------- page ---------------- */
export function HomeV14() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReduceFlag();
  useGsapLayer(rootRef);
  return (
    <div className="pz14" ref={rootRef}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ScrollVideo reduce={reduce} />
        <ExperiencePrepzy />
        <div id="courses">
          <CourseSelector />
        </div>
        <StatBand />
        <FeatureShowcase />
        <Parents />
        <Testimonials />
        <FreeBand />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
