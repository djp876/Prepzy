"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Star, Menu, GraduationCap, Stethoscope } from "lucide-react";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const LAV2 = "#dcd8f6";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const GREEN = "#1d9e75";
const MINT = "#d7f2e6";

const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"];
const HERO_PHOTO = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=700&h=1000";

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

function CountUp({ to, suffix, reduce }: { to: number; suffix: string; reduce: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (reduce) { setVal(to); return; }
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1100);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);
  return <>{val.toLocaleString("en-IN")}{suffix}</>;
}

function AuroraBg() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 56;
      ty = (e.clientY / window.innerHeight - 0.5) * 56;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      el.style.setProperty("--ax", `${cx.toFixed(1)}px`);
      el.style.setProperty("--ay", `${cy.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [reduce]);
  return (
    <div ref={ref} aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div className="pz-aurora" style={{ position: "absolute", inset: "-25%", background: "radial-gradient(40% 50% at calc(20% + var(--ax,0px)) calc(18% + var(--ay,0px)), rgba(124,107,224,0.26), transparent 70%), radial-gradient(44% 54% at calc(84% + var(--ax,0px)) calc(20% - var(--ay,0px)), rgba(255,184,77,0.28), transparent 70%), radial-gradient(48% 58% at calc(78% - var(--ax,0px)) calc(86% + var(--ay,0px)), rgba(214,109,109,0.18), transparent 70%)", filter: "blur(50px)" }} />
    </div>
  );
}

function Nav() {
  const links = ["Learn", "Courses", "Pricing", "About"];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: "16px 16px 0" }}>
      <nav className="mx-auto flex w-full items-center justify-between" style={{ position: "relative", maxWidth: 1140, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 22px", boxShadow: "0 14px 34px -18px rgba(36,29,82,0.34), inset 0 1px 1px rgba(255,255,255,0.6)" }}>
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

const tile: React.CSSProperties = { position: "relative", overflow: "hidden", padding: 22, display: "flex", flexDirection: "column" };

export function HeroV9() {
  const reduce = usePrefersReducedMotion();
  return (
    <div style={{ background: CREAM }}>
      <Nav />
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(20px, 3vw, 40px) 16px clamp(40px, 6vw, 72px)" }}>
        <AuroraBg />
        <div className="pz-bento pz-pop" style={{ position: "relative", zIndex: 2 }}>
          {/* HERO tile */}
          <div style={{ ...tile, gridColumn: "1 / 4", gridRow: "1 / 3", background: "#fff", border: "1px solid var(--pz-line)", justifyContent: "center", boxShadow: "0 30px 60px -40px rgba(36,29,82,0.35)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", background: CREAM, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "6px 12px", fontSize: 12.5, fontWeight: 600, color: PURPLE }}>
              <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} fill={AMBER} color={AMBER} />)}</span>
              Loved by 2,00,000+ learners
            </span>
            <h1 style={{ fontSize: "clamp(30px, 3.6vw, 48px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: INK, margin: "16px 0 0" }}>
              Your <RotatingWord words={ROT_WORDS} color={AMBER} /> Learning Companion.
            </h1>
            <p style={{ fontSize: "clamp(14.5px, 1.4vw, 16px)", color: MUTED, lineHeight: 1.55, margin: "12px 0 0", maxWidth: 460 }}>
              Video lessons, 24×7 doubt-solving and practice that actually sticks — for CBSE 6-12 and NEET-UG.
            </p>
            <div className="flex items-center" style={{ gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "13px 13px 13px 22px", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 16px 30px -14px rgba(61,52,139,0.7)" }}>
                Get started free
                <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={16} color="#fff" /></span>
              </a>
              <a href="#experience" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "12px 20px 12px 13px", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={13} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} /></span>
                Experience Prepzy
              </a>
            </div>
          </div>

          {/* MEDIA tile (tall right) */}
          <a href="#experience" style={{ ...tile, gridColumn: "4 / 5", gridRow: "1 / 4", padding: 0, textDecoration: "none", boxShadow: "0 30px 60px -36px rgba(36,29,82,0.55)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_PHOTO} alt="A Prepzy learner" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36,29,82,0.05), rgba(36,29,82,0.72))" }} />
            <span className={reduce ? "" : "pz-play"} style={{ position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)", width: 56, height: 56, borderRadius: "50%", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center", color: INK }}>
              <Play size={21} fill={INK} style={{ marginLeft: 3 }} />
            </span>
            <span style={{ position: "absolute", left: 16, right: 16, bottom: 16, color: "#fff" }}>
              <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>See Prepzy in action</span>
              <span style={{ display: "block", fontSize: 12.5, opacity: 0.85, marginTop: 2 }}>A 30-second tour</span>
            </span>
          </a>

          {/* EXAM tile */}
          <div style={{ ...tile, gridColumn: "1 / 2", gridRow: "3 / 4", background: "#fdeccd", justifyContent: "center", gap: 9 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#8a5a12", letterSpacing: "0.04em", textTransform: "uppercase" }}>Built for</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "8px 13px", fontSize: 13, fontWeight: 700, color: INK, width: "fit-content" }}>
              <GraduationCap size={16} color={PURPLE} /> CBSE 6-12
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "8px 13px", fontSize: 13, fontWeight: 700, color: INK, width: "fit-content" }}>
              <Stethoscope size={16} color={GREEN} /> NEET-UG
            </span>
          </div>

          {/* STATS tile */}
          <div style={{ ...tile, gridColumn: "2 / 3", gridRow: "3 / 4", background: LAV2, justifyContent: "center" }}>
            <span style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, color: PURPLE, lineHeight: 1 }}>
              <CountUp to={2} suffix="L+" reduce={reduce} />
            </span>
            <span style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>practice questions</span>
            <span style={{ fontSize: 12.5, color: INK, fontWeight: 600, marginTop: 10 }}>90+ books · 300+ videos</span>
          </div>

          {/* TUTORS tile */}
          <div style={{ ...tile, gridColumn: "3 / 4", gridRow: "3 / 4", background: MINT, justifyContent: "center" }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0f6e56" }}>Your tutors</span>
            <span style={{ display: "inline-flex", marginTop: 10 }}>
              {[{ m: "A", bg: PURPLE_DEEP }, { m: "R", bg: AMBER }, { m: "C", bg: PURPLE }, { m: "G", bg: "#e26d6d" }].map((t, i) => (
                <span key={t.m} style={{ width: 36, height: 36, borderRadius: "50%", background: t.bg, color: t.m === "R" ? INK : "#fff", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid " + MINT, marginLeft: i === 0 ? 0 : -10 }}>{t.m}</span>
              ))}
            </span>
            <span style={{ fontSize: 12, color: "#3a6b5c", marginTop: 9 }}>Atlas, Ramanujan, Curie &amp; Gargi</span>
          </div>
        </div>
      </section>
    </div>
  );
}
