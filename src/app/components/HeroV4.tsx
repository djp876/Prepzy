"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { GraduationCap, Stethoscope, Play, ChevronDown } from "lucide-react";

const AMBER = "#ffb84d";
const INK = "#1a1a2e";
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

  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const calc = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const cardW = Math.min(520, vp.w * 0.86);
  const cardH = cardW * 0.62;

  // expansion: card -> exact viewport size (guaranteed full-bleed)
  const vidW = useTransform(scrollYProgress, [0, 0.7], [cardW, vp.w]);
  const vidH = useTransform(scrollYProgress, [0, 0.7], [cardH, vp.h]);
  const vidRadius = useTransform(scrollYProgress, [0, 0.5], [22, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, -26]);
  const decOpacity = useTransform(scrollYProgress, [0.03, 0.2], [1, 0]);
  const barW = useTransform(scrollYProgress, [0.05, 0.66], ["7%", "100%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const [sec, setSec] = useState(reduce ? 12 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setSec(Math.min(30, Math.round((v / 0.66) * 30)));
  });
  const tc = `0:${String(Math.min(30, sec)).padStart(2, "0")}`;

  const staticCard: React.CSSProperties = { width: cardW, height: cardH, borderRadius: 22 };

  return (
    <div ref={ref} className="pz-v4-track">
      <section className="pz-v4-sticky" style={{ position: "sticky" }}>
        <div className="pz-dotgrid" aria-hidden />
        <span className="pz-glow" aria-hidden style={{ top: -90, left: "10%", width: 340, height: 340, background: "radial-gradient(circle, rgba(255,184,77,0.22), transparent 70%)" }} />
        <span className="pz-glow" aria-hidden style={{ bottom: -130, right: "6%", width: 380, height: 380, background: "radial-gradient(circle, rgba(140,120,240,0.28), transparent 70%)" }} />

        {/* text block (absolute, upper) */}
        <motion.div
          style={{ position: "absolute", top: "13%", left: 0, right: 0, zIndex: 3, padding: "0 20px", textAlign: "center", ...(reduce ? {} : { opacity: textOpacity, y: textY }) }}
        >
          <div className="pz-rise" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="pz-glasspill">
              <GraduationCap size={16} color={AMBER} strokeWidth={2} /> CBSE Classes 6-12
            </span>
            <span className="pz-glasspill">
              <Stethoscope size={16} color={AMBER} strokeWidth={2} /> NEET-UG
            </span>
          </div>
          <h1 className="pz-rise" style={{ fontSize: "clamp(38px, 6.2vw, 68px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#fff", margin: "20px 0 0" }}>
            Your <span style={{ color: AMBER, fontStyle: "italic" }}>Daily</span>
            <br />
            Learning Companion.
          </h1>
          <p className="pz-rise" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.55, margin: "16px auto 0", maxWidth: 500 }}>
            Video lessons, 24×7 doubt-solving and practice with instant feedback.
          </p>
        </motion.div>

        {/* expanding video (absolute, centered) */}
        <motion.div
          className="pz-v4-video"
          style={
            reduce
              ? { position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", zIndex: 1, ...staticCard }
              : { position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", zIndex: 1, width: vidW, height: vidH, borderRadius: vidRadius }
          }
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, #3d348b 0%, #2a2160 55%, #1d1646 100%)" }}>
            <motion.span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(26px,3.4vw,38px)", fontWeight: 800, color: "rgba(255,255,255,0.06)", ...(reduce ? {} : { opacity: decOpacity }) }}>
              2x + 5 = 15
            </motion.span>

            <motion.div style={{ position: "absolute", top: 16, left: 14, ...(reduce ? {} : { opacity: decOpacity }) }}>
              <div style={{ background: "#fff", borderRadius: 13, padding: "9px 11px", display: "flex", gap: 9, alignItems: "center", boxShadow: "0 14px 30px -16px rgba(0,0,0,0.5)", maxWidth: 270 }}>
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
          <motion.span style={{ position: "absolute", bottom: "6%", left: 0, right: 0, textAlign: "center", zIndex: 3, opacity: hintOpacity, color: "rgba(255,255,255,0.6)", fontSize: 12.5, fontWeight: 500 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              Scroll to play <ChevronDown size={15} />
            </span>
          </motion.span>
        )}
      </section>
    </div>
  );
}
