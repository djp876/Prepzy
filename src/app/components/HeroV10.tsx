"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Play, Star, Menu, GraduationCap, Stethoscope, ChevronDown } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const GREEN = "#1d9e75";
const ORANGE_INK = "#6b3e10";

const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"];

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
  const [i, setI] = useState(1);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);
  return <span key={i} className="pz-word" style={{ color, fontStyle: "italic" }}>{words[i]}</span>;
}

function Nav() {
  const links = ["Learn", "Courses", "Pricing", "About"];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: "16px 16px 0" }}>
      <nav className="mx-auto flex w-full items-center justify-between" style={{ position: "relative", maxWidth: 1140, background: "rgba(255,255,255,0.6)", backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 22px", boxShadow: "0 14px 34px -18px rgba(120,70,10,0.4), inset 0 1px 1px rgba(255,255,255,0.7)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 32, width: "auto", display: "block" }} />
        <ul className="hidden items-center lg:flex" style={{ gap: 30, listStyle: "none", margin: 0, padding: 0, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {links.map((l) => (
            <li key={l}><a href="#" style={{ fontSize: 15, fontWeight: 600, color: INK, textDecoration: "none" }}>{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center" style={{ gap: 10 }}>
          <a href="#" className="hidden sm:inline-flex" style={{ color: INK, fontSize: 15, fontWeight: 600, textDecoration: "none", padding: "10px 8px" }}>Log in</a>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PURPLE, color: "#fff", borderRadius: "30px 30px 30px 7px", padding: "11px 12px 11px 20px", fontSize: 14.5, fontWeight: 700, textDecoration: "none", boxShadow: "0 12px 24px -10px rgba(61,52,139,0.6)" }}>
            Get started
            <span className="pz-cta-ico" style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={15} color="#fff" /></span>
          </a>
          <button aria-label="Open menu" className="inline-flex items-center justify-center lg:hidden" style={{ width: 42, height: 42, borderRadius: "var(--pz-radius-pill)", background: LAV, border: "none", color: PURPLE, cursor: "pointer" }}><Menu size={20} /></button>
        </div>
      </nav>
    </header>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "8px 16px", fontSize: 13.5, fontWeight: 700, color: INK, boxShadow: "0 10px 22px -12px rgba(120,70,10,0.45)" }}>
      {icon} {label}
    </span>
  );
}

export function HeroV10() {
  const reduce = usePrefersReducedMotion();
  return (
    <div style={{ background: "#ffb84d" }}>
      <Nav />
      <section style={{ position: "relative", overflow: "hidden", minHeight: "calc(100svh - 76px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(36px, 6vh, 80px) 16px clamp(48px, 8vh, 96px)", background: "radial-gradient(125% 110% at 50% 0%, #ffe0ad 0%, #ffc266 45%, #ff9f43 100%)" }}>
        {/* breathing light */}
        <div className={reduce ? "" : "pz-aurora"} aria-hidden style={{ position: "absolute", inset: "-25%", background: "radial-gradient(40% 45% at 50% 18%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(45% 50% at 18% 90%, rgba(255,150,80,0.5), transparent 70%), radial-gradient(45% 50% at 85% 85%, rgba(255,210,140,0.6), transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
        {/* grain */}
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "160px 160px", opacity: 0.06, mixBlendMode: "multiply", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <div className={reduce ? "pz-pop" : "pz-pop pz-float"} style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <Pill icon={<GraduationCap size={16} color={PURPLE} />} label="CBSE Classes 6-12" />
            <Pill icon={<Stethoscope size={16} color={GREEN} />} label="NEET-UG" />
          </div>

          <h1 className="pz-pop" style={{ fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-0.03em", color: INK, margin: "22px 0 0" }}>
            Your <RotatingWord words={ROT_WORDS} color={PURPLE} />
            <br />
            Learning Companion.
          </h1>

          <p className="pz-pop" style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: ORANGE_INK, fontWeight: 500, lineHeight: 1.5, margin: "18px auto 0", maxWidth: 500 }}>
            Smart lessons, 24×7 doubt-solving and practice that actually sticks.
          </p>

          <div className="pz-pop flex items-center justify-center" style={{ gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "15px 16px 15px 28px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 20px 36px -14px rgba(61,52,139,0.6)" }}>
              Get started for free
              <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={17} color="#fff" /></span>
            </a>
            <a href="#experience" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: INK, borderRadius: "var(--pz-radius-pill)", padding: "14px 24px 14px 15px", fontWeight: 600, fontSize: 16, textDecoration: "none", boxShadow: "0 16px 30px -16px rgba(120,70,10,0.4)" }}>
              <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={14} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} /></span>
              Experience Prepzy
            </a>
          </div>

          <div className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 24, color: ORANGE_INK, fontSize: 13.5, fontWeight: 600 }}>
            <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill={PURPLE} color={PURPLE} />)}</span>
            Loved by 2,00,000+ learners across India
          </div>
        </div>

        {!reduce && (
          <span style={{ position: "absolute", bottom: "4%", left: 0, right: 0, textAlign: "center", zIndex: 2, color: ORANGE_INK, fontSize: 12.5, fontWeight: 600, opacity: 0.7 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>Scroll to explore <ChevronDown size={15} /></span>
          </span>
        )}
      </section>
    </div>
  );
}
