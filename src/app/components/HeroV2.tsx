"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight, Lightbulb } from "lucide-react";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const INK = "#1a1a2e";

interface Subject {
  tab: string;
  tutor: string;
  role: string;
  concept: string;
  hint: string;
  monogram: string;
}

const SUBJECTS: ReadonlyArray<Subject> = [
  { tab: "Maths", tutor: "Ramanujan", role: "Your Maths tutor", concept: "Quadratic equations", hint: "Factor it, then solve for x in two clean steps.", monogram: "R" },
  { tab: "Science", tutor: "Curie", role: "Your Science tutor", concept: "Chemical reactions", hint: "Balance the equation, then name the reaction type.", monogram: "C" },
  { tab: "Social", tutor: "Gargi", role: "Your Social Science tutor", concept: "The Mughal era", hint: "Lay out the timeline, then link cause to effect.", monogram: "G" },
  { tab: "English", tutor: "Atlas", role: "Your English & Hindi guide", concept: "Tenses made simple", hint: "Catch the time cue, then pick the right tense.", monogram: "A" },
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

function TutorPanel() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const interacted = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (interacted.current) return;
      setActive((i) => (i + 1) % SUBJECTS.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduce]);

  const pick = (i: number) => {
    interacted.current = true;
    setActive(i);
  };

  const s = SUBJECTS[active];

  return (
    <div style={{ position: "relative" }}>
      {/* warm depth glows */}
      <span aria-hidden style={{ position: "absolute", top: -28, right: -10, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,77,0.30), transparent 70%)", filter: "blur(2px)" }} />
      <span aria-hidden style={{ position: "absolute", bottom: -34, left: -22, width: 190, height: 190, borderRadius: "50%", background: "radial-gradient(circle, rgba(61,52,139,0.18), transparent 70%)" }} />

      <div
        style={{
          position: "relative",
          background: "#fffaf2",
          border: "1px solid #f0e8d8",
          borderRadius: "var(--pz-radius-tile)",
          boxShadow: "0 30px 60px -32px rgba(36,29,82,0.5)",
          padding: "clamp(18px, 2.4vw, 24px)",
        }}
      >
        {/* subject tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
          {SUBJECTS.map((sub, i) => {
            const on = i === active;
            return (
              <button
                key={sub.tab}
                onClick={() => pick(i)}
                className="pz-tab"
                aria-pressed={on}
                style={{
                  border: on ? `1px solid ${PURPLE}` : "1px solid #ece4d3",
                  background: on ? PURPLE : "#fff",
                  color: on ? "#fff" : INK,
                  borderRadius: "var(--pz-radius-pill)",
                  padding: "8px 15px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {sub.tab}
              </button>
            );
          })}
        </div>

        {/* crossfading preview */}
        <div key={active} className="pz-fade">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ position: "relative", flex: "none" }}>
              <span
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DEEP})`,
                  color: "#fff",
                  fontSize: 23,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 0 3px rgba(255,184,77,0.4)`,
                }}
              >
                {s.monogram}
              </span>
            </span>
            <span>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, lineHeight: 1.1 }}>{s.tutor}</div>
              <div style={{ fontSize: 12.5, color: "var(--pz-muted)", marginTop: 3 }}>{s.role}</div>
            </span>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: AMBER, textTransform: "uppercase" }}>Now teaching</div>
            <div style={{ fontSize: "clamp(19px, 2.2vw, 23px)", fontWeight: 800, color: PURPLE, marginTop: 4, letterSpacing: "-0.01em" }}>{s.concept}</div>
          </div>

          <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 9, background: LAV, borderRadius: 13, borderTopLeftRadius: 4, padding: "11px 14px", marginTop: 14, maxWidth: 380 }}>
            <Lightbulb size={16} color={PURPLE} style={{ flex: "none", marginTop: 1 }} />
            <span style={{ fontSize: 13.5, color: INK, lineHeight: 1.5 }}>{s.hint}</span>
          </div>
        </div>

        {/* footer: watch + progress */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "10px 16px", fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}>
            <Play size={15} fill={INK} /> Watch the lesson
          </a>
          <span style={{ display: "inline-flex", gap: 6 }}>
            {SUBJECTS.map((sub, i) => (
              <span key={sub.tab} style={{ width: i === active ? 18 : 7, height: 7, borderRadius: 7, background: i === active ? AMBER : "#e4dcc9", transition: "width var(--pz-dur) var(--pz-ease-out), background var(--pz-dur) var(--pz-ease-out)" }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroV2() {
  return (
    <section style={{ background: CREAM, padding: "clamp(28px, 5vw, 64px) 16px clamp(40px, 6vw, 72px)" }}>
      <div className="pz-herov2 mx-auto" style={{ maxWidth: 1180 }}>
        {/* LEFT — copy */}
        <div className="pz-rise">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "6px 13px 6px 11px", fontSize: 12.5, fontWeight: 600, color: PURPLE }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: AMBER }} />
            Smart study companion
          </span>

          <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>
            A personal tutor for <span style={{ color: AMBER }}>every subject.</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 1.5vw, 16.5px)", color: "var(--pz-muted)", lineHeight: 1.6, margin: "18px 0 0", maxWidth: 480 }}>
            Concepts explained your way, doubts solved step by step, and practice that targets your weak spots. Built for CBSE 6-12 and NEET-UG.
          </p>

          <div className="flex items-center" style={{ gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#" className="pz-cta" style={{ background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "14px 24px", fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 14px 26px -14px rgba(61,52,139,0.7)" }}>
              Start free month
            </a>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "13px 20px", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              See how it works <ArrowRight size={16} />
            </a>
          </div>

          <p style={{ fontSize: 13, color: "var(--pz-muted)", marginTop: 22 }}>
            Join <strong style={{ color: INK, fontWeight: 700 }}>2,00,000+</strong> learners across CBSE and NEET.
          </p>
        </div>

        {/* RIGHT — interactive tutor panel */}
        <div className="pz-rise" style={{ animationDelay: "0.12s" }}>
          <TutorPanel />
        </div>
      </div>
    </section>
  );
}
