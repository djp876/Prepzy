"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Play, Star, Check, Menu } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";

const ROT_WORDS = ["Adaptive", "Smart", "Personalised", "Interactive", "Daily"];
const STATS: ReadonlyArray<{ to: number; suffix: string; label: string }> = [
  { to: 90, suffix: "+", label: "Textbooks" },
  { to: 3000, suffix: "+", label: "Videos" },
  { to: 2, suffix: "L+", label: "Questions" },
  { to: 1000, suffix: "+", label: "Hours" },
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
    const id = window.setInterval(() => setI((p) => (p + 1) % words.length), 2200);
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

function Orbiter({ d, angle, duration, reduce, children }: { d: number; angle: number; duration: number; reduce: boolean; children: React.ReactNode }) {
  const delay = `-${((duration * angle) / 360).toFixed(2)}s`;
  return (
    <div
      className={reduce ? "" : "pz-orbit"}
      style={{ position: "absolute", top: "50%", left: "50%", width: `${d}%`, height: `${d}%`, marginLeft: `-${d / 2}%`, marginTop: `-${d / 2}%`, borderRadius: "50%", ...(reduce ? { transform: `rotate(${angle}deg)` } : { animation: `pzOrbit ${duration}s linear infinite`, animationDelay: delay }) }}
    >
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)" }}>
        <div className={reduce ? "" : "pz-orbit-c"} style={{ ...(reduce ? { transform: `rotate(${-angle}deg)` } : { animation: `pzOrbitR ${duration}s linear infinite`, animationDelay: delay }) }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", background: "#fff", color: PURPLE, borderRadius: "var(--pz-radius-pill)", padding: "6px 14px", fontSize: 13, fontWeight: 700, boxShadow: "0 10px 22px -12px rgba(36,29,82,0.45)", whiteSpace: "nowrap" }}>{children}</span>;
}

function Dot({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "flex", width: 30, height: 30, borderRadius: "50%", background: AMBER, color: INK, alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, boxShadow: "0 10px 20px -8px rgba(255,184,77,0.85)" }}>{children}</span>;
}

function Solar({ reduce }: { reduce: boolean }) {
  return (
    <div className="pz-solar" style={{ position: "relative", width: "min(440px, 92%)", margin: "0 auto", aspectRatio: "1 / 1" }}>
      {[90, 66, 42].map((d) => (
        <span key={d} aria-hidden style={{ position: "absolute", top: "50%", left: "50%", width: `${d}%`, height: `${d}%`, transform: "translate(-50%, -50%)", borderRadius: "50%", border: "1.5px solid rgba(61,52,139,0.14)" }} />
      ))}

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "23%", aspectRatio: "1 / 1", borderRadius: "50%", background: "linear-gradient(150deg, #6a5cf0, #241d52)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 60px -4px rgba(124,107,224,0.6), 0 22px 44px -16px rgba(36,29,82,0.6)", zIndex: 3 }}>
        <span style={{ position: "relative", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
          P
          <span style={{ position: "absolute", top: "-10%", right: "-46%", width: 18, height: 18, borderRadius: "50%", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={12} color={INK} /></span>
        </span>
      </div>

      {/* inner ring: small accent dots only (clear of the core) */}
      <Orbiter d={42} angle={135} duration={30} reduce={reduce}><Dot>?</Dot></Orbiter>
      <Orbiter d={42} angle={315} duration={30} reduce={reduce}><Dot><Check size={15} strokeWidth={3} /></Dot></Orbiter>

      {/* mid ring: two subjects, opposite each other */}
      <Orbiter d={66} angle={55} duration={46} reduce={reduce}><Pill>Physics</Pill></Orbiter>
      <Orbiter d={66} angle={235} duration={46} reduce={reduce}><Pill>NEET</Pill></Orbiter>

      {/* outer ring: three subjects + a star, evenly spaced */}
      <Orbiter d={90} angle={20} duration={62} reduce={reduce}><Pill>Biology</Pill></Orbiter>
      <Orbiter d={90} angle={110} duration={62} reduce={reduce}><Pill>Maths</Pill></Orbiter>
      <Orbiter d={90} angle={200} duration={62} reduce={reduce}><Pill>CBSE</Pill></Orbiter>
      <Orbiter d={90} angle={290} duration={62} reduce={reduce}><Dot><Star size={14} fill={INK} /></Dot></Orbiter>
    </div>
  );
}

export function HeroV10() {
  const reduce = usePrefersReducedMotion();
  return (
    <div style={{ background: "linear-gradient(180deg, #fff6ea 0%, #ffe9cb 100%)" }}>
      <Nav />
      <section style={{ position: "relative", padding: "clamp(20px, 3vw, 40px) 16px clamp(36px, 5vw, 64px)" }}>
        <div className="pz-v5-grid" style={{ alignItems: "center" }}>
          <div>
            <span className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "7px 15px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: PURPLE }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: AMBER }} />
              Personalised exam prep
            </span>
            <h1 className="pz-pop" style={{ fontSize: "clamp(38px, 5.6vw, 64px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, margin: "20px 0 0" }}>
              Your <RotatingWord words={ROT_WORDS} color={AMBER} />
              <br />
              Quiz Companion.
            </h1>
            <p className="pz-pop" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: MUTED, lineHeight: 1.55, margin: "18px 0 0", maxWidth: 470 }}>
              Adaptive quizzes, smart video lessons, and 24×7 doubt-solving. <strong style={{ color: INK, fontWeight: 600 }}>CBSE &amp; NEET today, more exams on the way.</strong>
            </p>
            <div className="pz-pop flex items-center" style={{ gap: 14, marginTop: 30, flexWrap: "wrap" }}>
              <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "15px 16px 15px 26px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 18px 32px -14px rgba(61,52,139,0.7)" }}>
                Sign up free
                <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: AMBER, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={17} color={INK} /></span>
              </a>
              <a href="#experience" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "14px 24px 14px 18px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
                <Play size={14} fill={PURPLE} color={PURPLE} /> Experience Prepzy
              </a>
            </div>
          </div>

          <div className="pz-pop">
            <Solar reduce={reduce} />
          </div>
        </div>

        <div className="pz-pop" style={{ maxWidth: 1080, margin: "clamp(24px, 4vw, 48px) auto 0", background: "#fff", borderRadius: "var(--pz-radius-tile)", boxShadow: "0 30px 60px -38px rgba(36,29,82,0.4)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "clamp(18px, 2.4vw, 30px) 8px" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", borderLeft: i === 0 ? "none" : "1px solid var(--pz-line)", padding: "0 8px" }}>
              <div style={{ fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 800, color: INK, lineHeight: 1 }}>
                <CountUp to={s.to} suffix={s.suffix} reduce={reduce} />
              </div>
              <div style={{ fontSize: "clamp(12px, 1.2vw, 14px)", color: MUTED, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
