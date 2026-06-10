"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Star, Menu } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const LAV = "#ece9fb";
const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const GREEN = "#1d9e75";

const ROT_WORDS = ["Personalized", "Smart", "Daily", "Trusted", "Interactive"];

const HERO_PHOTO = "https://images.unsplash.com/photo-1571260899304-425eee4c7efc";
function ph(base: string, w: number, h: number, faces?: boolean): string {
  return `${base}?auto=format&fit=crop&q=80&w=${w}&h=${h}${faces ? "&crop=faces" : ""}`;
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

function HeroVisual({ reduce }: { reduce: boolean }) {
  return (
    <div style={{ position: "relative" }}>
      <div className={reduce ? "" : "pz-tilt"} style={{ position: "relative", borderRadius: 28, overflow: "hidden", border: "6px solid #fff", boxShadow: "0 44px 90px -38px rgba(36,29,82,0.55)", aspectRatio: "4 / 5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ph(HERO_PHOTO, 760, 950)} alt="Student learning with Prepzy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* floating progress card */}
      <div className={reduce ? "" : "pz-float"} style={{ position: "absolute", top: 22, left: -20, background: "#fff", borderRadius: 16, padding: "12px 14px", width: 188, boxShadow: "0 24px 46px -22px rgba(36,29,82,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>Class 10 · Maths</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: GREEN }}>68%</span>
        </div>
        <span style={{ display: "block", height: 7, borderRadius: 7, background: LAV, overflow: "hidden" }}>
          <span style={{ display: "block", height: "100%", width: "68%", borderRadius: 7, background: PURPLE }} />
        </span>
        <span style={{ display: "block", fontSize: 11, color: MUTED, marginTop: 7 }}>Trigonometry · 17 of 25 chapters</span>
      </div>

      {/* floating score chip */}
      <div className={reduce ? "" : "pz-float-2"} style={{ position: "absolute", bottom: 26, right: -16, background: AMBER, borderRadius: 16, padding: "12px 16px", boxShadow: "0 24px 46px -20px rgba(255,184,77,0.9)" }}>
        <span style={{ display: "block", fontSize: 23, fontWeight: 800, color: INK, lineHeight: 1 }}>+18%</span>
        <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#6b4a12", marginTop: 2 }}>avg. score lift</span>
      </div>
    </div>
  );
}

export function HeroV7() {
  const reduce = usePrefersReducedMotion();
  return (
    <div style={{ background: "var(--pz-cream)" }}>
      <Nav />
      <section className="pz-v5-hero" style={{ position: "relative", overflow: "hidden", padding: "clamp(28px, 4vw, 56px) 16px clamp(56px, 8vw, 100px)" }}>
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
              Video lessons, 24×7 doubt-solving and practice that actually sticks. Built for CBSE 6-12 and NEET-UG.
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
                {FACES.map((f) => <img key={f} src={ph(f, 80, 80, true)} alt="Prepzy learner" />)}
              </span>
              <span style={{ fontSize: 13.5, color: MUTED }}>Joined by students across <strong style={{ color: INK }}>India</strong></span>
            </div>
          </div>

          {/* right: real photo + floating proof cards */}
          <div className="pz-pop">
            <HeroVisual reduce={reduce} />
          </div>
        </div>
      </section>
    </div>
  );
}
