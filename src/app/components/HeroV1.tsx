"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Compass, Play, Info } from "lucide-react";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV2 = "#dcd8f6";
const INK = "#1a1a2e";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { to: 90, suffix: "+", label: "Textbooks" },
  { to: 300, suffix: "+", label: "Videos" },
  { to: 2, suffix: "L+", label: "Questions" },
  { to: 1000, suffix: "+", label: "Hours Content" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

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

function Solar({ reduce }: { reduce: boolean | null }) {
  return (
    <div style={{ position: "relative", width: 172, height: 92, flex: "none" }}>
      <svg viewBox="0 0 172 92" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs>
          <path id="pzHeroOrbit" d="M16,46 a70,26 0 1,0 140,0 a70,26 0 1,0 -140,0" fill="none" />
        </defs>
        <g transform="rotate(-15 86 46)">
          <ellipse cx="86" cy="46" rx="70" ry="26" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="1" />
          <ellipse cx="86" cy="46" rx="48" ry="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <circle r="3.5" fill="#ffb84d" cx="156" cy="46">
            {!reduce && (
              <animateMotion dur="14s" repeatCount="indefinite">
                <mpath href="#pzHeroOrbit" />
              </animateMotion>
            )}
          </circle>
          <circle r="2.8" fill="#ffffff" cx="16" cy="46">
            {!reduce && (
              <animateMotion dur="20s" begin="-7s" repeatCount="indefinite">
                <mpath href="#pzHeroOrbit" />
              </animateMotion>
            )}
          </circle>
          <circle r="2.4" fill="#ffd9a0" cx="86" cy="20">
            {!reduce && (
              <animateMotion dur="11s" begin="-3s" repeatCount="indefinite">
                <mpath href="#pzHeroOrbit" />
              </animateMotion>
            )}
          </circle>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 2,
        }}
      >
        <span style={{ borderRadius: "var(--pz-radius-pill)", padding: "5px 11px", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap", border: `1.5px solid ${AMBER}`, color: AMBER }}>
          6-12 CBSE
        </span>
        <span style={{ borderRadius: "var(--pz-radius-pill)", padding: "5px 11px", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap", background: AMBER, color: INK }}>
          NEET-UG
        </span>
      </div>
    </div>
  );
}

export function HeroV1() {
  const reduce = useReducedMotion();

  // Robust per-element entrance: animate on mount with a small stagger delay.
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: EASE, delay },
        };

  return (
    <section style={{ background: CREAM, padding: "20px 16px 40px" }}>
      <div className="pz-herogrid mx-auto" style={{ maxWidth: 1200 }}>
        {/* PURPLE INTRO BOX */}
        <motion.div
          className="pz-area-box"
          {...reveal(0)}
          style={{
            background: PURPLE,
            borderRadius: "var(--pz-radius-tile)",
            padding: "clamp(24px, 3vw, 32px)",
            color: "#fff",
            boxShadow: "0 30px 60px -30px rgba(36,29,82,0.55)",
            overflow: "hidden",
          }}
        >
          <div className="flex items-start justify-between" style={{ gap: 10 }}>
            <motion.span {...reveal(0.12)} style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.92, maxWidth: 240 }}>
              Watch Less. Practice More. Score Higher.
            </motion.span>
            <motion.div {...reveal(0.18)}>
              <Solar reduce={reduce} />
            </motion.div>
          </div>

          <motion.h1
            {...reveal(0.2)}
            style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "16px 0 0" }}
          >
            Your <span style={{ color: AMBER }}>Personalized</span> Learning Companion.
          </motion.h1>

          <motion.p
            {...reveal(0.28)}
            style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5, lineHeight: 1.6, margin: "14px 0 0", maxWidth: 430 }}
          >
            Guiding every step of your learning journey with personalized support, focused practice, and the confidence to achieve your goals.
          </motion.p>

          <motion.div {...reveal(0.36)} className="flex items-center" style={{ gap: 12, marginTop: 24 }}>
            <a
              href="#"
              style={{ background: "#fff", color: INK, borderRadius: "var(--pz-radius-pill)", padding: "13px 22px", fontWeight: 600, fontSize: 14.5, textDecoration: "none", boxShadow: "0 8px 18px -10px rgba(0,0,0,0.35)" }}
            >
              Experience Prepzy now
            </a>
            <a
              href="#"
              aria-label="Take the guided tour"
              className="pz-compass"
              style={{ width: 46, height: 46, borderRadius: "var(--pz-radius-pill)", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", color: PURPLE, boxShadow: "0 8px 18px -10px rgba(0,0,0,0.35)", transition: "transform 0.6s var(--pz-ease-out)" }}
            >
              <Compass size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* MEDIA TILE */}
        <motion.div
          className="pz-area-media"
          {...reveal(0.2)}
          style={{
            background: PURPLE_DEEP,
            borderRadius: "var(--pz-radius-tile)",
            position: "relative",
            overflow: "hidden",
            minHeight: 300,
            height: "100%",
            boxShadow: "0 30px 60px -30px rgba(36,29,82,0.55)",
          }}
        >
          <div style={{ position: "absolute", inset: "22px 22px 64px", background: "#fbf7ef", borderRadius: 12, padding: 10, display: "flex", gap: 7 }}>
            <div style={{ width: "30%", background: "#efedfb", borderRadius: 7, display: "flex", flexDirection: "column", gap: 5, padding: 7 }}>
              {[70, 90, 55, 80].map((w, i) => (
                <span key={i} style={{ height: 7, borderRadius: 3, background: "#d7d2ef", width: `${w}%` }} />
              ))}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ height: 9, borderRadius: 4, background: "#ffe2b0", width: "60%" }} />
              <span style={{ height: 9, borderRadius: 4, background: "#e7e3f4", width: "85%" }} />
              <span style={{ flex: 1, background: "#efedfb", borderRadius: 8 }} />
            </div>
          </div>

          <motion.a
            href="#"
            aria-label="Watch course overview"
            animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
            transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.12 }}
            style={{ position: "absolute", top: "42%", left: "50%", x: "-50%", y: "-50%", width: 60, height: 60, borderRadius: "var(--pz-radius-pill)", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center", color: INK, boxShadow: "0 10px 26px -8px rgba(217,119,6,0.6)" }}
          >
            <Play size={22} fill={INK} />
          </motion.a>

          <span style={{ position: "absolute", left: 18, bottom: 16, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "6px 13px", fontSize: 11.5, fontWeight: 500 }}>
            <Info size={13} /> Watch course overview
          </span>
        </motion.div>

        {/* STAT BENTO */}
        <motion.div
          className="pz-area-stats"
          {...reveal(0.3)}
          style={{ background: LAV2, borderRadius: "var(--pz-radius-tile)", padding: "18px 14px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(18px, 2.4vw, 23px)", fontWeight: 800, color: PURPLE }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 11.5, color: "var(--pz-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
