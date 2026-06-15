"use client";

/**
 * HomeV13 — the animated v6.
 * Same look as /v6 (warm-gradient editorial, glassy nav, scroll-enlarge video),
 * with the interaction layer from the design spec layered on:
 *  1 staggered hero entrance + masked headline   2 kinetic/magnetic CTA
 *  3 dual living marquee (edge-masked)            4 stat count-ups (Indian grouping)
 *  5 directional staggered reveals                6 draggable testimonials
 *  7 pinned feature scrub (desktop)               8 nav scroll-state + underline micro-interactions
 * Built on motion/react (already in the repo) + CSS. Every motion path has a
 * reduced-motion guard; pinned/drag set-pieces drop to static stacks on mobile.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
} from "motion/react";
import { ArrowUpRight, Play, Star, ChevronDown, Menu } from "lucide-react";
import { ExperiencePrepzy } from "./ExperiencePrepzy";
import { CourseSelector } from "./CourseSelector";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Real hosted demo video (placeholder — swap with a real Prepzy screen-recording)
const VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4";

function ph(base: string, w: number, h?: number, faces?: boolean): string {
  return `${base}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}${faces ? "&crop=faces" : ""}`;
}
const POSTER = "https://images.unsplash.com/photo-1516534775068-ba3e7458af70";
const FACES = [
  "https://images.unsplash.com/photo-1633700199686-bd546d6abb65",
  "https://images.unsplash.com/photo-1684531764645-df295a321850",
  "https://images.unsplash.com/photo-1654650231825-f1c06db0c1ba",
  "https://images.unsplash.com/photo-1599418174475-a8b8141a5750",
  "https://images.unsplash.com/photo-1610021685934-882b5166986d",
];

const SR: React.CSSProperties = { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 };

/* ---------------- shared variants ---------------- */
const vStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };
const vUp: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const vLeft: Variants = { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } } };
const vRight: Variants = { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } } };

/* ---------------- small primitives ---------------- */
function useIsDesktop(): boolean {
  const [d, setD] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 901px)");
    const on = () => setD(m.matches);
    on();
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return d;
}

function Reveal({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={reduce ? undefined : vStagger}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
function Item({ children, variants = vUp, className, style }: { children: ReactNode; variants?: Variants; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} style={style} variants={reduce ? undefined : variants}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d97706" }}>{children}</span>;
}
function H2({ children }: { children: ReactNode }) {
  return <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.025em", color: INK, margin: "12px 0 0" }}>{children}</h2>;
}

/* ---------------- 2 · magnetic + label-roll CTA ---------------- */
interface CTAProps { href: string; label: string; tone?: "purple" | "amber"; big?: boolean; }
function PrimaryCTA({ href, label, tone = "purple", big = false }: CTAProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  const ref = useRef<HTMLAnchorElement>(null);
  const clamp = (n: number) => Math.max(-8, Math.min(8, n));
  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.3));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.3));
  }
  const reset = () => { x.set(0); y.set(0); };
  const purple = tone === "purple";
  return (
    <motion.a
      ref={ref}
      href={href}
      className="pz-cta pz13-cta"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        x: sx, y: sy, display: "inline-flex", alignItems: "center", gap: 10,
        background: purple ? PURPLE : AMBER, color: purple ? "#fff" : INK,
        borderRadius: "var(--pz-radius-pill)",
        padding: big ? "15px 15px 15px 27px" : "13px 14px 13px 24px",
        fontWeight: 700, fontSize: big ? 16.5 : 15.5, textDecoration: "none",
        boxShadow: purple ? "0 18px 32px -14px rgba(61,52,139,0.7)" : "0 14px 26px -14px rgba(245,158,11,0.6)",
      }}
    >
      <span className="pz13-roll" aria-hidden="true">
        <span className="pz13-roll-track">
          <span className="pz13-roll-a">{label}</span>
          <span className="pz13-roll-b">{label}</span>
        </span>
      </span>
      <span style={SR}>{label}</span>
      <span className="pz-cta-ico" style={{ width: big ? 32 : 30, height: big ? 32 : 30, borderRadius: "50%", background: purple ? "rgba(255,255,255,0.22)" : INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <ArrowUpRight size={16} color={purple ? "#fff" : AMBER} />
      </span>
    </motion.a>
  );
}

/* ---------------- nav (8 · scroll-state + underline) ---------------- */
const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"] as const;
function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(1);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % ROT_WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);
  return <span key={i} className="pz-word" style={{ color: AMBER, fontStyle: "italic" }}>{ROT_WORDS[i]}</span>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = ["Learn", "Courses", "Pricing", "About"];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: "16px 16px 0" }}>
      <nav
        className="mx-auto flex w-full items-center justify-between"
        style={{
          position: "relative", maxWidth: 1140,
          background: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
          backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.75)", borderRadius: "var(--pz-radius-pill)",
          padding: "10px 12px 10px 22px",
          boxShadow: scrolled ? "0 18px 40px -18px rgba(36,29,82,0.42), inset 0 1px 1px rgba(255,255,255,0.6)" : "0 14px 34px -18px rgba(36,29,82,0.30), inset 0 1px 1px rgba(255,255,255,0.6)",
          transition: "background var(--pz-dur) var(--pz-ease-out), box-shadow var(--pz-dur) var(--pz-ease-out)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 32, width: "auto", display: "block" }} />
        <ul className="hidden items-center lg:flex" style={{ gap: 30, listStyle: "none", margin: 0, padding: 0, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {links.map((l) => (
            <li key={l}><a href="#" className="pz13-navlink" style={{ fontSize: 15, fontWeight: 600, color: INK, textDecoration: "none" }}>{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center" style={{ gap: 10 }}>
          <a href="#" className="hidden sm:inline-flex pz13-navlink" style={{ color: INK, fontSize: 15, fontWeight: 600, textDecoration: "none", padding: "10px 4px" }}>Log in</a>
          <PrimaryCTA href="#" label="Get started" />
          <button aria-label="Open menu" className="inline-flex items-center justify-center lg:hidden" style={{ width: 42, height: 42, borderRadius: "var(--pz-radius-pill)", background: LAV, border: "none", color: PURPLE, cursor: "pointer" }}><Menu size={20} /></button>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- animated hero background (drifting blobs + motifs + cursor parallax) ---------------- */
function InteractiveBg() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 50;
      ty = (e.clientY / window.innerHeight - 0.5) * 50;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--my", `${cy.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [reduce]);
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div ref={ref} className="pz13-bg" style={{ position: "absolute", inset: 0 }}>
        <span className="pz13-blob pz13-blob-1" />
        <span className="pz13-blob pz13-blob-2" />
        <span className="pz13-blob pz13-blob-3" />
        <span className="pz13-blob pz13-blob-4" />
        <span className="pz13-orb pz13-orb-1" />
        <span className="pz13-orb pz13-orb-2" />
        <span className="pz13-ring pz13-ring-1" />
        <span className="pz13-ring pz13-ring-2" />
      </div>
      <div className="pz13-grain" />
    </div>
  );
}

/* ---------------- 1 · hero (staggered entrance, masked headline) ---------------- */
function Hero() {
  const reduce = useReducedMotion();
  const heroGroup: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
  const headline: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } };
  const line: Variants = { hidden: { y: "115%" }, show: { y: "0%", transition: { duration: 0.7, ease: EASE } } };
  return (
    <section className="pz-v5-hero pz13-hero" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #fff4e2 0%, #ffe7c5 100%)", minHeight: "calc(100svh - 76px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(36px, 6vh, 76px) 16px clamp(44px, 7vh, 84px)" }}>
      <InteractiveBg />
      <motion.div
        style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", textAlign: "center" }}
        variants={reduce ? undefined : heroGroup}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
      >
        <motion.span variants={reduce ? undefined : vUp} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "7px 14px", fontSize: 13, fontWeight: 600, color: PURPLE, boxShadow: "0 8px 20px -12px rgba(36,29,82,0.3)" }}>
          <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill={AMBER} color={AMBER} />)}</span>
          Loved by 2,00,000+ learners
        </motion.span>

        <motion.h1 variants={reduce ? undefined : headline} style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-0.03em", color: INK, margin: "22px 0 0" }}>
          <span className="pz13-mask"><motion.span className="pz13-line" variants={reduce ? undefined : line}>Your <RotatingWord /></motion.span></span>
          <span className="pz13-mask"><motion.span className="pz13-line" variants={reduce ? undefined : line}>Learning Companion.</motion.span></span>
        </motion.h1>

        <motion.p variants={reduce ? undefined : vUp} style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: MUTED, lineHeight: 1.55, margin: "20px auto 0", maxWidth: 520 }}>
          Video lessons, 24×7 doubt-solving and practice that actually sticks. Your friendly study companion for CBSE 6-12 and NEET-UG.
        </motion.p>

        <motion.div variants={reduce ? undefined : vUp} className="flex items-center justify-center" style={{ gap: 14, marginTop: 30, flexWrap: "wrap" }}>
          <PrimaryCTA href="#" label="Get started free" big />
          <a href="#showcase" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "13px 22px 13px 14px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
            <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={14} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} /></span>
            Watch the demo
          </a>
        </motion.div>

        <motion.div variants={reduce ? undefined : vUp} style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 26 }}>
          <span className="pz-avatars">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {FACES.slice(0, 4).map((f) => <img key={f} src={ph(f, 80, 80, true)} alt="Prepzy learner" />)}
          </span>
          <span style={{ fontSize: 13.5, color: MUTED }}>Joined by students across <strong style={{ color: INK }}>India</strong></span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- 3 · dual living marquee ---------------- */
function Marquee() {
  const items = ["90+ textbooks", "3,000+ video lessons", "2L+ practice questions", "1,000+ hours", "Chapter-by-chapter", "Previous-year papers", "Mock exams", "Doubt-solving 24×7"];
  const row = [...items, ...items];
  const cell = (t: string, i: number) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 22, padding: "0 22px", color: "#fff", fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}>
      {t}<span style={{ width: 6, height: 6, borderRadius: "50%", background: AMBER }} />
    </span>
  );
  return (
    <div style={{ background: PURPLE, padding: "22px 0", overflow: "hidden", borderRadius: "44px 44px 0 0", marginTop: -30, position: "relative", zIndex: 3 }}>
      <div className="pz13-marqmask">
        <div className="pz-marq">{row.map(cell)}</div>
        <div className="pz-marq pz13-marq-rev" style={{ marginTop: 12, opacity: 0.5 }}>{row.map(cell)}</div>
      </div>
    </div>
  );
}

/* ---------------- 7 · scroll-enlarge video (kept from v6) ---------------- */
function ScrollVideo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const vref = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) tryPlay(); }), { threshold: 0.2 });
    io.observe(v);
    tryPlay();
    return () => io.disconnect();
  }, []);
  const [cover, setCover] = useState(2.6);
  useEffect(() => {
    const calc = () => {
      const cw = Math.min(620, window.innerWidth * 0.88);
      const ch = cw * 0.5625;
      setCover(Math.max(window.innerWidth / cw, window.innerHeight / ch) * 1.3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, cover]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [24, 0]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.18], [0, -24]);
  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.3], [1, 0]);
  return (
    <div id="showcase" ref={ref} className="pz-sv-track" style={{ marginTop: -30, position: "relative", zIndex: 4 }}>
      <section className="pz-sv-sticky" style={{ borderRadius: "44px 44px 0 0" }}>
        <motion.div style={{ textAlign: "center", padding: "0 20px", marginBottom: "clamp(22px,3vw,38px)", ...(reduce ? {} : { opacity: headOpacity, y: headY }) }}>
          <Eyebrow>Experience Prepzy</Eyebrow>
          <H2>Press play on better grades.</H2>
          <p style={{ fontSize: "clamp(15px,1.5vw,16.5px)", color: MUTED, margin: "12px auto 0", maxWidth: 460, lineHeight: 1.55 }}>Watch a real lesson unfold. Scroll to step inside.</p>
        </motion.div>
        <motion.div className="pz-sv-video" style={reduce ? { width: "min(620px, 88vw)", aspectRatio: "16 / 9", borderRadius: 24 } : { width: "min(620px, 88vw)", aspectRatio: "16 / 9", borderRadius: radius, scale, transformOrigin: "center center" }}>
          <video ref={vref} src={VIDEO} poster={ph(POSTER, 1280, 720)} autoPlay muted loop playsInline preload="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <motion.span style={{ position: "absolute", left: 16, bottom: 14, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(13,8,36,0.6)", color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "6px 13px", fontSize: 12, fontWeight: 600, backdropFilter: "blur(4px)", ...(reduce ? {} : { opacity: labelOpacity }) }}>
            <Play size={12} fill="#fff" color="#fff" /> Prepzy in 30 seconds
          </motion.span>
        </motion.div>
      </section>
    </div>
  );
}

/* ---------------- 4 · stat count-up (Indian grouping) ---------------- */
function indianGroup(n: number): string {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
}
function useCountUp(target: number, run: boolean, dur = 1400): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return val;
}
function Stat({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const reduce = useReducedMotion();
  const n = useCountUp(value, run && !reduce);
  const shown = reduce ? value : n;
  return (
    <Item>
      <div style={{ textAlign: "center", padding: "8px 12px" }}>
        <div style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: PURPLE, lineHeight: 1 }}>{indianGroup(shown)}{suffix}</div>
        <div style={{ fontSize: 14, color: MUTED, marginTop: 8, fontWeight: 600 }}>{label}</div>
      </div>
    </Item>
  );
}
function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const stats = [
    { value: 90, suffix: "+", label: "textbooks" },
    { value: 3000, suffix: "+", label: "video lessons" },
    { value: 200000, suffix: "+", label: "practice questions" },
    { value: 1000, suffix: "+", label: "hours of learning" },
  ];
  return (
    <section ref={ref} style={{ background: CREAM, padding: "clamp(48px,7vw,92px) 16px" }}>
      <Reveal style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, alignItems: "center" }}>
        {stats.map((s) => <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} run={inView} />)}
      </Reveal>
    </section>
  );
}

/* ---------------- 7 · pinned feature scrub (desktop) / stacked (mobile) ---------------- */
const FRAMES = [
  { kicker: "Snap & Solve", title: "Snap a doubt.", body: "Photograph any handwritten or printed problem — Atlas reads even messy handwriting.", chip: "📷 Question captured" },
  { kicker: "Step by step", title: "See every step.", body: "No final-answer dumps. Atlas walks the working, the way a patient tutor would.", chip: "✏️ Step 2 of 4" },
  { kicker: "NCERT-aligned", title: "Land the answer.", body: "Tied to the actual NCERT method and marking scheme — not random internet answers.", chip: "✓ Solved · NCERT pg. 142" },
];
function PhoneMock({ chip, tone }: { chip: string; tone: string }) {
  return (
    <div style={{ width: 230, height: 470, borderRadius: 34, background: "#fff", border: `1px solid var(--pz-line)`, boxShadow: "0 40px 80px -40px rgba(36,29,82,0.5)", padding: 14, position: "relative", overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 22, background: tone, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 14, padding: "12px 14px", fontSize: 13.5, fontWeight: 600, color: INK }}>{chip}</div>
      </div>
    </div>
  );
}
function FeatureShowcase() {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const o0 = useTransform(scrollYProgress, [0.0, 0.28, 0.36], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.30, 0.38, 0.62, 0.70], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.64, 0.72, 1], [0, 1, 1]);
  const opacities = [o0, o1, o2];
  const tones = ["linear-gradient(160deg,#ece9fb,#dcd8f6)", "linear-gradient(160deg,#fff1da,#ffe2b8)", "linear-gradient(160deg,#d9f3ea,#b9e8d7)"];

  if (!desktop || reduce) {
    return (
      <section style={{ background: "#fff", padding: "clamp(48px,8vw,90px) 16px" }}>
        <Reveal style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <Item><Eyebrow>How Atlas helps</Eyebrow></Item>
          <Item><H2>From a photo to a solved problem.</H2></Item>
        </Reveal>
        <div style={{ maxWidth: 520, margin: "28px auto 0", display: "flex", flexDirection: "column", gap: 16 }}>
          {FRAMES.map((f, i) => (
            <Reveal key={f.title} style={{ background: CREAM, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: 22 }}>
              <Item><Eyebrow>{f.kicker}</Eyebrow><h3 style={{ fontSize: 22, fontWeight: 800, color: INK, margin: "8px 0 6px" }}>{f.title}</h3><p style={{ color: MUTED, fontSize: 15, lineHeight: 1.55, margin: 0 }}>{f.body}</p>
                <div style={{ marginTop: 14, display: "inline-block", background: tones[i], borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 600, color: INK }}>{f.chip}</div>
              </Item>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }
  return (
    <div ref={ref} style={{ height: "320vh", position: "relative", background: "#fff" }}>
      <div style={{ position: "sticky", top: 0, minHeight: "100dvh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div style={{ position: "relative", minHeight: 240 }}>
            {FRAMES.map((f, i) => (
              <motion.div key={f.title} style={{ position: "absolute", inset: 0, opacity: opacities[i] }}>
                <Eyebrow>{f.kicker}</Eyebrow>
                <h2 style={{ fontSize: "clamp(32px,3.6vw,52px)", fontWeight: 800, letterSpacing: "-0.03em", color: INK, margin: "10px 0 14px", lineHeight: 1.05 }}>{f.title}</h2>
                <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, maxWidth: 420 }}>{f.body}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", minHeight: 470 }}>
            {FRAMES.map((f, i) => (
              <motion.div key={f.title} style={{ position: "absolute", opacity: opacities[i] }}>
                <PhoneMock chip={f.chip} tone={tones[i]} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 6 · draggable testimonials ---------------- */
const QUOTES = [
  { q: "I stopped dreading maths. Ramanujan explains it like a friend.", n: "Aanya", m: "Class 9 · Pune", img: FACES[0] },
  { q: "My son finally studies on his own. The weekly reports keep me in the loop.", n: "Puneet", m: "Parent · Delhi", img: FACES[3] },
  { q: "The doubt-solving is instant. No more waiting for tuition.", n: "Rahul", m: "Class 11 · Hyderabad", img: FACES[2] },
  { q: "Snap a sum, get the steps. It's basically a tutor in my pocket.", n: "Meera", m: "Class 10 · Kochi", img: FACES[1] },
  { q: "NEET prep finally feels organised. The PYQ papers are gold.", n: "Sahil", m: "NEET · Jaipur", img: FACES[4] },
  { q: "Worth every rupee, and one-time. No monthly surprises.", n: "Lata", m: "Parent · Nagpur", img: FACES[0] },
];
function Testimonials() {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  useEffect(() => {
    const measure = () => {
      const v = viewportRef.current, t = trackRef.current;
      if (!v || !t) return;
      setMaxDrag(Math.min(0, v.offsetWidth - t.scrollWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <section style={{ background: "#fff", padding: "clamp(56px, 8vw, 110px) 0" }}>
      <Reveal style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px", textAlign: "center", marginBottom: 30 }}>
        <Item><Eyebrow>Loved by students &amp; parents</Eyebrow></Item>
        <Item><H2>Real wins, every day.</H2></Item>
        <Item><p style={{ color: MUTED, fontSize: 14.5, marginTop: 10 }}>Drag to explore →</p></Item>
      </Reveal>
      <div ref={viewportRef} className="pz13-tcarousel" style={{ overflowX: reduce ? "auto" : "hidden", overflowY: "hidden", padding: "8px 16px 16px", cursor: reduce ? "auto" : "grab", WebkitOverflowScrolling: "touch" }}>
        <motion.div
          ref={trackRef}
          drag={reduce ? false : "x"}
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.06}
          whileTap={reduce ? undefined : { cursor: "grabbing" }}
          style={{ display: "flex", gap: 16, width: "max-content" }}
        >
          {QUOTES.map((t, i) => (
            <div key={i} className="pz-lift" style={{ width: 320, flex: "none", background: CREAM, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-tile)", padding: 24, display: "flex", flexDirection: "column" }}>
              <span style={{ display: "inline-flex", marginBottom: 12 }}>{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={15} fill={AMBER} color={AMBER} />)}</span>
              <p style={{ fontSize: 16, color: INK, lineHeight: 1.55, margin: "0 0 18px", fontWeight: 500, flex: 1 }}>&ldquo;{t.q}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph(t.img, 96, 96, true)} alt={t.n} draggable={false} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                <span><span style={{ display: "block", fontSize: 14.5, color: INK, fontWeight: 700 }}>{t.n}</span><span style={{ fontSize: 12.5, color: MUTED }}>{t.m}</span></span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- free band ---------------- */
function FreeBand() {
  return (
    <section style={{ padding: "clamp(40px, 6vw, 80px) 16px", background: CREAM }}>
      <Reveal style={{ position: "relative", overflow: "hidden", maxWidth: 1080, margin: "0 auto", background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DEEP})`, borderRadius: "calc(var(--pz-radius-tile) + 8px)", padding: "clamp(34px, 5vw, 60px)", textAlign: "center", boxShadow: "0 40px 80px -40px rgba(36,29,82,0.6)" }}>
        <span className="pz-v5-blob" style={{ width: 240, height: 240, top: -60, right: -40, background: "rgba(255,184,77,0.22)", position: "absolute" }} aria-hidden />
        <Item><h2 style={{ position: "relative", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>Start your first month <span style={{ color: AMBER }}>free</span>.</h2></Item>
        <Item><p style={{ position: "relative", color: "rgba(255,255,255,0.8)", fontSize: 16, margin: "12px auto 0", maxWidth: 440 }}>No card needed. Cancel anytime. Full access to every subject — one-time, no subscription.</p></Item>
        <Item><div className="flex items-center justify-center" style={{ gap: 12, marginTop: 26, flexWrap: "wrap", position: "relative" }}>
          <PrimaryCTA href="#" label="Get started free" tone="amber" big />
          <a href="#" className="pz-cta" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "var(--pz-radius-pill)", padding: "13px 22px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>Log in</a>
        </div></Item>
      </Reveal>
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
        <Reveal style={{ textAlign: "center", marginBottom: 32 }}>
          <Item><Eyebrow>Questions</Eyebrow></Item>
          <Item><H2>Good to know.</H2></Item>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} style={{ background: CREAM, border: "1px solid var(--pz-line)", borderRadius: 18, overflow: "hidden" }}>
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "transparent", border: "none", cursor: "pointer", padding: "18px 20px", textAlign: "left", fontSize: 16, fontWeight: 700, color: INK }}>
                  {f.q}
                  <ChevronDown size={20} color={PURPLE} style={{ flex: "none", transition: "transform var(--pz-dur) var(--pz-ease-out)", transform: on ? "rotate(180deg)" : "none" }} />
                </button>
                <div className={`pz-acc ${on ? "pz-open" : ""}`}>
                  <div><p style={{ margin: 0, padding: "0 20px 18px", color: MUTED, fontSize: 14.5, lineHeight: 1.6, opacity: on ? 1 : 0, transition: "opacity var(--pz-dur) var(--pz-ease-out)" }}>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */
function Footer() {
  return (
    <footer style={{ background: PURPLE_DEEP, color: "#fff", padding: "clamp(48px, 6vw, 80px) 16px 40px", borderRadius: "48px 48px 0 0", marginTop: -28, position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Ready to make learning fun?</h2>
          <div className="flex items-center" style={{ gap: 12 }}>
            <PrimaryCTA href="#" label="Get started free" tone="amber" />
            <a href="#" className="pz-cta" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "var(--pz-radius-pill)", padding: "12px 20px", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Log in</a>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24, paddingTop: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/prepzy-logo.png" alt="Prepzy" style={{ height: 30, filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
            {["Courses", "Pricing", "About us", "Contact", "Privacy"].map((l) => <a key={l} href="#" className="pz13-navlink" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, textDecoration: "none" }}>{l}</a>)}
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5, marginTop: 28 }}>© {new Date().getFullYear()} Prepzy by GlobusLearn. Made for CBSE &amp; NEET learners.</p>
      </div>
    </footer>
  );
}

export function HomeV13() {
  return (
    <div style={{ background: CREAM }}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ScrollVideo />
        <Reveal><ExperiencePrepzy /></Reveal>
        <CourseSelector />
        <StatBand />
        <FeatureShowcase />
        <Testimonials />
        <FreeBand />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
