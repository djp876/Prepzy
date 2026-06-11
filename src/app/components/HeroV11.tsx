"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Navigation, Menu } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";

const ROT_WORDS = ["Personalized", "Adaptive", "Smart", "Interactive", "Daily"] as const;

const STATS: ReadonlyArray<{ to: number; suffix: string; label: string }> = [
  { to: 90, suffix: "+", label: "Textbooks" },
  { to: 300, suffix: "+", label: "Videos" },
  { to: 2, suffix: "L+", label: "Questions" },
  { to: 1000, suffix: "+", label: "Hours Content" },
];

const FEATURES: ReadonlyArray<string> = [
  "Quality Learning",
  "Indian Price",
  "15-Day Money-Back",
  "Chapter-wise Quizzes & Mock Tests",
  "Smart Doubt-Solving 24/7",
];

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const onChange = () => setReduce(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

function RotatingWord({ words, color }: { words: ReadonlyArray<string>; color: string }) {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);
  return <span key={i} className="pz-word" style={{ color }}>{words[i]}</span>;
}

function CountUp({ to, suffix, reduce }: { to: number; suffix: string; reduce: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (reduce) { setVal(to); return; }
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1200);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);
  return <>{val.toLocaleString("en-IN")}{suffix}</>;
}

function Nav() {
  const links = ["Home", "About Us", "Courses", "Pricing", "Resources", "Contact"];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: "16px 16px 0" }}>
      <nav className="mx-auto flex w-full items-center justify-between" style={{ position: "relative", maxWidth: 1160, background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 22px", boxShadow: "0 14px 34px -18px rgba(36,29,82,0.3)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 30, width: "auto", display: "block" }} />
        <ul className="hidden items-center lg:flex" style={{ gap: 26, listStyle: "none", margin: 0, padding: 0, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {links.map((l, i) => (
            <li key={l}><a href="#" style={{ fontSize: 14.5, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? PURPLE : INK, textDecoration: "none" }}>{l}</a></li>
          ))}
        </ul>
        <a href="#" style={{ background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "11px 24px", fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}>Login</a>
        <button aria-label="Open menu" className="inline-flex items-center justify-center lg:hidden" style={{ width: 42, height: 42, borderRadius: "var(--pz-radius-pill)", background: LAV, border: "none", color: PURPLE, cursor: "pointer", marginLeft: 8 }}><Menu size={20} /></button>
      </nav>
    </header>
  );
}

/** Build an SVG path for a rotated ellipse (used by both the ring stroke and the planet offset-path). */
function ellipsePath(cx: number, cy: number, rx: number, ry: number, deg: number): string {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const p1x = (cx + rx * c).toFixed(2);
  const p1y = (cy + rx * s).toFixed(2);
  const p2x = (cx - rx * c).toFixed(2);
  const p2y = (cy - rx * s).toFixed(2);
  return `M ${p1x} ${p1y} A ${rx} ${ry} ${deg} 0 1 ${p2x} ${p2y} A ${rx} ${ry} ${deg} 0 1 ${p1x} ${p1y} Z`;
}

interface Ring { rx: number; ry: number; deg: number; op: number }
interface Planet { ring: number; size: number; color: string; dur: number; start: number; reverse?: boolean; glow: string }

/** Animated orbital emblem. Rings are SVG; planets ride the exact same paths via CSS offset-path. */
function OrbitEmblem() {
  const W = 280;
  const H = 158;
  const cx = 140;
  const cy = 80;
  const rings: ReadonlyArray<Ring> = [
    { rx: 120, ry: 52, deg: 13, op: 0.5 },
    { rx: 88, ry: 40, deg: -32, op: 0.4 },
    { rx: 58, ry: 26, deg: 58, op: 0.32 },
  ];
  const paths = rings.map((r) => ellipsePath(cx, cy, r.rx, r.ry, r.deg));
  const planets: ReadonlyArray<Planet> = [
    { ring: 0, size: 9, color: "#ffffff", dur: 15, start: 0, glow: "rgba(255,255,255,0.7)" },
    { ring: 1, size: 7, color: "#cdc4f5", dur: 10, start: 35, reverse: true, glow: "rgba(205,196,245,0.8)" },
    { ring: 2, size: 6, color: AMBER, dur: 17, start: 60, glow: "rgba(255,184,77,0.9)" },
  ];
  return (
    <div className="pz-emblem" aria-hidden style={{ position: "absolute", inset: 0, width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {rings.map((r, i) => (
          <path key={i} d={paths[i]} fill="none" stroke="#ffffff" strokeOpacity={r.op} strokeWidth={1.3} />
        ))}
        <circle cx={238} cy={30} r={9} fill={AMBER} opacity={0.4} style={{ filter: "blur(7px)" }} />
        <circle cx={238} cy={30} r={7.5} fill={AMBER} />
        <circle cx={238} cy={30} r={3} fill="#fff" opacity={0.55} />
      </svg>
      {planets.map((p, i) => (
        <span
          key={i}
          className="pz-planet"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 9px ${p.glow}`,
            offsetPath: `path('${paths[p.ring]}')`,
            animationDuration: `${p.dur}s`,
            animationDelay: `-${((p.start / 100) * p.dur).toFixed(2)}s`,
            animationDirection: p.reverse ? "reverse" : "normal",
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function ExamPills() {
  return (
    <div style={{ position: "absolute", top: 4, right: 0, display: "flex", gap: 9, zIndex: 3 }}>
      <span style={{ display: "inline-block", border: `1.5px solid ${AMBER}`, color: AMBER, borderRadius: "var(--pz-radius-pill)", padding: "6px 15px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>6&ndash;12 CBSE</span>
      <span style={{ display: "inline-block", background: AMBER, color: "#2a2150", borderRadius: "var(--pz-radius-pill)", padding: "6px 15px", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>NEET-UG</span>
    </div>
  );
}

export function HeroV11() {
  const reduce = usePrefersReducedMotion();
  return (
    <div style={{ position: "relative", background: "linear-gradient(180deg, #fff6ea 0%, #ffeccf 100%)" }}>
      {/* faint margin rails (mockup detail) */}
      <span aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: 18, width: 1, background: "rgba(255,138,76,0.35)" }} />
      <span aria-hidden style={{ position: "absolute", top: 0, bottom: 0, right: 18, width: 1, background: "rgba(255,138,76,0.35)" }} />

      <Nav />

      <section style={{ position: "relative", overflowX: "clip", padding: "clamp(18px, 3vw, 36px) 28px clamp(40px, 5vw, 64px)" }}>
        <div className="pz-v11-grid">
          {/* LEFT: purple panel + lavender stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div className="pz-pop" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #463c9b 0%, #322978 60%, #2c2569 100%)", borderRadius: 30, padding: "clamp(26px, 3.2vw, 44px)", color: "#fff", flex: 1 }}>
              {/* top row: tagline + orbit emblem with exam pills */}
              <div style={{ position: "relative", minHeight: 92 }}>
                <span style={{ display: "block", fontSize: 14.5, fontWeight: 600, color: "rgba(255,255,255,0.9)", maxWidth: 300 }}>
                  Watch Less. Practice More. Score Higher.
                </span>
                <div className="pz-v11-emblem" style={{ position: "absolute", top: -6, right: -8, width: 280, height: 158 }}>
                  <OrbitEmblem />
                  <ExamPills />
                </div>
              </div>

              <h1 style={{ position: "relative", fontSize: "clamp(34px, 4.3vw, 54px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "10px 0 0", maxWidth: "78%" }}>
                Your <RotatingWord words={ROT_WORDS} color={AMBER} />
                <br />
                Learning Companion.
              </h1>

              <p style={{ fontSize: "clamp(13.5px, 1.35vw, 15.5px)", lineHeight: 1.7, color: "rgba(255,255,255,0.82)", margin: "18px 0 0", maxWidth: 520 }}>
                {FEATURES.map((f, i) => (
                  <span key={f} style={{ whiteSpace: "nowrap" }}>
                    {i > 0 && <span style={{ color: AMBER, margin: "0 9px" }}>&bull;</span>}
                    {f}
                  </span>
                ))}
              </p>

              <div className="flex items-center" style={{ gap: 12, marginTop: "clamp(24px, 3vw, 34px)" }}>
                <a href="#experience" className="pz-exp" style={{ display: "inline-flex", alignItems: "center", background: "#fff", color: PURPLE, borderRadius: "var(--pz-radius-pill)", padding: "14px 26px", fontWeight: 700, fontSize: 15.5, textDecoration: "none", boxShadow: "0 16px 30px -16px rgba(0,0,0,0.5)" }}>
                  Experience Prepzy now
                </a>
                <a href="#experience" aria-label="Experience Prepzy" className="pz-compass" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: "50%", background: "#fff", textDecoration: "none", boxShadow: "0 16px 30px -16px rgba(0,0,0,0.5)" }}>
                  <Navigation size={20} fill={AMBER} color={PURPLE} strokeWidth={1.6} style={{ transform: "rotate(8deg)" }} />
                </a>
              </div>
            </div>

            {/* lavender stats */}
            <div className="pz-pop pz-v11-stats" style={{ background: "#e7e3fb", borderRadius: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "clamp(18px, 2vw, 26px) clamp(14px, 2vw, 26px)" }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: "0 6px" }}>
                  <div style={{ fontSize: "clamp(24px, 2.7vw, 34px)", fontWeight: 800, color: PURPLE, lineHeight: 1 }}>
                    <CountUp to={s.to} suffix={s.suffix} reduce={reduce} />
                  </div>
                  <div style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "#6b6391", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: real student + dashboard photo */}
          <div className="pz-pop pz-v11-photo" style={{ borderRadius: 30, overflow: "hidden", background: "#f3eee6", boxShadow: "0 40px 80px -50px rgba(36,29,82,0.55)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-student.jpg" alt="A student learning on Prepzy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
