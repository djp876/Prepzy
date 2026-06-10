"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import type { MotionValue } from "motion/react";
import { GraduationCap, Stethoscope, Play, ArrowUpRight } from "lucide-react";

const AMBER = "#ffb84d";
const INK = "#1a1a2e";
const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";

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

function PhoneStage({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const scale = useTransform(p, [0, 0.6], [0.96, 1.06]);
  const phoneY = useTransform(p, [0, 1], [8, -30]);
  const barW = useTransform(p, [0.05, 0.82], ["6%", "100%"]);
  const lX = useTransform(p, [0, 1], [0, -52]);
  const lY = useTransform(p, [0, 1], [0, -12]);
  const lRot = useTransform(p, [0, 1], [-4, -7]);
  const rX = useTransform(p, [0, 1], [0, 52]);
  const rY = useTransform(p, [0, 1], [0, 14]);
  const rRot = useTransform(p, [0, 1], [4, 7]);

  const [sec, setSec] = useState(reduce ? 13 : 0);
  useMotionValueEvent(p, "change", (v) => {
    if (!reduce) setSec(Math.min(30, Math.round(v * 30)));
  });
  const tc = `0:${String(sec).padStart(2, "0")}`;

  return (
    <div style={{ position: "relative", width: "min(312px, 80vw)", margin: "0 auto" }}>
      {/* Floating tutor cards (absolute, animated on scroll) */}
      <motion.div className="pz-floatcard" style={reduce ? { left: -150, top: "22%" } : { left: -150, top: "22%", x: lX, y: lY, rotate: lRot }}>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: AMBER, color: INK, fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>R</span>
        <span>
          <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: INK, lineHeight: 1.15 }}>Ramanujan</span>
          <span style={{ display: "block", fontSize: 11.5, color: "#6b6b80", lineHeight: 1.2 }}>Maths tutor</span>
        </span>
      </motion.div>

      <motion.div className="pz-floatcard" style={reduce ? { right: -150, top: "52%" } : { right: -150, top: "52%", x: rX, y: rY, rotate: rRot }}>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: PURPLE, color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>C</span>
        <span>
          <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: INK, lineHeight: 1.15 }}>Curie</span>
          <span style={{ display: "block", fontSize: 11.5, color: "#6b6b80", lineHeight: 1.2 }}>Science tutor</span>
        </span>
      </motion.div>

      {/* Phone (double-bezel) */}
      <motion.div
        style={{
          ...(reduce ? {} : { scale, y: phoneY }),
          position: "relative",
          zIndex: 2,
          background: "linear-gradient(160deg, #1a1438, #0f0a26)",
          borderRadius: "2.6rem",
          padding: 8,
          boxShadow: "0 60px 130px -50px rgba(8,4,32,0.9), inset 0 1px 1px rgba(255,255,255,0.1)",
        }}
      >
        {/* notch */}
        <span style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 92, height: 7, borderRadius: 6, background: "rgba(255,255,255,0.14)", zIndex: 4 }} />

        {/* screen */}
        <div style={{ position: "relative", height: "min(54vh, 432px)", borderRadius: "2.15rem", overflow: "hidden", background: "linear-gradient(165deg, #3d348b 0%, #2a2160 55%, #1d1646 100%)" }}>
          {/* faint lesson watermark */}
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800, color: "rgba(255,255,255,0.07)", letterSpacing: "0.02em" }}>2x + 5 = 15</span>

          {/* Atlas chat card */}
          <div style={{ position: "absolute", top: 40, left: 14, right: 14, background: "#fff", borderRadius: 14, padding: "10px 12px", display: "flex", gap: 9, alignItems: "center", boxShadow: "0 14px 30px -14px rgba(0,0,0,0.5)" }}>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: PURPLE_DEEP, color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>A</span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: INK, lineHeight: 1.2 }}>Atlas · now</span>
              <span style={{ display: "block", fontSize: 11.5, color: "#6b6b80", lineHeight: 1.3 }}>Doubt cleared. Explained in 3 steps.</span>
            </span>
          </div>

          {/* play */}
          <span className="pz-play-pos" style={{ zIndex: 3 }}>
            <span className="pz-play" style={{ width: 62, height: 62, borderRadius: "50%", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center", color: INK }}>
              <Play size={24} fill={INK} style={{ marginLeft: 3 }} />
            </span>
          </span>

          {/* bottom video bar */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 16px 16px", background: "linear-gradient(0deg, rgba(13,8,36,0.9), transparent)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "4px 11px", fontSize: 11, fontWeight: 600 }}>
              Prepzy in 30 seconds
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 11 }}>
              <span style={{ position: "relative", flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
                <motion.span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: reduce ? "45%" : barW, background: AMBER, borderRadius: 4 }} />
              </span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontVariantNumeric: "tabular-nums" }}>{tc} / 0:30</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroV3() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="pz-herov3-track">
      <section className="pz-herov3-sticky">
        <div className="pz-dotgrid" aria-hidden />
        <span className="pz-glow" aria-hidden style={{ top: -80, left: "12%", width: 320, height: 320, background: "radial-gradient(circle, rgba(255,184,77,0.26), transparent 70%)" }} />
        <span className="pz-glow" aria-hidden style={{ bottom: -120, right: "8%", width: 360, height: 360, background: "radial-gradient(circle, rgba(140,120,240,0.32), transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1080, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          {/* exam pills */}
          <div className="pz-rise" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="pz-glasspill">
              <GraduationCap size={16} color={AMBER} strokeWidth={2} /> CBSE Classes 6-12
            </span>
            <span className="pz-glasspill">
              <Stethoscope size={16} color={AMBER} strokeWidth={2} /> NEET-UG
            </span>
          </div>

          {/* headline */}
          <h1 className="pz-rise" style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff", margin: "22px 0 0" }}>
            Your <span style={{ color: AMBER, fontStyle: "italic" }}>Daily</span>
            <br />
            Learning Companion.
          </h1>

          <p className="pz-rise" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(15px, 1.7vw, 18px)", lineHeight: 1.55, margin: "18px auto 0", maxWidth: 520 }}>
            Video lessons, 24×7 doubt-solving and practice with instant feedback.
          </p>

          {/* CTAs */}
          <div className="pz-rise" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "11px 12px 11px 24px", fontWeight: 700, fontSize: 15.5, textDecoration: "none", boxShadow: "0 16px 30px -14px rgba(255,184,77,0.65)" }}>
              Start free
              <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowUpRight size={17} color={AMBER} />
              </span>
            </a>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "var(--pz-radius-pill)", padding: "11px 22px 11px 12px", fontWeight: 600, fontSize: 15.5, textDecoration: "none" }}>
              <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Play size={15} fill="#fff" color="#fff" style={{ marginLeft: 2 }} />
              </span>
              Watch the demo
            </a>
          </div>

          {/* phone stage */}
          <div style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
            <PhoneStage p={scrollYProgress} reduce={reduce} />
          </div>
        </div>
      </section>
    </div>
  );
}
