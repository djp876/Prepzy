"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Navigation, Menu, ChevronDown } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const PILL_INK = "#2a2150";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

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
      const p = Math.min(1, (t - start) / 1300);
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
    <header className="sticky top-0 z-50 w-full" style={{ padding: "16px 20px 0" }}>
      <nav className="mx-auto flex w-full items-center justify-between" style={{ position: "relative", maxWidth: 1340, background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 22px", boxShadow: "0 14px 34px -18px rgba(36,29,82,0.3)" }}>
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

/** SVG path for a rotated ellipse — shared by the ring stroke and the planet offset-path. */
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

function Pill({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "10px 22px",
        borderRadius: "var(--pz-radius-pill)",
        fontSize: 15,
        fontWeight: 800,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        border: `1.6px solid ${AMBER}`,
        background: active ? AMBER : "rgba(63,53,140,0.35)",
        color: active ? PILL_INK : AMBER,
        boxShadow: active ? "0 10px 26px -8px rgba(255,184,77,0.85)" : "0 0 0 rgba(0,0,0,0)",
        transform: active ? "scale(1.05)" : "scale(1)",
        transition: `background-color 480ms ${EASE}, color 480ms ${EASE}, border-color 480ms ${EASE}, box-shadow 480ms ${EASE}, transform 480ms ${EASE}`,
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      {children}
    </span>
  );
}

/** Interactive orbit: the orange planet revolves through both pills and lights the one it is nearest. */
function OrbitExam({ reduce }: { reduce: boolean }) {
  const W = 460;
  const H = 176;
  const cx = 230;
  const cy = 84;
  const [active, setActive] = useState<"cbse" | "neet">("neet");
  const planetRef = useRef<HTMLSpanElement>(null);

  // rings (all centered) — the orange planet rides ring 0
  const rings: ReadonlyArray<{ rx: number; ry: number; deg: number; op: number; w: number }> = [
    { rx: 170, ry: 48, deg: -11, op: 0.55, w: 1.5 },
    { rx: 146, ry: 60, deg: 18, op: 0.3, w: 1.3 },
    { rx: 180, ry: 50, deg: -24, op: 0.24, w: 1.3 },
    { rx: 112, ry: 38, deg: 6, op: 0.34, w: 1.2 },
  ];
  const paths = rings.map((r) => ellipsePath(cx, cy, r.rx, r.ry, r.deg));

  // orange planet orbit = ring 0
  const RX = rings[0].rx;
  const RY = rings[0].ry;
  const TILT = (rings[0].deg * Math.PI) / 180;

  useEffect(() => {
    if (reduce) { setActive("neet"); return; }
    const el = planetRef.current;
    if (!el) return;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const T = 8600;
    let raf = 0;
    let t0 = 0;
    let last: "cbse" | "neet" | null = null;
    const loop = (now: number) => {
      if (!t0) t0 = now;
      const a = (((now - t0) % T) / T) * Math.PI * 2;
      const ex = RX * Math.cos(a);
      const ey = RY * Math.sin(a);
      const x = cx + ex * cosT - ey * sinT;
      const y = cy + ex * sinT + ey * cosT;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const side: "cbse" | "neet" = x > cx ? "neet" : "cbse";
      if (side !== last) { last = side; setActive(side); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // resting position for reduced motion (near NEET)
  const restX = cx + RX * Math.cos(TILT);
  const restY = cy + RX * Math.sin(TILT);

  return (
    <div className="pz-v11-emblem" style={{ position: "absolute", top: -6, right: -10, width: W, height: H }}>
      <div style={{ position: "absolute", inset: 0 }} aria-hidden>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {rings.map((r, i) => (
            <path key={i} d={paths[i]} fill="none" stroke="#ffffff" strokeOpacity={r.op} strokeWidth={r.w} />
          ))}
        </svg>
        {/* decorative white planets ride rings 1 and 3 (CSS offset-path) */}
        <span className="pz-planet" style={{ width: 9, height: 9, background: "#ffffff", boxShadow: "0 0 10px rgba(255,255,255,0.75)", offsetPath: `path('${paths[1]}')`, animationDuration: "19s", animationDelay: "-4s" } as CSSProperties} />
        <span className="pz-planet" style={{ width: 6, height: 6, background: "#d7d0f7", boxShadow: "0 0 8px rgba(215,208,247,0.8)", offsetPath: `path('${paths[3]}')`, animationDuration: "13s", animationDirection: "reverse" } as CSSProperties} />
        {/* the orange planet (rAF-driven, drives the pills) */}
        <span
          ref={planetRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 17,
            height: 17,
            borderRadius: "50%",
            background: AMBER,
            boxShadow: "0 0 18px 2px rgba(255,184,77,0.9)",
            willChange: "transform",
            transform: `translate(${restX}px, ${restY}px) translate(-50%, -50%)`,
            zIndex: 1,
          }}
        />
      </div>
      {/* pills sit above the orbit; the planet glides behind them */}
      <div style={{ position: "absolute", top: cy - 22, left: 0, width: W, display: "flex", justifyContent: "center", gap: 12, zIndex: 2 }}>
        <Pill active={active === "cbse"}>6&ndash;12 CBSE</Pill>
        <Pill active={active === "neet"}>NEET-UG</Pill>
      </div>
    </div>
  );
}

export function HeroV11() {
  const reduce = usePrefersReducedMotion();
  return (
    <div style={{ position: "relative", background: "linear-gradient(180deg, #fff6ea 0%, #ffeccf 100%)" }}>
      <Nav />

      <section style={{ position: "relative", overflowX: "clip", padding: "clamp(16px, 2.4vw, 30px) 20px clamp(28px, 3.5vw, 44px)" }}>
        <div className="pz-v11-grid">
          {/* LEFT: purple panel + lavender stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div className="pz-pop" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(155deg, #483ea0 0%, #332a7c 58%, #2b2468 100%)", borderRadius: 32, padding: "clamp(28px, 3vw, 46px)", color: "#fff", flex: 1 }}>
              {/* top row: tagline + interactive orbit */}
              <div style={{ position: "relative", minHeight: 168 }}>
                <span style={{ display: "block", fontSize: 14.5, fontWeight: 600, color: "rgba(255,255,255,0.9)", maxWidth: 250 }}>
                  Watch Less. Practice More. Score Higher.
                </span>
                <OrbitExam reduce={reduce} />
              </div>

              <h1 style={{ position: "relative", fontSize: "clamp(36px, 4.4vw, 58px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "8px 0 0", zIndex: 2 }}>
                Your <RotatingWord words={ROT_WORDS} color={AMBER} />
                <br />
                Learning Companion.
              </h1>

              <p style={{ display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: 6, fontSize: "clamp(13.5px, 1.3vw, 15.5px)", lineHeight: 1.5, color: "rgba(255,255,255,0.82)", margin: "18px 0 0", maxWidth: 560, position: "relative", zIndex: 2 }}>
                {FEATURES.map((f, i) => (
                  <span key={f} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                    {i > 0 && <span style={{ color: AMBER, margin: "0 10px" }}>&bull;</span>}
                    {f}
                  </span>
                ))}
              </p>

              <div className="flex items-center" style={{ gap: 12, marginTop: "clamp(26px, 3vw, 36px)", position: "relative", zIndex: 2 }}>
                <a href="#experience" className="pz-exp" style={{ display: "inline-flex", alignItems: "center", background: "#fff", color: PURPLE, borderRadius: "var(--pz-radius-pill)", padding: "15px 28px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 16px 30px -16px rgba(0,0,0,0.5)" }}>
                  Experience Prepzy now
                </a>
                <a href="#experience" aria-label="Experience Prepzy" className="pz-compass" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: "#fff", textDecoration: "none", boxShadow: "0 16px 30px -16px rgba(0,0,0,0.5)" }}>
                  <Navigation size={20} fill={AMBER} color={PURPLE} strokeWidth={1.6} style={{ transform: "rotate(8deg)" }} />
                </a>
              </div>
            </div>

            {/* lavender stats */}
            <div className="pz-pop pz-v11-stats" style={{ background: "#e7e3fb", borderRadius: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "clamp(18px, 2vw, 28px) clamp(14px, 2vw, 26px)" }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: "0 6px" }}>
                  <div style={{ fontSize: "clamp(24px, 2.7vw, 36px)", fontWeight: 800, color: PURPLE, lineHeight: 1 }}>
                    <CountUp to={s.to} suffix={s.suffix} reduce={reduce} />
                  </div>
                  <div style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "#6b6391", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: real student + dashboard photo */}
          <div className="pz-pop pz-v11-photo" style={{ borderRadius: 32, overflow: "hidden", background: "#f3eee6", boxShadow: "0 44px 84px -50px rgba(36,29,82,0.55)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-student.jpg" alt="A student learning on Prepzy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>

        {/* scroll cue */}
        <a href="#experience" className="pz-scrollcue" aria-label="Scroll to explore">
          <span>Scroll to explore</span>
          <ChevronDown size={18} className="pz-scrollcue-ico" />
        </a>
      </section>
    </div>
  );
}
