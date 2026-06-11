"use client";

import { useEffect, useState } from "react";
import { Navigation, Menu, ChevronDown } from "lucide-react";
import SolarSystem from "./SolarSystem";

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
              {/* top row: tagline + interactive solar system */}
              <div className="pz-v11-toprow" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: "rgba(255,255,255,0.9)", maxWidth: 220, marginTop: 6 }}>
                  Watch Less. Practice More. Score Higher.
                </span>
                <SolarSystem />
              </div>

              <h1 style={{ position: "relative", fontSize: "clamp(36px, 4.4vw, 58px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "6px 0 0", zIndex: 2 }}>
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
