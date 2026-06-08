"use client";

import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";

const INK = "#1a1a2e";
const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const ORANGE = "#d97706";
const MUTED = "#6b6b80";

const TAGS = ["Quiz-first learning", "Affordable Price", "Smart Tutor"];

const AMBIENCE = `
@media (prefers-reduced-motion: no-preference){
  @keyframes pzDriftA{from{transform:translate(0,0)}to{transform:translate(36px,24px)}}
  @keyframes pzDriftB{from{transform:translate(0,0)}to{transform:translate(-32px,-20px)}}
  .pz-blob-a{animation:pzDriftA 22s ease-in-out infinite alternate}
  .pz-blob-b{animation:pzDriftB 27s ease-in-out infinite alternate}
  @supports (animation-timeline: view()){
    @keyframes pzStoryTint{from{background-color:#ffffff}to{background-color:#fdf7ee}}
    .pz-story-tint{animation:pzStoryTint linear both;animation-timeline:view();animation-range:entry 0% cover 45%}
  }
}
`;

export function About() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="about"
      className="pz-story-tint relative w-full overflow-hidden"
      style={{
        background: "#ffffff",
        marginTop: "calc(-1 * clamp(28px, 5vw, 52px))",
        zIndex: 0,
      }}
    >
      <style>{AMBIENCE}</style>
      <div
        aria-hidden
        className="pz-blob-a absolute"
        style={{
          top: -130,
          left: -150,
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,184,77,0.12), transparent 64%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="pz-blob-b absolute"
        style={{
          bottom: -160,
          right: -140,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(61,52,139,0.07), transparent 64%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="relative mx-auto w-full max-w-[1160px] px-5 sm:px-6"
        style={{
          paddingTop: "calc(clamp(24px, 4vw, 40px) + clamp(28px, 5vw, 52px))",
          paddingBottom: "calc(clamp(24px, 4vw, 40px) + clamp(28px, 5vw, 52px))",
        }}
      >
      {/* Teaser / toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="prepzy-story"
        className="mx-auto flex w-full flex-col items-center"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "22px 0",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--pz-font)",
            fontWeight: 700,
            fontSize: "clamp(22px, 5vw, 30px)",
            color: PURPLE,
            letterSpacing: "-0.01em",
          }}
        >
          The Story of Prepzy
        </span>
        <span
          className="flex items-center"
          style={{
            gap: 7,
            marginTop: 6,
            fontSize: 13.5,
            color: PURPLE,
            fontWeight: 600,
            background: "#ffffff",
            border: "1px solid rgba(61,52,139,0.18)",
            borderRadius: 999,
            padding: "10px 20px",
            boxShadow: "0 6px 18px rgba(61,52,139,0.08)",
          }}
        >
          {open ? "Close the story" : "Read the story"}
          <ChevronDown
            size={15}
            color={PURPLE}
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform .3s ease",
            }}
          />
        </span>
      </button>

      {/* Expanding content (grid-rows 0fr -> 1fr animates height) */}
      <div
        id="prepzy-story"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows .42s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
            style={{ paddingTop: "clamp(20px, 4vw, 36px)" }}
          >
            {/* Left — story */}
            <div className="text-center lg:text-left">
              <h2
                style={{
                  fontFamily: "var(--pz-font)",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 5vw, 38px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                  color: INK,
                  margin: 0,
                }}
              >
                Great education shouldn&apos;t{" "}
                <span style={{ color: ORANGE }}>cost</span> more than a
                family&apos;s groceries.
              </h2>
              <p
                className="mx-auto lg:mx-0"
                style={{
                  marginTop: 18,
                  maxWidth: 520,
                  fontSize: "clamp(15px, 4vw, 16px)",
                  lineHeight: 1.6,
                  color: MUTED,
                }}
              >
                Dr. Shivendu started Prepzy with a simple belief: India
                doesn&apos;t lack brilliant students. It lacks affordable
                learning tools that truly help them learn.
              </p>
              <p
                className="mx-auto lg:mx-0"
                style={{
                  marginTop: 14,
                  maxWidth: 520,
                  fontSize: "clamp(15px, 4vw, 16px)",
                  lineHeight: 1.6,
                  color: MUTED,
                }}
              >
                Watching a 45-minute lecture isn&apos;t real learning. Real
                learning begins when students attempt a question, make mistakes,
                and understand why. That&apos;s why Prepzy is built around
                practice, feedback, and active learning, not endless videos.
              </p>
              <a
                href="#story"
                className="inline-flex items-center"
                style={{
                  marginTop: 24,
                  gap: 8,
                  background: PURPLE,
                  color: "#fff",
                  borderRadius: 12,
                  padding: "12px 22px",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Read more
                <ChevronDown
                  size={16}
                  color="#fff"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </a>
            </div>

            {/* Right — founder card */}
            <div
              style={{
                background: PURPLE,
                borderRadius: 24,
                padding: "clamp(24px, 4vw, 32px)",
                color: "#fff",
                boxShadow: "0 18px 44px rgba(61,52,139,0.28)",
              }}
            >
              <div className="flex items-center" style={{ gap: 14 }}>
                <div
                  className="flex flex-shrink-0 items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontFamily: "var(--pz-font)",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#fff",
                  }}
                  aria-label="Dr. Shivendu S. photo placeholder"
                >
                  SS
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>
                    Dr. Shivendu S.
                  </p>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 13.5,
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.4,
                    }}
                  >
                    Founder &amp; CEO · GlobusLearn Services India
                  </p>
                </div>
              </div>

              <Quote
                size={30}
                color={AMBER}
                fill={AMBER}
                style={{ marginTop: 22 }}
              />
              <p
                style={{
                  marginTop: 10,
                  fontSize: "clamp(17px, 4.4vw, 20px)",
                  lineHeight: 1.45,
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#fff",
                }}
              >
                We didn&apos;t build{" "}
                <strong style={{ fontWeight: 700 }}>Prepzy</strong> for toppers.
                We built it for students who never got a fair shot.
              </p>

              <div className="flex flex-wrap" style={{ gap: 8, marginTop: 24 }}>
                {TAGS.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: 999,
                      padding: "6px 13px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
