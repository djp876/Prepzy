"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Play, Star, Menu, ChevronDown } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";

const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"];
const VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4";
const POSTER = "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=900&h=1600";

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
      tx = (e.clientX / window.innerWidth - 0.5) * 64;
      ty = (e.clientY / window.innerHeight - 0.5) * 64;
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
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);
  return (
    <div ref={ref} aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div className="pz-aurora" style={{ position: "absolute", inset: "-25%", background: "radial-gradient(38% 48% at calc(22% + var(--ax,0px)) calc(22% + var(--ay,0px)), rgba(124,107,224,0.34), transparent 70%), radial-gradient(42% 52% at calc(82% + var(--ax,0px)) calc(24% - var(--ay,0px)), rgba(255,184,77,0.36), transparent 70%), radial-gradient(48% 58% at calc(76% - var(--ax,0px)) calc(82% + var(--ay,0px)), rgba(214,109,109,0.24), transparent 70%), radial-gradient(46% 56% at calc(16% - var(--ax,0px)) calc(82% - var(--ay,0px)), rgba(120,200,170,0.26), transparent 72%)", filter: "blur(48px)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "160px 160px", opacity: 0.05, mixBlendMode: "multiply" }} />
    </div>
  );
}

function Nav() {
  const links = ["Learn", "Courses", "Pricing", "About"];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: "16px 16px 0" }}>
      <nav className="mx-auto flex w-full items-center justify-between" style={{ position: "relative", maxWidth: 1140, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 22px", boxShadow: "0 14px 34px -18px rgba(36,29,82,0.34), inset 0 1px 1px rgba(255,255,255,0.6)" }}>
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

export function HeroV8() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const vref = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const calc = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) tryPlay(); }), { threshold: 0.2 });
    io.observe(v);
    tryPlay();
    return () => io.disconnect();
  }, []);

  const phoneW = Math.min(296, vp.w * 0.72);
  const phoneH = phoneW * 2;
  const cover = Math.max(vp.w / phoneW, vp.h / phoneH) * 1.16;

  const scale = useTransform(scrollYProgress, [0, 0.72], [1, cover]);
  const radius = useTransform(scrollYProgress, [0, 0.55], [34, 0]);
  const bezelOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -26]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={ref} className="pz-v4-track">
      <section style={{ position: "sticky", top: 0, minHeight: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--pz-cream)", padding: "clamp(32px, 6vh, 72px) 16px clamp(36px, 6vh, 72px)" }}>
        <AuroraBg />

        {/* text */}
        <motion.div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760, ...(reduce ? {} : { opacity: textOpacity, y: textY }) }}>
          <span className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(6px)", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "7px 14px", fontSize: 13, fontWeight: 600, color: PURPLE }}>
            <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill={AMBER} color={AMBER} />)}</span>
            Loved by 2,00,000+ learners
          </span>
          <h1 className="pz-pop" style={{ fontSize: "clamp(36px, 5.6vw, 64px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, margin: "16px 0 0" }}>
            Your <RotatingWord words={ROT_WORDS} color={AMBER} />
            <br />
            Learning Companion.
          </h1>
          <p className="pz-pop" style={{ fontSize: "clamp(15px, 1.6vw, 17px)", color: MUTED, lineHeight: 1.55, margin: "14px auto 0", maxWidth: 480 }}>
            Video lessons, 24×7 doubt-solving and practice that actually sticks. Built for CBSE 6-12 and NEET-UG.
          </p>
          <div className="pz-pop flex items-center justify-center" style={{ gap: 14, marginTop: 26, flexWrap: "wrap" }}>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "13px 14px 13px 24px", fontWeight: 700, fontSize: 15.5, textDecoration: "none", boxShadow: "0 18px 32px -14px rgba(61,52,139,0.7)" }}>
              Get started free
              <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={16} color="#fff" /></span>
            </a>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "12px 20px 12px 13px", fontWeight: 600, fontSize: 15.5, textDecoration: "none" }}>
              <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={13} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} /></span>
              Watch the demo
            </a>
          </div>
        </motion.div>

        {/* phone that scales to full-bleed video */}
        <motion.div
          style={
            reduce
              ? { position: "relative", zIndex: 2, width: phoneW, aspectRatio: "1 / 2", marginTop: "clamp(28px, 4vh, 48px)" }
              : { position: "relative", zIndex: 2, width: phoneW, aspectRatio: "1 / 2", marginTop: "clamp(28px, 4vh, 48px)", scale, transformOrigin: "center center" }
          }
        >
          <motion.div style={{ position: "absolute", inset: 0, overflow: "hidden", ...(reduce ? { borderRadius: 34 } : { borderRadius: radius }) }}>
            <video ref={vref} src={VIDEO} poster={POSTER} autoPlay muted loop playsInline preload="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>

          {/* bezel + notch (fades as it expands) */}
          <motion.div style={{ position: "absolute", inset: 0, border: "7px solid #15102e", pointerEvents: "none", boxShadow: "0 50px 110px -44px rgba(8,4,32,0.85)", ...(reduce ? { borderRadius: 40, opacity: 1 } : { borderRadius: radius, opacity: bezelOpacity }) }}>
            <span style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 78, height: 7, borderRadius: 6, background: "#15102e" }} />
          </motion.div>

          {/* video autoplays — no overlay */}
        </motion.div>

        {!reduce && (
          <motion.span style={{ position: "absolute", bottom: "5%", left: 0, right: 0, textAlign: "center", zIndex: 1, opacity: hintOpacity, color: MUTED, fontSize: 12.5, fontWeight: 500 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>Scroll to watch <ChevronDown size={15} /></span>
          </motion.span>
        )}
      </section>
    </div>
  );
}
