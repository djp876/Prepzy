"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  Play,
  PlayCircle,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const INK = "#1a1a2e";
const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const CREAM = "#fff8ed";
const LAVENDER = "#cfc9f2";

const FLIP_WORDS = ["Smart", "Personalized", "Daily", "Trusted", "Interactive"];

interface ExamChip {
  Icon: LucideIcon;
  label: string;
}

/** Add future exams (JEE, etc.) here — each renders as its own chip. */
const EXAM_CHIPS: ExamChip[] = [
  { Icon: GraduationCap, label: "CBSE Classes 6-12" },
  { Icon: Stethoscope, label: "NEET-UG" },
];

const KEYFRAMES = `
@keyframes pzUpIn{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:translateY(0)}}
@keyframes pzRisePhone{from{opacity:0;transform:translateY(140px)}to{opacity:1;transform:translateY(0)}}
@keyframes pzPopIn{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes pzFloatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.pz-up{animation:pzUpIn .7s cubic-bezier(.16,1,.3,1) both}
.pz-phone{animation:pzRisePhone 1s cubic-bezier(.16,1,.3,1) .45s both}
.pz-pop{animation:pzPopIn .45s cubic-bezier(.34,1.56,.64,1) 1.5s both}
.pz-float{animation:pzFloatY 3.4s ease-in-out infinite}
.pz-float-b{animation:pzFloatY 3.4s ease-in-out 1.2s infinite}
.pz-cta-fill{transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s ease}
.pz-cta-fill:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(255,184,77,.35)}
.pz-cta-ghost{transition:background .18s ease}
.pz-cta-ghost:hover{background:rgba(255,255,255,.08)}
@media (min-height: 600px){.pz-hero-sticky{position:sticky;top:0}}
@media (prefers-reduced-motion: no-preference){
  @supports (animation-timeline: scroll()) {
    @keyframes pzCopyAway{to{opacity:.15;transform:translateY(-48px) scale(.98)}}
    @keyframes pzPhoneZoom{to{transform:translateY(-28px) scale(1.06)}}
    .pz-copy-scrub{animation:pzCopyAway linear both;animation-timeline:scroll(root);animation-range:0 90vh}
    .pz-phone-scrub{animation:pzPhoneZoom linear both;animation-timeline:scroll(root);animation-range:0 100vh}
  }
}
@media (prefers-reduced-motion: reduce){.pz-up,.pz-phone,.pz-pop,.pz-float,.pz-float-b{animation:none;opacity:1;transform:none}}
`;

interface TutorChip {
  initial: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarColor: string;
}

const TUTORS: TutorChip[] = [
  { initial: "R", name: "Ramanujan", role: "Maths tutor", avatarBg: AMBER, avatarColor: INK },
  { initial: "C", name: "Curie", role: "Science tutor", avatarBg: PURPLE, avatarColor: "#fff" },
];

export function Hero() {
  const [flip, setFlip] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setFlip((v) => (v + 1) % FLIP_WORDS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="pz-hero-sticky relative flex w-full flex-col overflow-hidden"
      style={{
        backgroundColor: PURPLE,
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        color: CREAM,
        minHeight: "100dvh",
      }}
    >
      <style>{KEYFRAMES}</style>

      <div
        className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 sm:px-6"
        style={{ paddingTop: "clamp(138px, 22vw, 172px)" }}
      >
        {/* ---- copy stack (fades back as the page scrolls) ---- */}
        <div className="pz-copy-scrub text-center">
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: 10 }}
          >
            {EXAM_CHIPS.map((chip, i) => (
              <span
                key={chip.label}
                className="pz-up"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#ffe9c8",
                  fontSize: "clamp(11px, 3vw, 12.5px)",
                  fontWeight: 600,
                  borderRadius: 999,
                  padding: "8px 16px",
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <chip.Icon size={15} color={AMBER} aria-hidden />
                {chip.label}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontFamily: "var(--pz-font)",
              margin: "clamp(16px, 3.5vw, 22px) 0 0",
              fontWeight: 800,
              color: CREAM,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontSize: "clamp(28px, 8.2vw, 62px)",
            }}
          >
            <span className="pz-up block" style={{ animationDelay: "0.08s" }}>
              Your{" "}
              <span
                key={flip}
                style={{
                  color: AMBER,
                  fontStyle: "italic",
                  display: "inline-block",
                  paddingRight: "0.06em",
                  paddingBottom: "0.04em",
                  animation: "pzFadeWord 400ms ease both",
                }}
              >
                {FLIP_WORDS[flip]}
              </span>
            </span>
            <span className="pz-up block" style={{ animationDelay: "0.18s" }}>
              Learning Companion.
            </span>
          </h1>

          <p
            className="pz-up mx-auto"
            style={{
              animationDelay: "0.28s",
              marginTop: "clamp(14px, 3vw, 18px)",
              maxWidth: 480,
              fontSize: "clamp(15px, 4vw, 17px)",
              lineHeight: 1.55,
              color: LAVENDER,
            }}
          >
            Video lessons, 24×7 doubt-solving and practice with instant
            feedback.
          </p>

          <div
            className="pz-up mx-auto flex w-full max-w-[360px] flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
            style={{ animationDelay: "0.38s", marginTop: "clamp(22px, 4.5vw, 28px)" }}
          >
            <a
              href="#signup"
              className="pz-cta-fill inline-flex items-center justify-center"
              style={{
                gap: 9,
                background: AMBER,
                color: INK,
                borderRadius: 999,
                padding: "15px 28px",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Start free
              <ArrowRight
                className="pz-cta-arrow"
                size={18}
                color={INK}
                strokeWidth={2.5}
                aria-hidden
              />
            </a>
            <a
              href="#demo"
              className="pz-cta-ghost inline-flex items-center justify-center"
              style={{
                gap: 9,
                background: "transparent",
                border: "1.5px solid rgba(255,248,237,0.45)",
                color: CREAM,
                borderRadius: 999,
                padding: "13.5px 24px",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              <PlayCircle size={19} color={CREAM} aria-hidden /> Watch the demo
            </a>
          </div>
        </div>

        {/* ---- stage: rising phone + tutor chips ---- */}
        <div
          id="demo"
          aria-hidden
          className="relative"
          style={{
            height: "clamp(250px, 70vw, 330px)",
            marginTop: "auto",
            paddingTop: "clamp(24px, 5vw, 36px)",
          }}
        >
          {/* tutor chips (desktop / tablet) */}
          {TUTORS.map((t, i) => (
            <div
              key={t.name}
              className={`${i === 0 ? "pz-float" : "pz-float-b"} absolute hidden md:flex`}
              style={{
                ...(i === 0
                  ? { left: "calc(50% - 330px)", top: 36 }
                  : { right: "calc(50% - 330px)", top: 96 }),
                background: "#ffffff",
                borderRadius: 14,
                padding: "10px 14px",
                gap: 10,
                alignItems: "center",
                boxShadow: "0 14px 34px rgba(20,15,60,0.3)",
              }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: t.avatarBg,
                  color: t.avatarColor,
                  fontFamily: "var(--pz-font)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {t.initial}
              </span>
              <span>
                <span
                  className="block"
                  style={{ fontSize: 13, fontWeight: 600, color: INK, lineHeight: 1.2 }}
                >
                  {t.name}
                </span>
                <span
                  className="block"
                  style={{ fontSize: 11.5, fontWeight: 500, color: "#6b6b80", lineHeight: 1.3 }}
                >
                  {t.role}
                </span>
              </span>
            </div>
          ))}

          {/* phone — portrait 9:16 video lives here; poster placeholder for now.
              Layers: positioner > scroll-scrub (zooms on scroll) > bezel (entrance) */}
          <div
            className="absolute"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "clamp(-64px, -8vw, -44px)",
              width: "clamp(212px, 26vw, 252px)",
              height: "clamp(300px, 80vw, 392px)",
            }}
          >
            <div className="pz-phone-scrub h-full w-full">
          <div
            className="pz-phone h-full w-full"
            style={{
              background: "#15122e",
              borderRadius: "36px 36px 0 0",
              padding: "10px 10px 0",
              border: "1px solid rgba(255,255,255,0.18)",
              borderBottom: "none",
            }}
          >
            <div
              className="relative h-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 0%, #2d2566 0%, #241d52 55%, #1d1745 100%)",
                borderRadius: "28px 28px 0 0",
              }}
            >
              {/* TODO: swap this poster block for the real 9:16 demo:
                  <video poster="/demo-poster.jpg" playsInline muted ... /> */}
              <div
                className="absolute"
                style={{
                  top: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 64,
                  height: 17,
                  background: "#15122e",
                  borderRadius: 999,
                }}
              />

              <div
                className="pz-pop absolute"
                style={{
                  top: 38,
                  left: 12,
                  right: 12,
                  background: "#ffffff",
                  borderRadius: 13,
                  padding: "9px 11px",
                  display: "flex",
                  gap: 9,
                  alignItems: "flex-start",
                }}
              >
                <span
                  className="flex flex-shrink-0 items-center justify-center"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 9,
                    background: PURPLE,
                    color: "#fff",
                    fontFamily: "var(--pz-font)",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  A
                </span>
                <span>
                  <span
                    className="block"
                    style={{ fontSize: 11.5, fontWeight: 600, color: INK, lineHeight: 1.3 }}
                  >
                    Atlas · now
                  </span>
                  <span
                    className="block"
                    style={{
                      fontSize: 11.5,
                      fontWeight: 400,
                      color: "#6b6b80",
                      lineHeight: 1.35,
                      marginTop: 1,
                    }}
                  >
                    Doubt cleared. Explained in 3 steps.
                  </span>
                </span>
              </div>

              <div
                className="absolute flex items-center justify-center"
                style={{
                  top: "54%",
                  left: "50%",
                  transform: "translate(-50%, -30%)",
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: AMBER,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                <Play
                  size={26}
                  color={INK}
                  fill={INK}
                  strokeWidth={0}
                  style={{ marginLeft: 3 }}
                />
              </div>

              <span
                className="absolute"
                style={{
                  bottom: 84,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255,255,255,0.14)",
                  color: "#e8e3ff",
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "5px 12px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                Prepzy in 30 seconds
              </span>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
