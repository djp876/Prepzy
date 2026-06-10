"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { GraduationCap, Stethoscope, Play, ChevronDown } from "lucide-react";

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

export function HeroV4() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [cover, setCover] = useState(3);
  useEffect(() => {
    const calc = () => {
      const cw = Math.min(520, window.innerWidth * 0.86);
      const ch = cw * 0.62;
      setCover(Math.max(window.innerWidth / cw, window.innerHeight / ch) * 1.16);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const vidScale = useTransform(scrollYProgress, [0, 0.72], [1, cover]);
  const vidRadius = useTransform(scrollYProgress, [0, 0.5], [22, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -28]);
  const decOpacity = useTransform(scrollYProgress, [0.04, 0.3], [1, 0]);
  const barW = useTransform(scrollYProgress, [0.04, 0.68], ["7%", "100%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const [sec, setSec] = useState(reduce ? 12 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setSec(Math.min(30, Math.round((v / 0.68) * 30)));
  });
  const tc = `0:${String(Math.min(30, sec)).padStart(2, "0")}`;

  return (
    <div ref={ref} className="pz-v4-track">
      <section className="pz-v4-sticky">
        <div className="pz-dotgrid" aria-hidden />
        <span className="pz-glow" aria-hidden style={{ top: -90, left: "10%", width: 340, height: 340, background: "radial-gradient(circle, rgba(255,184,77,0.24), transparent 70%)" }} />
        <span className="pz-glow" aria-hidden style={{ bottom: -130, right: "6%", width: 380, height: 380, background: "radial-gradient(circle, rgba(140,120,240,0.3), transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px" }}>
          {/* text block (fades out as video expands) */}
          <motion.div style={reduce ? {} : { opacity: textOpacity, y: textY }}>
            <div className="pz-rise" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="pz-glasspill">
                <GraduationCap size={16} color={AMBER} strokeWidth={2} /> CBSE Classes 6-12
              </span>
              <span className="pz-glasspill">
                <Stethoscope size={16} color={AMBER} strokeWidth={2} /> NEET-UG
              </span>
            </div>
            <h1 className="pz-rise" style={{ fontSize: "clamp(38px, 6.4vw, 70px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#fff", margin: "20px 0 0" }}>
              Your <span style={{ color: AMBER, fontStyle: "italic" }}>Daily</span>
              <br />
              Learning Companion.
            </h1>
            <p className="pz-rise" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.55, margin: "16px auto 0", maxWidth: 500 }}>
              Video lessons, 24×7 doubt-solving and practice with instant feedback.
            </p>
          </motion.div>

          {/* expanding video */}
          <motion.div
            className="pz-v4-video"
            style={
              reduce
                ? { width: "min(520px, 86vw)", aspectRatio: "520 / 322", borderRadius: 22, marginTop: 34 }
                : { width: "min(520px, 86vw)", aspectRatio: "520 / 322", borderRadius: vidRadius, scale: vidScale, transformOrigin: "center center", marginTop: "clamp(30px, 5vw, 54px)" }
            }
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, #3d348b 0%, #2a2160 55%, #1d1646 100%)" }}>
              <motion.span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "rgba(255,255,255,0.07)", ...(reduce ? {} : { opacity: decOpacity }) }}>
                2x + 5 = 15
              </motion.span>

              <motion.div style={{ position: "absolute", top: 16, left: 14, right: 14, ...(reduce ? {} : { opacity: decOpacity }) }}>
                <div style={{ background: "#fff", borderRadius: 13, padding: "9px 11px", display: "flex", gap: 9, alignItems: "center", boxShadow: "0 14px 30px -16px rgba(0,0,0,0.5)", maxWidth: 300 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: PURPLE_DEEP, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>A</span>
                  <span style={{ minWidth: 0, textAlign: "left" }}>
                    <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: INK, lineHeight: 1.2 }}>Atlas · now</span>
                    <span style={{ display: "block", fontSize: 11, color: "#6b6b80", lineHeight: 1.3 }}>Doubt cleared. Explained in 3 steps.</span>
                  </span>
                </div>
              </motion.div>

              <span className="pz-play-pos" style={{ zIndex: 3 }}>
                <span className="pz-play" style={{ width: 60, height: 60, borderRadius: "50%", background: AMBER, display: "flex", alignItems: "center", justifyContent: "center", color: INK }}>
                  <Play size={23} fill={INK} style={{ marginLeft: 3 }} />
                </span>
              </span>

              <motion.div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 16px 14px", background: "linear-gradient(0deg, rgba(13,8,36,0.9), transparent)", ...(reduce ? {} : { opacity: decOpacity }) }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "4px 11px", fontSize: 11, fontWeight: 600 }}>
                  Prepzy in 30 seconds
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 10 }}>
                  <span style={{ position: "relative", flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
                    <motion.span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: reduce ? "40%" : barW, background: AMBER, borderRadius: 4 }} />
                  </span>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontVariantNumeric: "tabular-nums" }}>{tc} / 0:30</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* scroll hint */}
          {!reduce && (
            <motion.span style={{ opacity: hintOpacity, marginTop: 22, display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.6)", fontSize: 12.5, fontWeight: 500 }}>
              Scroll to play <ChevronDown size={15} />
            </motion.span>
          )}
        </div>
      </section>
    </div>
  );
}
