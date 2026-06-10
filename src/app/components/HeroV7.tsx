"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Star, Check, Send, Menu, Sparkles } from "lucide-react";

const PURPLE = "#3d348b";
const PURPLE_DEEP = "#241d52";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const GREEN = "#1d9e75";

const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"];

function ph(base: string, w: number, h: number): string {
  return `${base}?auto=format&fit=crop&q=80&w=${w}&h=${h}&crop=faces`;
}
const FACES = [
  "https://images.unsplash.com/photo-1633700199686-bd546d6abb65",
  "https://images.unsplash.com/photo-1684531764645-df295a321850",
  "https://images.unsplash.com/photo-1654650231825-f1c06db0c1ba",
  "https://images.unsplash.com/photo-1599418174475-a8b8141a5750",
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

interface Msg {
  role: "atlas" | "user" | "step";
  text: string;
}

const SAMPLES: ReadonlyArray<{ q: string; steps: string[] }> = [
  { q: "Solve 2x + 5 = 15", steps: ["Subtract 5 from both sides → 2x = 10", "Divide both sides by 2 → x = 5", "Answer: x = 5"] },
  { q: "What is photosynthesis?", steps: ["Plants turn sunlight, water and CO₂ into food.", "It happens in the chloroplasts, the green parts of a leaf.", "Output: glucose for energy, plus oxygen."] },
  { q: "Explain Newton's second law", steps: ["Force = mass × acceleration (F = ma).", "More force on an object means more acceleration.", "More mass means less acceleration for the same force."] },
];

function AskAtlas() {
  const reduce = usePrefersReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "atlas", text: "Hi, I'm Atlas. Ask me any doubt and I'll explain it step by step." }]);
  const [typing, setTyping] = useState(false);
  const [val, setVal] = useState("");
  const timers = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const ask = (q: string, steps: string[]) => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setTyping(true);
    const stepDelay = reduce ? 0 : 480;
    steps.forEach((s, i) => {
      const t = window.setTimeout(() => {
        setMsgs((m) => [...m, { role: "step", text: s }]);
        if (i === steps.length - 1) setTyping(false);
      }, stepDelay * (i + 1) + 300);
      timers.current.push(t);
    });
  };

  const submit = () => {
    const q = val.trim();
    if (!q) return;
    setVal("");
    ask(q, ["Note what's given and what's being asked.", "Pick the concept or formula that fits.", "Work through it step by step, then check the answer."]);
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 24, boxShadow: "0 40px 80px -36px rgba(36,29,82,0.45)", overflow: "hidden" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--pz-line)" }}>
        <span style={{ position: "relative", width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DEEP})`, color: "#fff", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
          A
          <span style={{ position: "absolute", right: -1, bottom: -1, width: 11, height: 11, borderRadius: "50%", background: GREEN, border: "2px solid #fff" }} />
        </span>
        <span>
          <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: INK, lineHeight: 1.1 }}>Atlas</span>
          <span style={{ display: "block", fontSize: 11.5, color: GREEN, fontWeight: 600 }}>Online · answers in seconds</span>
        </span>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: PURPLE, background: LAV, borderRadius: "var(--pz-radius-pill)", padding: "4px 10px" }}>
          <Sparkles size={12} /> Live demo
        </span>
      </div>

      {/* messages */}
      <div ref={scroller} style={{ height: 248, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => {
          if (m.role === "user") {
            return (
              <div key={i} style={{ alignSelf: "flex-end", maxWidth: "82%", background: PURPLE, color: "#fff", borderRadius: 14, borderBottomRightRadius: 4, padding: "9px 13px", fontSize: 13.5, fontWeight: 500 }}>{m.text}</div>
            );
          }
          if (m.role === "step") {
            return (
              <div key={i} className="pz-pop" style={{ alignSelf: "flex-start", maxWidth: "88%", display: "flex", gap: 9, alignItems: "flex-start", background: "#fff", border: "1px solid var(--pz-line)", borderRadius: 14, borderBottomLeftRadius: 4, padding: "9px 12px" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#e7f6ef", color: GREEN, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: 1 }}><Check size={12} strokeWidth={3} /></span>
                <span style={{ fontSize: 13.5, color: INK, lineHeight: 1.5 }}>{m.text}</span>
              </div>
            );
          }
          return (
            <div key={i} style={{ alignSelf: "flex-start", maxWidth: "88%", background: LAV, color: INK, borderRadius: 14, borderBottomLeftRadius: 4, padding: "9px 13px", fontSize: 13.5, lineHeight: 1.5 }}>{m.text}</div>
          );
        })}
        {typing && (
          <div style={{ alignSelf: "flex-start", display: "inline-flex", gap: 4, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: 14, padding: "11px 14px" }}>
            <span className="pz-dot" style={{ animationDelay: "0s" }} />
            <span className="pz-dot" style={{ animationDelay: "0.15s" }} />
            <span className="pz-dot" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>

      {/* chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, padding: "0 16px 12px" }}>
        {SAMPLES.map((s) => (
          <button key={s.q} onClick={() => ask(s.q, s.steps)} className="pz-chip" style={{ border: "1px solid #e7dfcd", background: "#fff", color: INK, borderRadius: "var(--pz-radius-pill)", padding: "7px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{s.q}</button>
        ))}
      </div>

      {/* input */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderTop: "1px solid var(--pz-line)" }}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder="Type any doubt…"
          aria-label="Type any doubt"
          style={{ flex: 1, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "10px 14px", fontSize: 14, color: INK, background: "#fff", outline: "none" }}
        />
        <button onClick={submit} aria-label="Send" className="pz-cta" style={{ width: 42, height: 42, flex: "none", borderRadius: "50%", background: PURPLE, color: "#fff", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Send size={17} />
        </button>
      </div>
    </div>
  );
}

export function HeroV7() {
  return (
    <div style={{ background: "var(--pz-cream)" }}>
      <Nav />
      <section className="pz-v5-hero" style={{ position: "relative", overflow: "hidden", padding: "clamp(28px, 4vw, 56px) 16px clamp(52px, 7vw, 96px)" }}>
        <AuroraBg />
        <div className="pz-v5-grid" style={{ position: "relative", zIndex: 2 }}>
          {/* left */}
          <div>
            <span className="pz-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(6px)", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "7px 14px", fontSize: 13, fontWeight: 600, color: PURPLE }}>
              <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill={AMBER} color={AMBER} />)}</span>
              Loved by 2,00,000+ learners
            </span>
            <h1 className="pz-pop" style={{ fontSize: "clamp(38px, 5.4vw, 62px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: INK, margin: "18px 0 0" }}>
              Your <RotatingWord words={ROT_WORDS} color={AMBER} />
              <br />
              Learning Companion.
            </h1>
            <p className="pz-pop" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: MUTED, lineHeight: 1.55, margin: "18px 0 0", maxWidth: 460 }}>
              Ask any doubt and get a clear, step-by-step answer — any subject, any time. Built for CBSE 6-12 and NEET-UG.
            </p>
            <div className="pz-pop flex items-center" style={{ gap: 14, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "14px 14px 14px 26px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 18px 32px -14px rgba(61,52,139,0.7)" }}>
                Get started free
                <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={17} color="#fff" /></span>
              </a>
              <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: INK, border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "13px 22px 13px 14px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
                <span className="pz-cta-ico" style={{ width: 32, height: 32, borderRadius: "50%", background: LAV, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={14} fill={PURPLE} color={PURPLE} style={{ marginLeft: 2 }} /></span>
                Watch the demo
              </a>
            </div>
            <div className="pz-pop" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <span className="pz-avatars">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {FACES.map((f) => <img key={f} src={ph(f, 80, 80)} alt="Prepzy learner" />)}
              </span>
              <span style={{ fontSize: 13.5, color: MUTED }}>Joined by students across <strong style={{ color: INK }}>India</strong></span>
            </div>
          </div>

          {/* right: interactive Ask Atlas demo */}
          <div className="pz-pop">
            <AskAtlas />
          </div>
        </div>
      </section>
    </div>
  );
}
