"use client";

import { useEffect, useState } from "react";
import { Compass, Play, Check } from "lucide-react";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const LAV2 = "#dcd8f6";
const INK = "#1a1a2e";
const GREEN = "#1d9e75";

const STATS: ReadonlyArray<{ to: number; suffix: string; label: string }> = [
  { to: 90, suffix: "+", label: "Textbooks" },
  { to: 300, suffix: "+", label: "Videos" },
  { to: 2, suffix: "L+", label: "Questions" },
  { to: 1000, suffix: "+", label: "Hours content" },
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

function CountUp({ to, suffix, reduce }: { to: number; suffix: string; reduce: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const dur = 1100;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
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

/* One faint orbit ring + a single amber dot (refined, not scribbly) with the
   exam-coverage pills beneath. Scales as we add exams later. */
function Solar({ reduce }: { reduce: boolean }) {
  return (
    <div style={{ position: "relative", width: 160, height: 96, flex: "none" }}>
      <svg viewBox="0 0 160 96" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs>
          <path id="pzHeroOrbit" d="M14,42 a66,22 0 1,0 132,0 a66,22 0 1,0 -132,0" fill="none" />
        </defs>
        <g transform="rotate(-12 80 42)">
          <ellipse cx="80" cy="42" rx="66" ry="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle r="3.4" fill={AMBER} cx="146" cy="42">
            {!reduce && (
              <animateMotion dur="16s" repeatCount="indefinite">
                <mpath href="#pzHeroOrbit" />
              </animateMotion>
            )}
          </circle>
        </g>
      </svg>
      <div style={{ position: "absolute", top: 36, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 2 }}>
        <span style={{ borderRadius: "var(--pz-radius-pill)", padding: "5px 11px", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap", border: `1.5px solid ${AMBER}`, color: AMBER }}>
          CBSE 6-12
        </span>
        <span style={{ borderRadius: "var(--pz-radius-pill)", padding: "5px 11px", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap", background: AMBER, color: INK }}>
          NEET-UG
        </span>
      </div>
    </div>
  );
}

/* A believable "Prepzy · Learn" product window: a video lesson with the play
   CTA + an Atlas reply. Reads as the real product, not a wireframe. */
function ProductWindow() {
  return (
    <div
      style={{
        position: "absolute",
        inset: "20px 20px 52px",
        background: "#fffaf2",
        borderRadius: 14,
        border: "1px solid #f0e8d8",
        boxShadow: "0 18px 40px -22px rgba(0,0,0,0.55)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* window top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderBottom: "1px solid #f1ead9" }}>
        <span style={{ display: "inline-flex", gap: 5 }}>
          {["#e26d6d", "#ffb84d", "#1d9e75"].map((c) => (
            <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--pz-muted)" }}>Prepzy · Learn</span>
        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: PURPLE, background: LAV, borderRadius: "var(--pz-radius-pill)", padding: "3px 9px" }}>
          Class 10
        </span>
      </div>

      {/* window body */}
      <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* video lesson */}
        <div style={{ position: "relative", flex: 1, minHeight: 116, borderRadius: 12, background: "linear-gradient(135deg, #3d348b, #241d52)", overflow: "hidden" }}>
          <span style={{ position: "absolute", top: 10, left: 10, fontSize: 10.5, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.26)", borderRadius: "var(--pz-radius-pill)", padding: "4px 9px" }}>
            Maths · Trigonometry
          </span>
          <span style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10.5, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.34)", borderRadius: "var(--pz-radius-pill)", padding: "3px 8px" }}>
            12:32
          </span>
          <span className="pz-play-pos">
            <a
              href="#"
              aria-label="Play lesson preview"
              className="pz-play"
              style={{ width: 52, height: 52, borderRadius: "50%", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center", color: INK }}
            >
              <Play size={20} fill={INK} style={{ marginLeft: 2 }} />
            </a>
          </span>
        </div>

        {/* Atlas reply */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 26, height: 26, borderRadius: "50%", background: PURPLE, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            A
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: LAV, color: INK, borderRadius: 12, borderTopLeftRadius: 4, padding: "7px 11px", fontSize: 11.5, fontWeight: 500 }}>
            <Check size={13} color={GREEN} strokeWidth={3} />
            Doubt cleared in 3 simple steps
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroV1() {
  const reduce = usePrefersReducedMotion();

  return (
    <section style={{ background: CREAM, padding: "24px 16px 44px" }}>
      <div className="pz-herogrid mx-auto" style={{ maxWidth: 1200 }}>
        {/* PURPLE INTRO BOX */}
        <div
          className="pz-area-box pz-rise"
          style={{
            animationDelay: "0s",
            background: PURPLE,
            borderRadius: "var(--pz-radius-tile)",
            padding: "clamp(24px, 3vw, 34px)",
            color: "#fff",
            boxShadow: "0 30px 60px -30px rgba(36,29,82,0.55)",
            overflow: "hidden",
          }}
        >
          <div className="flex items-start justify-between" style={{ gap: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, flex: 1, minWidth: 0, paddingTop: 6 }}>
              <span style={{ width: 16, height: 2, borderRadius: 2, background: AMBER, flex: "none" }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.01em", color: "rgba(255,255,255,0.86)" }}>
                Watch less. Practice more. Score higher.
              </span>
            </span>
            <Solar reduce={reduce} />
          </div>

          <h1 style={{ fontSize: "clamp(28px, 3.6vw, 41px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "18px 0 0" }}>
            Your <span style={{ color: AMBER }}>personalized</span> learning companion.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5, lineHeight: 1.6, margin: "14px 0 0", maxWidth: 440 }}>
            Guiding every step of your learning journey with personalized support, focused practice, and the confidence to reach your goals.
          </p>

          <div className="flex items-center" style={{ gap: 12, marginTop: 26 }}>
            <a
              href="#"
              className="pz-cta"
              style={{ background: "#fff", color: INK, borderRadius: "var(--pz-radius-pill)", padding: "13px 22px", fontWeight: 600, fontSize: 14.5, textDecoration: "none", boxShadow: "0 8px 18px -10px rgba(0,0,0,0.35)" }}
            >
              Experience Prepzy now
            </a>
            <a
              href="#"
              aria-label="Take the guided tour"
              className="pz-compass"
              style={{ width: 46, height: 46, borderRadius: "var(--pz-radius-pill)", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", color: PURPLE, boxShadow: "0 8px 18px -10px rgba(0,0,0,0.35)" }}
            >
              <Compass size={20} />
            </a>
          </div>
        </div>

        {/* MEDIA TILE — believable Prepzy "Learn" product window */}
        <div
          className="pz-area-media pz-rise"
          style={{
            animationDelay: "0.12s",
            background: PURPLE_DEEP,
            borderRadius: "var(--pz-radius-tile)",
            position: "relative",
            overflow: "hidden",
            minHeight: 320,
            height: "100%",
            boxShadow: "0 30px 60px -30px rgba(36,29,82,0.55)",
          }}
        >
          {/* soft depth glows */}
          <span style={{ position: "absolute", top: -40, right: -30, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,77,0.22), transparent 70%)" }} aria-hidden />
          <span style={{ position: "absolute", bottom: -50, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,107,224,0.28), transparent 70%)" }} aria-hidden />

          <ProductWindow />

          <span style={{ position: "absolute", left: 22, bottom: 16, display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.82)", fontSize: 11.5, fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: AMBER }} />
            See Prepzy in action
          </span>
        </div>

        {/* STAT BENTO */}
        <div className="pz-area-stats pz-rise" style={{ animationDelay: "0.22s", background: LAV2, borderRadius: "var(--pz-radius-tile)", padding: "18px 8px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", borderLeft: i === 0 ? "none" : "1px solid rgba(61,52,139,0.14)", padding: "0 6px" }}>
              <div style={{ fontSize: "clamp(18px, 2.4vw, 23px)", fontWeight: 800, color: PURPLE }}>
                <CountUp to={s.to} suffix={s.suffix} reduce={reduce} />
              </div>
              <div style={{ fontSize: 11.5, color: "var(--pz-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
