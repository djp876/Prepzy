"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Play, Star, ChevronDown, Check, GraduationCap, Stethoscope, Menu } from "lucide-react";
import { ExperiencePrepzy } from "./ExperiencePrepzy";
import { CourseSelector } from "./CourseSelector";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const GREEN = "#1d9e75";

// Real hosted demo video (placeholder — swap with a real Prepzy screen-recording)
const VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4";

// Real photos from Unsplash (verified URLs)
function ph(base: string, w: number, h?: number, faces?: boolean): string {
  return `${base}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}${faces ? "&crop=faces" : ""}`;
}
const HERO_PHOTO = "https://images.unsplash.com/photo-1571260899304-425eee4c7efc";
const POSTER = "https://images.unsplash.com/photo-1516534775068-ba3e7458af70";
const FACES = [
  "https://images.unsplash.com/photo-1633700199686-bd546d6abb65",
  "https://images.unsplash.com/photo-1684531764645-df295a321850",
  "https://images.unsplash.com/photo-1654650231825-f1c06db0c1ba",
  "https://images.unsplash.com/photo-1599418174475-a8b8141a5750",
  "https://images.unsplash.com/photo-1610021685934-882b5166986d",
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: AMBER }}>{children}</span>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.025em", color: INK, margin: "12px 0 0" }}>{children}</h2>;
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
            <li key={l}><a href="#" style={{ fontSize: 14, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? PURPLE : INK, textDecoration: "none" }}>{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center" style={{ gap: 8 }}>
          <a href="#" className="hidden sm:inline-flex" style={{ color: INK, fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px 14px" }}>Log in</a>
          <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "10px 12px 10px 18px", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 20px -10px rgba(255,184,77,0.8)" }}>
            Get started
            <span className="pz-cta-ico" style={{ width: 26, height: 26, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={15} color={AMBER} /></span>
          </a>
          <button aria-label="Open menu" className="inline-flex items-center justify-center lg:hidden" style={{ width: 42, height: 42, borderRadius: "var(--pz-radius-pill)", background: LAV, border: "none", color: PURPLE, cursor: "pointer" }}><Menu size={20} /></button>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- Hero (real photo split) ---------------- */
function Hero({ reduce }: { reduce: boolean }) {
  return (
    <section className="pz-v5-hero">
      <span className="pz-v5-blob" style={{ width: 340, height: 340, top: -90, left: -80, background: LAV, opacity: 0.7 }} aria-hidden />
      <span className="pz-v5-blob" style={{ width: 300, height: 300, bottom: -90, right: -70, background: "#fdeccd", opacity: 0.8 }} aria-hidden />
      <div className="pz-v5-grid">
        {/* left */}
        <div>
          <span className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "7px 14px", fontSize: 13, fontWeight: 600, color: PURPLE, boxShadow: "0 8px 20px -12px rgba(36,29,82,0.3)" }}>
            <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill={AMBER} color={AMBER} />)}</span>
            Loved by 2,00,000+ learners
          </span>
          <h1 className="pz-pop" style={{ fontSize: "clamp(38px, 5.6vw, 66px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, margin: "18px 0 0" }}>
            Learning that finally{" "}
            <span style={{ position: "relative", color: PURPLE, whiteSpace: "nowrap" }}>
              clicks
              <svg viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", left: 0, bottom: "-0.16em", width: "100%", height: "0.34em" }}>
                <path d="M3 13 C 50 4, 150 4, 197 11" fill="none" stroke={AMBER} strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>
          <p className="pz-pop" style={{ fontSize: "clamp(15px, 1.7vw, 18px)", color: MUTED, lineHeight: 1.55, margin: "18px 0 0", maxWidth: 460 }}>
            Video lessons, 24×7 doubt-solving and practice that actually sticks. Your friendly study companion for CBSE 6-12 and NEET-UG.
          </p>
          <div className="pz-pop flex items-center" style={{ gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: INK, borderRadius: "var(--pz-radius-pill)", padding: "14px 14px 14px 24px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 18px 32px -14px rgba(255,184,77,0.85)" }}>
              Get started free
              <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: INK, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={17} color={AMBER} /></span>
            </a>
            <a href="#showcase" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "13px 22px 13px 14px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
              <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={14} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} /></span>
              Watch the demo
            </a>
          </div>
          <div className="pz-pop" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <span className="pz-avatars">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {FACES.slice(0, 4).map((f) => <img key={f} src={ph(f, 80, 80, true)} alt="Prepzy learner" />)}
            </span>
            <span style={{ fontSize: 13.5, color: MUTED }}>Joined by students across <strong style={{ color: INK }}>India</strong></span>
          </div>
        </div>

        {/* right: real photo + floating cards */}
        <div className="pz-pop" style={{ position: "relative" }}>
          <div className={reduce ? "" : "pz-tilt"} style={{ position: "relative", borderRadius: 28, overflow: "hidden", border: "6px solid #fff", boxShadow: "0 40px 80px -36px rgba(36,29,82,0.5)", aspectRatio: "4 / 5" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ph(HERO_PHOTO, 800, 1000)} alt="Student learning with Prepzy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {/* floating UI card: Atlas reply */}
          <div className={reduce ? "" : "pz-float"} style={{ position: "absolute", top: 22, left: -18, background: "#fff", borderRadius: 16, padding: "11px 13px", display: "flex", gap: 9, alignItems: "center", boxShadow: "0 22px 44px -22px rgba(36,29,82,0.55)", maxWidth: 230 }}>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: PURPLE_DEEP, color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>A</span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: INK }}>Atlas</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: GREEN, fontWeight: 600 }}><Check size={13} strokeWidth={3} /> Doubt cleared in 3 steps</span>
            </span>
          </div>
          {/* floating stat chip */}
          <div className={reduce ? "" : "pz-float-2"} style={{ position: "absolute", bottom: 26, right: -16, background: AMBER, borderRadius: 16, padding: "12px 16px", boxShadow: "0 22px 44px -20px rgba(255,184,77,0.9)" }}>
            <span style={{ display: "block", fontSize: 22, fontWeight: 800, color: INK, lineHeight: 1 }}>+18%</span>
            <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#6b4a12", marginTop: 2 }}>avg. score lift</span>
          </div>
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
    <div style={{ background: PURPLE, padding: "15px 0", overflow: "hidden" }}>
      <div className="pz-marq">
        {row.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 22, padding: "0 22px", color: "#fff", fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}>
            {t}
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: AMBER }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Scroll-enlarge video showcase (REAL video) ---------------- */
function ScrollVideo() {
  const reduce = usePrefersReducedMotion();
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
    <div id="showcase" ref={ref} className="pz-sv-track">
      <section className="pz-sv-sticky">
        <motion.div style={{ textAlign: "center", padding: "0 20px", marginBottom: "clamp(22px,3vw,38px)", ...(reduce ? {} : { opacity: headOpacity, y: headY }) }}>
          <Eyebrow>Experience Prepzy</Eyebrow>
          <H2>Press play on better grades.</H2>
          <p style={{ fontSize: "clamp(15px,1.5vw,16.5px)", color: MUTED, margin: "12px auto 0", maxWidth: 460, lineHeight: 1.55 }}>Watch a real lesson unfold. Scroll to step inside.</p>
        </motion.div>

        <motion.div
          className="pz-sv-video"
          style={
            reduce
              ? { width: "min(620px, 88vw)", aspectRatio: "16 / 9", borderRadius: 24 }
              : { width: "min(620px, 88vw)", aspectRatio: "16 / 9", borderRadius: radius, scale, transformOrigin: "center center" }
          }
        >
          <video ref={vref} src={VIDEO} poster={ph(POSTER, 1280, 720)} autoPlay muted loop playsInline preload="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <motion.span style={{ position: "absolute", left: 16, bottom: 14, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(13,8,36,0.6)", color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "6px 13px", fontSize: 12, fontWeight: 600, backdropFilter: "blur(4px)", ...(reduce ? {} : { opacity: labelOpacity }) }}>
            <Play size={12} fill="#fff" color="#fff" /> Prepzy in 30 seconds
          </motion.span>
        </motion.div>
      </section>
    </div>
  );
}

/* ---------------- Testimonials (real faces) ---------------- */
function Testimonials() {
  const quotes = [
    { q: "I stopped dreading maths. Ramanujan explains it like a friend.", n: "Aanya, Class 9", img: FACES[0] },
    { q: "My son finally studies on his own. The reports keep me in the loop.", n: "Puneet, parent", img: FACES[3] },
    { q: "The doubt-solving is instant. No more waiting for tuition.", n: "Rahul, Class 11", img: FACES[2] },
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
              <p style={{ fontSize: 15.5, color: INK, lineHeight: 1.55, margin: "0 0 18px", fontWeight: 500 }}>&ldquo;{t.q}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph(t.img, 96, 96, true)} alt={t.n} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: 13.5, color: MUTED, fontWeight: 600 }}>{t.n}</span>
              </div>
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
    <section style={{ padding: "clamp(40px, 6vw, 80px) 16px", background: CREAM }}>
      <div className="pz-rv" style={{ position: "relative", overflow: "hidden", maxWidth: 1080, margin: "0 auto", background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DEEP})`, borderRadius: "calc(var(--pz-radius-tile) + 8px)", padding: "clamp(34px, 5vw, 60px)", textAlign: "center", boxShadow: "0 40px 80px -40px rgba(36,29,82,0.6)" }}>
        <span className="pz-v5-blob" style={{ width: 240, height: 240, top: -60, right: -40, background: "rgba(255,184,77,0.22)" }} aria-hidden />
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
                  <div><p style={{ margin: 0, padding: "0 20px 18px", color: MUTED, fontSize: 14.5, lineHeight: 1.6 }}>{f.a}</p></div>
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
            {["Courses", "Pricing", "About us", "Contact", "Privacy"].map((l) => <a key={l} href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, textDecoration: "none" }}>{l}</a>)}
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5, marginTop: 28 }}>© {new Date().getFullYear()} Prepzy by GlobusLearn. Made for CBSE &amp; NEET learners.</p>
      </div>
    </footer>
  );
}

export function HomeV6() {
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const els = document.querySelectorAll(".pz-rv");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("pz-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div style={{ background: CREAM }}>
      <Nav />
      <main>
        <Hero reduce={reduce} />
        <Marquee />
        <ScrollVideo />
        <div className="pz-rv"><ExperiencePrepzy /></div>
        <CourseSelector />
        <Testimonials />
        <FreeBand />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
