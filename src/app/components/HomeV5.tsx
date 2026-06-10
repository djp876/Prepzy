"use client";

import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Stethoscope,
  ArrowUpRight,
  Play,
  Check,
  Star,
  BookOpen,
  Brain,
  Target,
  PencilLine,
  ChevronDown,
  Menu,
} from "lucide-react";
import { ExperiencePrepzy } from "./ExperiencePrepzy";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const GREEN = "#1d9e75";
const MINT = "#d7f2e6";
const CORAL = "#ffd9cc";
const SKY = "#d8e8fb";

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

function CountUp({ to, suffix, reduce }: { to: number; suffix: string; reduce: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
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
  return (
    <>
      {val.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

function Blob({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <path fill={color} d="M48.4,-63.7C61.5,-54.2,70.2,-39.1,73.9,-23.1C77.6,-7.1,76.3,9.8,69.6,24.2C62.9,38.6,50.8,50.5,36.8,59.2C22.8,67.9,6.9,73.4,-9.6,73.8C-26.1,74.2,-43.2,69.5,-55.9,58.7C-68.6,47.9,-76.9,31,-79.2,13.3C-81.5,-4.4,-77.8,-22.9,-68.1,-37.4C-58.4,-51.9,-42.7,-62.4,-26.8,-70.7C-10.9,-79,5.2,-85.1,20.9,-81.9C36.6,-78.7,35.3,-73.2,48.4,-63.7Z" transform="translate(100 100)" />
    </svg>
  );
}

function Sparkle({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" style={style} aria-hidden>
      <path fill={color} d="M12 0c1 6 5 10 12 12-7 2-11 6-12 12-1-6-5-10-12-12C7 10 11 6 12 0Z" />
    </svg>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const links = ["Home", "Courses", "Pricing", "About", "Contact"];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: "14px 16px 0" }}>
      <nav className="mx-auto flex w-full items-center justify-between" style={{ maxWidth: 1200, background: "rgba(255,255,255,0.86)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "9px 12px 9px 22px", boxShadow: "0 8px 24px -14px rgba(36,29,82,0.3)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 30, width: "auto", display: "block" }} />
        <ul className="hidden items-center lg:flex" style={{ gap: 24, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l, i) => (
            <li key={l}>
              <a href="#" style={{ fontSize: 14, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? PURPLE : INK, textDecoration: "none" }}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center" style={{ gap: 8 }}>
          <a href="#" className="hidden sm:inline-flex" style={{ color: INK, fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px 14px" }}>Log in</a>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 18px", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 20px -10px rgba(255,184,77,0.8)" }}>
            Get started
            <span className="pz-cta-ico" style={{ width: 26, height: 26, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUpRight size={15} color={AMBER} />
            </span>
          </a>
          <button aria-label="Open menu" className="inline-flex items-center justify-center lg:hidden" style={{ width: 42, height: 42, borderRadius: "var(--pz-radius-pill)", background: LAV, border: "none", color: PURPLE, cursor: "pointer" }}>
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ reduce }: { reduce: boolean }) {
  const stickers = [
    { t: "x²", bg: AMBER, c: INK, cls: "pz-float", pos: { top: "18%", left: "6%" } },
    { t: "H₂O", bg: MINT, c: GREEN, cls: "pz-float-2", pos: { top: "62%", left: "10%" } },
    { t: "?", bg: SKY, c: PURPLE, cls: "pz-float-3", pos: { top: "26%", right: "8%" } },
    { t: "A+", bg: CORAL, c: "#c0492f", cls: "pz-float", pos: { top: "68%", right: "9%" } },
  ];
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "clamp(40px, 7vw, 90px) 16px clamp(48px, 7vw, 96px)" }}>
      {/* playful background blobs */}
      <Blob color={LAV} className={reduce ? "" : "pz-float-2"} style={{ position: "absolute", width: 320, height: 320, top: -60, left: -70, opacity: 0.7 }} />
      <Blob color="#fdeccd" className={reduce ? "" : "pz-float"} style={{ position: "absolute", width: 280, height: 280, bottom: -70, right: -50, opacity: 0.8 }} />
      <Sparkle color={AMBER} style={{ position: "absolute", width: 26, height: 26, top: "16%", left: "22%" }} />
      <Sparkle color={PURPLE} style={{ position: "absolute", width: 18, height: 18, top: "30%", right: "26%", opacity: 0.6 }} />

      {/* floating subject stickers (desktop) */}
      <div className="hidden md:block">
        {stickers.map((s) => (
          <span key={s.t} className={reduce ? "" : `${s.cls} pz-wobble`} style={{ position: "absolute", ...s.pos, width: 60, height: 60, borderRadius: 18, background: s.bg, color: s.c, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, boxShadow: "0 16px 30px -16px rgba(36,29,82,0.4)", transform: "rotate(-6deg)" }}>{s.t}</span>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <span className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "7px 8px 7px 14px", fontSize: 13, fontWeight: 600, color: PURPLE, boxShadow: "0 8px 20px -12px rgba(36,29,82,0.3)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><GraduationCap size={15} color={AMBER} /> CBSE 6-12</span>
          <span style={{ width: 1, height: 14, background: "var(--pz-line)" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Stethoscope size={15} color={AMBER} /> NEET-UG</span>
        </span>

        <h1 className="pz-pop" style={{ fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK, margin: "22px 0 0" }}>
          Learning that feels like{" "}
          <span style={{ position: "relative", color: PURPLE, whiteSpace: "nowrap" }}>
            play
            <svg viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", left: 0, bottom: "-0.18em", width: "100%", height: "0.36em" }}>
              <path d="M3 13 C 50 4, 150 4, 197 11" fill="none" stroke={AMBER} strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
          .
        </h1>

        <p className="pz-pop" style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: MUTED, lineHeight: 1.55, margin: "20px auto 0", maxWidth: 540 }}>
          Video lessons, 24×7 doubt-solving and practice that actually sticks. Your friendly study companion for every subject.
        </p>

        <div className="pz-pop flex items-center justify-center" style={{ gap: 14, marginTop: 30, flexWrap: "wrap" }}>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "14px 14px 14px 26px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 18px 32px -14px rgba(255,184,77,0.85)" }}>
            Get started free
            <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUpRight size={17} color={AMBER} />
            </span>
          </a>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "13px 22px 13px 14px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
            <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={14} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} />
            </span>
            Watch the demo
          </a>
        </div>

        <div className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 22, color: MUTED, fontSize: 13.5 }}>
          <span style={{ display: "inline-flex" }}>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} fill={AMBER} color={AMBER} />)}
          </span>
          Loved by <strong style={{ color: INK }}>2,00,000+</strong> learners and parents
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = ["90+ textbooks", "3,000+ video lessons", "2L+ practice questions", "1,000+ hours", "Chapter-by-chapter", "Previous-year papers", "Mock exams", "Doubt-solving 24×7"];
  const row = [...items, ...items];
  return (
    <div style={{ background: PURPLE, padding: "16px 0", overflow: "hidden" }}>
      <div className="pz-marq" style={{ gap: 0 }}>
        {row.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24, padding: "0 24px", color: "#fff", fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}>
            {t}
            <Sparkle color={AMBER} style={{ width: 16, height: 16, opacity: 0.9 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Exam picker ---------------- */
function ExamPicker() {
  const cards = [
    { title: "CBSE · Classes 6-12", desc: "Every subject, chapter by chapter.", tags: ["Maths", "Science", "Social", "English", "Hindi"], Icon: GraduationCap, bg: LAV, accent: PURPLE },
    { title: "NEET-UG", desc: "Full syllabus, PYQs and mock tests.", tags: ["Physics", "Chemistry", "Biology"], Icon: Stethoscope, bg: MINT, accent: GREEN },
  ];
  return (
    <section style={{ background: CREAM, padding: "clamp(56px, 8vw, 110px) 16px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="pz-rv" style={{ textAlign: "center", marginBottom: 36 }}>
          <Eyebrow>Pick your path</Eyebrow>
          <H2>Where do you want to start?</H2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {cards.map((c) => (
            <a key={c.title} href="#" className="pz-rv pz-lift" style={{ display: "block", textDecoration: "none", background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: 26, boxShadow: "0 30px 60px -38px rgba(36,29,82,0.4)" }}>
              <span style={{ width: 56, height: 56, borderRadius: 18, background: c.bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <c.Icon size={26} color={c.accent} />
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: INK, margin: "16px 0 6px", letterSpacing: "-0.01em" }}>{c.title}</h3>
              <p style={{ fontSize: 14.5, color: MUTED, margin: "0 0 16px" }}>{c.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {c.tags.map((t) => <span key={t} style={{ background: CREAM, border: "1px solid var(--pz-line)", color: INK, borderRadius: "var(--pz-radius-pill)", padding: "5px 12px", fontSize: 12.5, fontWeight: 600 }}>{t}</span>)}
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 20, color: c.accent, fontWeight: 700, fontSize: 14.5 }}>
                Explore <ArrowUpRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tutors ---------------- */
function Tutors() {
  const tutors = [
    { m: "A", name: "Atlas", role: "Your everyday guide", bg: PURPLE, c: "#fff" },
    { m: "R", name: "Ramanujan", role: "Maths", bg: AMBER, c: INK },
    { m: "C", name: "Curie", role: "Science", bg: MINT, c: GREEN },
    { m: "G", name: "Gargi", role: "Social Science", bg: CORAL, c: "#c0492f" },
  ];
  return (
    <section style={{ background: "#fff", padding: "clamp(56px, 8vw, 110px) 16px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="pz-rv" style={{ textAlign: "center", marginBottom: 38 }}>
          <Eyebrow>Meet your tutors</Eyebrow>
          <H2>A friendly face for every subject.</H2>
          <P>Strict, funny or storyteller. Pick the teaching style that clicks for you.</P>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {tutors.map((t) => (
            <div key={t.name} className="pz-rv pz-lift" style={{ textAlign: "center", background: CREAM, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: "28px 18px" }}>
              <span className="pz-wobble" style={{ position: "relative", display: "inline-flex", width: 84, height: 84, borderRadius: 26, background: t.bg, color: t.c, alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800, boxShadow: "0 18px 36px -18px rgba(36,29,82,0.5)" }}>
                {t.m}
                <Sparkle color={AMBER} style={{ position: "absolute", width: 18, height: 18, top: -6, right: -4 }} />
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: INK, margin: "16px 0 2px" }}>{t.name}</h3>
              <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature bento ---------------- */
function Features() {
  const feats = [
    { Icon: PencilLine, title: "Solve any doubt", desc: "Snap a messy handwritten problem and get a clear, step-by-step answer.", bg: LAV, accent: PURPLE, big: true },
    { Icon: BookOpen, title: "Visual learning", desc: "Concepts you actually remember, explained with motion.", bg: MINT, accent: GREEN },
    { Icon: Target, title: "Target weak spots", desc: "Smart tests that find the gaps and close them.", bg: CORAL, accent: "#c0492f" },
    { Icon: Brain, title: "Previous-year papers", desc: "The closest thing to a time machine for exams.", bg: SKY, accent: PURPLE },
  ];
  return (
    <section style={{ background: CREAM, padding: "clamp(56px, 8vw, 110px) 16px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="pz-rv" style={{ textAlign: "center", marginBottom: 36 }}>
          <Eyebrow>Why students stick around</Eyebrow>
          <H2>Everything you need to score higher.</H2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {feats.map((f) => (
            <div key={f.title} className="pz-rv pz-lift" style={{ gridColumn: f.big ? "span 1" : undefined, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: 24, boxShadow: "0 30px 60px -40px rgba(36,29,82,0.35)" }}>
              <span style={{ width: 50, height: 50, borderRadius: 16, background: f.bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <f.Icon size={24} color={f.accent} />
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: INK, margin: "14px 0 6px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Free band ---------------- */
function FreeBand() {
  return (
    <section style={{ padding: "clamp(40px, 6vw, 80px) 16px", background: "#fff" }}>
      <div className="pz-rv" style={{ position: "relative", overflow: "hidden", maxWidth: 1080, margin: "0 auto", background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DEEP})`, borderRadius: "calc(var(--pz-radius-tile) + 8px)", padding: "clamp(34px, 5vw, 60px)", textAlign: "center", boxShadow: "0 40px 80px -40px rgba(36,29,82,0.6)" }}>
        <Blob color="rgba(255,184,77,0.22)" style={{ position: "absolute", width: 240, height: 240, top: -60, right: -40 }} />
        <h2 style={{ position: "relative", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
          Start your first month <span style={{ color: AMBER }}>free</span>.
        </h2>
        <p style={{ position: "relative", color: "rgba(255,255,255,0.8)", fontSize: 16, margin: "12px auto 0", maxWidth: 440 }}>No card needed. Cancel anytime. Full access to every subject.</p>
        <div className="flex items-center justify-center" style={{ gap: 12, marginTop: 26, flexWrap: "wrap", position: "relative" }}>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "14px 14px 14px 26px", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
            Get started free
            <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={17} color={AMBER} /></span>
          </a>
          <a href="#" className="pz-cta" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "var(--pz-radius-pill)", padding: "13px 22px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>Log in</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const quotes = [
    { q: "I stopped dreading maths. Ramanujan explains it like a friend.", n: "Aanya, Class 9", bg: LAV },
    { q: "My son finally studies on his own. The reports keep me in the loop.", n: "Puneet, parent", bg: MINT },
    { q: "The doubt-solving is instant. No more waiting for tuition.", n: "Rahul, Class 11", bg: CORAL },
  ];
  return (
    <section style={{ background: "#fff", padding: "clamp(56px, 8vw, 110px) 16px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="pz-rv" style={{ textAlign: "center", marginBottom: 36 }}>
          <Eyebrow>Loved by students &amp; parents</Eyebrow>
          <H2>Real wins, every day.</H2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {quotes.map((t) => (
            <div key={t.n} className="pz-rv pz-lift" style={{ background: CREAM, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: 24 }}>
              <span style={{ display: "inline-flex", marginBottom: 12 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} fill={AMBER} color={AMBER} />)}</span>
              <p style={{ fontSize: 15.5, color: INK, lineHeight: 1.55, margin: "0 0 16px", fontWeight: 500 }}>“{t.q}”</p>
              <span style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>{t.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Parent CTA ---------------- */
function ParentCTA() {
  return (
    <section style={{ background: CREAM, padding: "clamp(40px, 6vw, 80px) 16px" }}>
      <div className="pz-rv" style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: "clamp(28px, 4vw, 44px)" }}>
        <div style={{ flex: "1 1 320px" }}>
          <Eyebrow>For parents</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: "12px 0 8px" }}>Give your child the support they deserve.</h2>
          <p style={{ fontSize: 15.5, color: MUTED, margin: 0, lineHeight: 1.55 }}>Weekly progress, safe content and a tutor available any time. Peace of mind, at an Indian price.</p>
        </div>
        <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "14px 14px 14px 24px", fontWeight: 700, fontSize: 15.5, textDecoration: "none", flex: "none" }}>
          See parent dashboard
          <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={16} color="#fff" /></span>
        </a>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "Is the first month really free?", a: "Yes. You get full access for a month with no card required, and you can cancel anytime." },
    { q: "Which classes and exams are covered?", a: "CBSE Classes 6 to 12 across every subject, plus NEET-UG. More exams are on the way." },
    { q: "How does doubt-solving work?", a: "Type or snap a question and Atlas walks you through it step by step, any time of day." },
    { q: "Can parents track progress?", a: "Yes, parents get a simple dashboard with weekly progress and activity." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#fff", padding: "clamp(56px, 8vw, 110px) 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="pz-rv" style={{ textAlign: "center", marginBottom: 32 }}>
          <Eyebrow>Questions</Eyebrow>
          <H2>Good to know.</H2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="pz-rv" style={{ background: CREAM, border: "1px solid var(--pz-line)", borderRadius: 18, overflow: "hidden" }}>
                <button onClick={() => setOpen(on ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "transparent", border: "none", cursor: "pointer", padding: "18px 20px", textAlign: "left", fontSize: 16, fontWeight: 700, color: INK }}>
                  {f.q}
                  <ChevronDown size={20} color={PURPLE} style={{ flex: "none", transition: "transform var(--pz-dur) var(--pz-ease-out)", transform: on ? "rotate(180deg)" : "none" }} />
                </button>
                <div className={`pz-acc ${on ? "pz-open" : ""}`}>
                  <div>
                    <p style={{ margin: 0, padding: "0 20px 18px", color: MUTED, fontSize: 14.5, lineHeight: 1.6 }}>{f.a}</p>
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

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer style={{ background: PURPLE_DEEP, color: "#fff", padding: "clamp(48px, 6vw, 80px) 16px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Ready to make learning fun?</h2>
          <div className="flex items-center" style={{ gap: 12 }}>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "13px 14px 13px 22px", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Get started free
              <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={16} color={AMBER} /></span>
            </a>
            <a href="#" className="pz-cta" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "var(--pz-radius-pill)", padding: "12px 20px", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Log in</a>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24, paddingTop: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 30, filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
            {["Courses", "Pricing", "About us", "Contact", "Privacy"].map((l) => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5, marginTop: 28 }}>© {new Date().getFullYear()} Prepzy by GlobusLearn. Made for CBSE &amp; NEET learners.</p>
      </div>
    </footer>
  );
}

/* ---------------- shared bits ---------------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: AMBER }}>{children}</span>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.025em", color: INK, margin: "12px 0 0" }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: "clamp(15px, 1.5vw, 16.5px)", color: MUTED, margin: "12px auto 0", maxWidth: 480, lineHeight: 1.55 }}>{children}</p>;
}

export function HomeV5() {
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const els = document.querySelectorAll(".pz-rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("pz-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div style={{ background: CREAM }}>
      <Nav />
      <main>
        <Hero reduce={reduce} />
        <Marquee />
        <ExamPicker />
        <Tutors />
        <div className="pz-rv">
          <ExperiencePrepzy />
        </div>
        <Features />
        <FreeBand />
        <Testimonials />
        <ParentCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
