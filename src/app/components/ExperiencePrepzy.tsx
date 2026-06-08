"use client";

import { useEffect, useRef, useState } from "react";
import {
  List,
  Mic,
  Paperclip,
  Play,
  Send,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";
import {
  DEMO,
  LESSON_RAIL,
  TUTOR_STYLE,
  type Doubt,
  type Tutor,
} from "./experienceDemoData";

function lessonTutor(subject: string): Tutor {
  if (subject === "Mathematics") return "Ramanujan";
  if (["Science", "Physics", "Chemistry", "Biology"].includes(subject)) {
    return "Curie";
  }
  return "Gargi";
}

function subjectTagColor(subject: string): string {
  const tutor = lessonTutor(subject);
  if (tutor === "Ramanujan") return "#d97706";
  if (tutor === "Curie") return "#3d348b";
  return "#1a1a2e";
}

const INK = "#1a1a2e";
const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const ORANGE = "#d97706";
const MUTED = "#6b6b80";

/** Add future classes/streams here — the rail renders whatever isn't selected. */
const CLASSES = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 (PCM)",
  "Class 11 (PCB)",
  "Class 11 (Commerce)",
  "Class 11 (Humanities)",
  "Class 12 (PCM)",
  "Class 12 (PCB)",
  "Class 12 (Commerce)",
  "Class 12 (Humanities)",
];

const TABS = ["Solve My Doubt", "Visual Learning", "Smart Assessment"] as const;
type Tab = (typeof TABS)[number];
type Exam = "cbse" | "neet";

type Panel =
  | { kind: "idle" }
  | { kind: "doubt"; doubt: Doubt }
  | { kind: "nudge"; text: string };

function SignupNudge({ text }: { text: string }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center text-center"
      style={{ gap: 12, padding: "28px 22px", background: "#fffdf8" }}
    >
      <Sparkles size={22} color={ORANGE} aria-hidden />
      <p
        style={{
          margin: 0,
          fontFamily: "var(--pz-font)",
          fontSize: 14,
          fontWeight: 500,
          color: "#6b6b80",
          maxWidth: 300,
          lineHeight: 1.55,
        }}
      >
        {text}
      </p>
      <a
        href="#signup"
        style={{
          background: AMBER,
          color: INK,
          fontFamily: "var(--pz-font)",
          fontSize: 14,
          fontWeight: 700,
          borderRadius: 999,
          padding: "11px 24px",
          textDecoration: "none",
        }}
      >
        Start free
      </a>
    </div>
  );
}

const STYLES = `
.pz-xrail{scrollbar-width:none}
.pz-xrail::-webkit-scrollbar{display:none}
.pz-chipbtn{transition:transform .18s ease,background .18s ease}
.pz-chipbtn:hover{background:#ffffff}
.pz-chipbtn:active{transform:scale(.96)}
@keyframes pzStepIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.pz-step{animation:pzStepIn .45s ease both}
.pz-tabwrap{display:flex;flex-direction:column;gap:8px;width:100%;background:#fff8ed;border:1.5px solid rgba(255,184,77,.75);border-radius:20px;padding:10px}
.pz-tabbtn{border:none;cursor:pointer;border-radius:13px;padding:13px 20px;font-family:var(--pz-font);font-size:14px;font-weight:600;text-align:center;white-space:nowrap;transition:background .25s ease,color .25s ease}
.pz-tabbtn-off{background:#f1effb;color:#4a4a5e}
.pz-tabbtn-on{background:#3d348b;color:#ffffff}
@media (min-width:640px){
.pz-tabwrap{flex-direction:row;width:auto;background:#f1effb;border:none;border-radius:999px;padding:5px;gap:4px}
.pz-tabbtn{border-radius:999px;padding:10px 20px;font-size:13.5px}
.pz-tabbtn-off{background:transparent}
}
`;

export function ExperiencePrepzy() {
  const [exam, setExam] = useState<Exam>("cbse");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [activeTab, setActiveTab] = useState<Tab>("Solve My Doubt");
  const [draft, setDraft] = useState("");
  const [panel, setPanel] = useState<Panel>({ kind: "idle" });
  const [lessonPlayed, setLessonPlayed] = useState(false);
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>({});
  const [lessonIdx, setLessonIdx] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [qChosen, setQChosen] = useState<number | null>(null);
  const [qLocked, setQLocked] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | null>(null);

  const demoKey = exam === "neet" ? "NEET-UG" : selectedClass;
  const demo = DEMO[demoKey];

  /* fresh demo state whenever the exam or class changes */
  useEffect(() => {
    setPanel({ kind: "idle" });
    setLessonPlayed(false);
    setQuizPicks({});
    setLessonIdx(0);
    setQIndex(0);
    setQChosen(null);
    setQLocked(false);
    setDraft("");
  }, [demoKey]);

  /* center-snap picker: whichever chip settles in the middle is selected */
  const selectCentered = () => {
    const el = pickerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best: string | null = null;
    let bestDist = Infinity;
    el.querySelectorAll<HTMLButtonElement>("[data-class]").forEach((b) => {
      const c = b.offsetLeft + b.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = b.dataset.class ?? null;
      }
    });
    if (best) setSelectedClass((prev) => (best && best !== prev ? best : prev));
  };

  const onPickerScroll = () => {
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(selectCentered, 110);
  };

  const selectAndCenter = (c: string) => {
    setSelectedClass(c);
    const btn = pickerRef.current?.querySelector<HTMLButtonElement>(
      `[data-class="${CSS.escape(c)}"]`,
    );
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    btn?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const el = pickerRef.current;
    if (!el) return;
    const btn = el.querySelector<HTMLButtonElement>(
      `[data-class="${CSS.escape("Class 10")}"]`,
    );
    if (btn) {
      el.scrollLeft = btn.offsetLeft + btn.offsetWidth / 2 - el.clientWidth / 2;
    }
    return () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, []);

  const isCbse = exam === "cbse";

  return (
    <section
      id="experience"
      className="relative w-full"
      style={{
        background: "#fff8ed",
        marginTop: "calc(-1 * clamp(28px, 5vw, 52px))",
        zIndex: 1,
        borderBottomLeftRadius: "clamp(28px, 5vw, 52px)",
        borderBottomRightRadius: "clamp(28px, 5vw, 52px)",
        boxShadow: "0 36px 60px -28px rgba(26,26,46,0.22)",
      }}
    >
      <style>{STYLES}</style>
      <div
        className="mx-auto w-full max-w-[1160px] px-5 sm:px-6"
        style={{
          paddingTop: "calc(clamp(52px, 9vw, 80px) + clamp(28px, 5vw, 52px))",
          paddingBottom: "clamp(64px, 10vw, 96px)",
        }}
      >
        {/* heading */}
        <Reveal>
          <div className="text-center">
            <p
              style={{
                margin: 0,
                fontSize: "clamp(13px, 3.4vw, 15px)",
                fontWeight: 600,
                color: ORANGE,
              }}
            >
              No signup needed
            </p>
            <h2
              style={{
                fontFamily: "var(--pz-font)",
                fontWeight: 700,
                fontSize: "clamp(26px, 5.8vw, 38px)",
                letterSpacing: "-0.015em",
                color: PURPLE,
                margin: "8px 0 0",
              }}
            >
              See Prepzy in action.
            </h2>
            <p
              className="mx-auto"
              style={{
                margin: "10px auto 0",
                maxWidth: 520,
                fontSize: "clamp(14px, 3.6vw, 16.5px)",
                lineHeight: 1.55,
                color: MUTED,
              }}
            >
              Interactive videos, smart quizzes and mock exams. Try it all
              before you sign up.
            </p>

            {/* exam toggle */}
            <div
              className="mx-auto inline-flex"
              style={{
                marginTop: 22,
                background: "#ffffff",
                borderRadius: 999,
                padding: 5,
                boxShadow: "0 6px 18px rgba(61,52,139,0.1)",
              }}
            >
              {(
                [
                  { id: "cbse", label: "CBSE" },
                  { id: "neet", label: "NEET-UG" },
                ] as { id: Exam; label: string }[]
              ).map((opt) => {
                const active = exam === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setExam(opt.id)}
                    aria-pressed={active}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      borderRadius: 999,
                      padding: "11px 26px",
                      fontFamily: "var(--pz-font)",
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: active ? "#ffffff" : "#5d5876",
                      background: active ? PURPLE : "transparent",
                      transition: "background .25s ease, color .25s ease",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* class selector — CBSE only, slides away for NEET */}
        <Reveal delay={0.08}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: isCbse ? "1fr" : "0fr",
              transition: "grid-template-rows .45s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  marginTop: 26,
                  background: "#ffffff",
                  borderRadius: 24,
                  padding: "12px 12px 60px",
                  boxShadow: "0 10px 30px -18px rgba(26,26,46,0.18)",
                  opacity: isCbse ? 1 : 0,
                  transition: "opacity .3s ease",
                }}
              >
                {/* center-snap picker — the chip in the middle is the selection */}
                <div
                  ref={pickerRef}
                  onScroll={onPickerScroll}
                  className="pz-xrail flex items-center overflow-x-auto"
                  style={{
                    gap: 8,
                    scrollSnapType: "x mandatory",
                    paddingLeft: "calc(50% - 60px)",
                    paddingRight: "calc(50% - 60px)",
                    paddingTop: 4,
                    paddingBottom: 4,
                  }}
                >
                  {CLASSES.map((c) => {
                    const active = c === selectedClass;
                    return (
                      <button
                        key={c}
                        data-class={c}
                        onClick={() => selectAndCenter(c)}
                        className="pz-chipbtn"
                        style={{
                          flex: "none",
                          scrollSnapAlign: "center",
                          background: active ? AMBER : "#ffffff",
                          border: active
                            ? "2px solid rgba(217,119,6,0.45)"
                            : "1px solid rgba(26,26,46,0.12)",
                          borderRadius: 999,
                          padding: active ? "10.5px 19px" : "10px 17px",
                          fontFamily: "var(--pz-font)",
                          fontSize: 13.5,
                          fontWeight: active ? 700 : 500,
                          color: INK,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          boxShadow: active
                            ? "0 6px 16px rgba(217,119,6,0.25)"
                            : "none",
                          transition:
                            "background .2s ease, box-shadow .2s ease, border .2s ease",
                        }}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* device — overlaps the selector bar; tabs inside */}
        <Reveal delay={0.14}>
          <div
            className="relative mx-auto w-full"
            style={{
              maxWidth: "calc(100% - clamp(14px, 2.6vw, 36px))",
              marginTop: isCbse ? -46 : 14,
              transition: "margin-top .45s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                background: "#15122e",
                borderRadius: "clamp(26px, 4vw, 40px)",
                padding: "clamp(10px, 1.8vw, 16px)",
                boxShadow: "0 32px 64px -28px rgba(26,26,46,0.45)",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "clamp(18px, 3vw, 28px)",
                  padding: "clamp(16px, 3vw, 28px)",
                }}
              >
                {/* demo tabs — stacked card on mobile, pill row on larger screens */}
                <div className="flex justify-center">
                  <div
                    role="tablist"
                    aria-label="Prepzy demo"
                    className="pz-tabwrap"
                  >
                    {TABS.map((tab) => {
                      const active = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveTab(tab)}
                          className={`pz-tabbtn ${active ? "pz-tabbtn-on" : "pz-tabbtn-off"}`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* equal-height stage for all three demos */}
                <div
                  className="flex flex-col"
                  style={{ minHeight: "clamp(430px, 54vw, 500px)" }}
                >

                {/* tab body */}
                {activeTab === "Solve My Doubt" ? (
                  <div
                    className="mx-auto flex w-full flex-col"
                    style={{ maxWidth: 720, marginTop: "clamp(26px, 4vw, 38px)" }}
                  >
                    {/* chat header — mirrors the live Atlas panel */}
                    <div
                      className="flex items-center justify-between"
                      style={{
                        padding: "4px 2px 12px",
                        borderBottom: "1px solid rgba(26,26,46,0.08)",
                      }}
                    >
                      <div className="flex items-center" style={{ gap: 10 }}>
                        <span
                          className="flex items-center justify-center"
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: PURPLE,
                            color: "#ffffff",
                            fontFamily: "var(--pz-font)",
                            fontWeight: 700,
                            fontSize: 15,
                          }}
                        >
                          A
                        </span>
                        <span>
                          <span
                            className="block"
                            style={{
                              fontFamily: "var(--pz-font)",
                              fontSize: 13.5,
                              fontWeight: 700,
                              letterSpacing: "0.02em",
                              color: INK,
                            }}
                          >
                            ATLAS, THE SCHOLAR
                          </span>
                          <span
                            className="flex items-center"
                            style={{
                              gap: 5,
                              fontFamily: "var(--pz-font)",
                              fontSize: 11.5,
                              fontWeight: 500,
                              color: "#1d9e75",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#1d9e75",
                                display: "inline-block",
                              }}
                            />
                            Online 24×7
                          </span>
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setPanel({ kind: "idle" });
                          setDraft("");
                        }}
                        className="pz-chipbtn"
                        style={{
                          background: "#ffffff",
                          border: "1px solid rgba(61,52,139,0.25)",
                          color: PURPLE,
                          borderRadius: 999,
                          padding: "8px 14px",
                          fontFamily: "var(--pz-font)",
                          fontSize: 12.5,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        + New Chat
                      </button>
                    </div>

                    {/* chat body */}
                    <div
                      className="pz-xrail"
                      style={{
                        minHeight: 280,
                        maxHeight: 380,
                        overflowY: "auto",
                        padding: "16px 2px",
                      }}
                    >
                      {panel.kind === "doubt" ? (
                        <div key={panel.doubt.q}>
                          <div className="flex justify-end">
                            <span
                              style={{
                                background: PURPLE,
                                color: "#ffffff",
                                fontFamily: "var(--pz-font)",
                                fontSize: 13.5,
                                fontWeight: 500,
                                borderRadius: "14px 14px 4px 14px",
                                padding: "11px 16px",
                                maxWidth: "78%",
                                lineHeight: 1.45,
                              }}
                            >
                              {panel.doubt.q}
                            </span>
                          </div>
                          <p
                            style={{
                              margin: "5px 2px 0",
                              textAlign: "right",
                              fontFamily: "var(--pz-font)",
                              fontSize: 10.5,
                              color: "#9a97a8",
                            }}
                          >
                            Just now · Seen
                          </p>

                          <div
                            className="pz-step"
                            style={{
                              animationDelay: "0.15s",
                              marginTop: 12,
                              background: "#f1effb",
                              borderRadius: 16,
                              padding: "16px 18px",
                              maxWidth: "92%",
                            }}
                          >
                            <ol
                              style={{
                                margin: 0,
                                padding: 0,
                                listStyle: "none",
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                              }}
                            >
                              {panel.doubt.steps.map((s, i) => (
                                <li
                                  key={s}
                                  className="pz-step flex items-start"
                                  style={{
                                    gap: 10,
                                    animationDelay: `${0.35 + i * 0.5}s`,
                                    fontFamily: "var(--pz-font)",
                                    fontSize: 13.5,
                                    lineHeight: 1.5,
                                    color: "#4a4a5e",
                                  }}
                                >
                                  <span
                                    className="flex flex-shrink-0 items-center justify-center"
                                    style={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      background: "rgba(61,52,139,0.1)",
                                      color: PURPLE,
                                      fontSize: 11.5,
                                      fontWeight: 700,
                                      marginTop: 1,
                                    }}
                                  >
                                    {i + 1}
                                  </span>
                                  {s}
                                </li>
                              ))}
                            </ol>
                            <p
                              className="pz-step"
                              style={{
                                animationDelay: `${0.35 + panel.doubt.steps.length * 0.5}s`,
                                margin: "14px 0 0",
                                fontFamily: "var(--pz-font)",
                                fontSize: 13.5,
                                fontWeight: 700,
                                color: INK,
                                background: "rgba(255,184,77,0.22)",
                                borderRadius: 10,
                                padding: "10px 12px",
                              }}
                            >
                              Answer: {panel.doubt.answer}
                            </p>
                            <div
                              className="flex items-center justify-between"
                              style={{
                                marginTop: 14,
                                paddingTop: 12,
                                borderTop: "1px solid rgba(61,52,139,0.12)",
                              }}
                            >
                              <button
                                onClick={() =>
                                  setPanel({
                                    kind: "nudge",
                                    text: "Every answer cites the exact textbook page. Sign up free to open the source.",
                                  })
                                }
                                className="pz-chipbtn flex items-center"
                                style={{
                                  gap: 7,
                                  background: "transparent",
                                  border: "none",
                                  color: PURPLE,
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 12.5,
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  padding: 0,
                                }}
                              >
                                <List size={15} aria-hidden />
                                View Source -{" "}
                                {exam === "neet"
                                  ? "NCERT Textbook"
                                  : "CBSE Textbook"}
                              </button>
                              <button
                                aria-label="Listen to this answer"
                                onClick={() =>
                                  setPanel({
                                    kind: "nudge",
                                    text: "Atlas reads answers aloud for you. Voice comes with your free account.",
                                  })
                                }
                                className="pz-chipbtn flex items-center justify-center"
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  border: "1.5px solid rgba(61,52,139,0.3)",
                                  background: "#ffffff",
                                  cursor: "pointer",
                                }}
                              >
                                <Play
                                  size={13}
                                  color={PURPLE}
                                  fill={PURPLE}
                                  strokeWidth={0}
                                  style={{ marginLeft: 2 }}
                                />
                              </button>
                            </div>
                          </div>

                          <div
                            className="flex flex-wrap"
                            style={{ gap: 8, marginTop: 14 }}
                          >
                            {demo.doubts
                              .filter((d) => d.q !== panel.doubt.q)
                              .map((d) => (
                                <button
                                  key={d.q}
                                  onClick={() => {
                                    setDraft("");
                                    setPanel({ kind: "doubt", doubt: d });
                                  }}
                                  className="pz-chipbtn text-left"
                                  style={{
                                    background: "#efedfb",
                                    border: "1px solid rgba(61,52,139,0.14)",
                                    borderRadius: 999,
                                    padding: "9px 15px",
                                    fontFamily: "var(--pz-font)",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: PURPLE,
                                    cursor: "pointer",
                                  }}
                                >
                                  {d.q}
                                </button>
                              ))}
                          </div>
                        </div>
                      ) : panel.kind === "nudge" ? (
                        <SignupNudge text={panel.text} />
                      ) : (
                        <div>
                          <div
                            className="mx-auto"
                            style={{
                              maxWidth: 470,
                              padding: 1.5,
                              borderRadius: 16,
                              background:
                                "linear-gradient(90deg, #8fb2e8, #f0a263)",
                            }}
                          >
                            <div
                              className="flex flex-col items-center text-center"
                              style={{
                                background:
                                  "linear-gradient(135deg, #f5f8ff 0%, #fff6ee 100%)",
                                borderRadius: 15,
                                padding: "20px 22px",
                                gap: 8,
                              }}
                            >
                              <Sparkles size={20} color={ORANGE} aria-hidden />
                              <p
                                style={{
                                  margin: 0,
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 13.5,
                                  fontWeight: 600,
                                  lineHeight: 1.55,
                                  color: INK,
                                }}
                              >
                                Hi! I&apos;m ATLAS, THE SCHOLAR, your Prepzy
                                academic tutor and helper. I&apos;ll break down
                                tough concepts, solve your questions, and make
                                learning easy, ask me anything!
                              </p>
                            </div>
                          </div>
                          <p
                            style={{
                              margin: "10px auto 0",
                              textAlign: "center",
                              maxWidth: 430,
                              fontFamily: "var(--pz-font)",
                              fontSize: 10.5,
                              color: "#9a97a8",
                            }}
                          >
                            Prepzy can make mistakes in answering the questions.
                            Please verify the accuracy of the answers*
                          </p>
                          <div
                            className="flex flex-wrap justify-center"
                            style={{ gap: 8, marginTop: 18 }}
                          >
                            {demo.doubts.map((d) => (
                              <button
                                key={d.q}
                                onClick={() => {
                                  setDraft("");
                                  setPanel({ kind: "doubt", doubt: d });
                                }}
                                className="pz-chipbtn text-left"
                                style={{
                                  background: "#efedfb",
                                  border: "1px solid rgba(61,52,139,0.14)",
                                  borderRadius: 999,
                                  padding: "9px 15px",
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: PURPLE,
                                  cursor: "pointer",
                                }}
                              >
                                {d.q}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* input row — attach, message, mic, send */}
                    <div
                      className="flex items-center"
                      style={{
                        gap: 6,
                        paddingTop: 12,
                        borderTop: "1px solid rgba(26,26,46,0.08)",
                      }}
                    >
                      <button
                        aria-label="Attach a photo of your doubt"
                        onClick={() =>
                          setPanel({
                            kind: "nudge",
                            text: "Snap a photo of any doubt after you sign up. Atlas reads handwriting too.",
                          })
                        }
                        className="pz-chipbtn flex items-center justify-center"
                        style={{
                          flex: "none",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <Paperclip size={18} color="#6b6b80" />
                      </button>
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setPanel({
                              kind: "nudge",
                              text: draft.trim()
                                ? "Atlas answers your own doubts 24×7 once you sign up. Until then, tap a suggestion to watch a full solution."
                                : "Type a doubt, or tap a suggestion to watch Atlas solve it.",
                            });
                          }
                        }}
                        placeholder="Type a message..."
                        aria-label="Type your doubt"
                        style={{
                          minWidth: 0,
                          flex: 1,
                          background: "#f3f1f6",
                          border: "none",
                          outline: "none",
                          borderRadius: 12,
                          padding: "12px 15px",
                          fontFamily: "var(--pz-font)",
                          fontSize: 13.5,
                          color: INK,
                        }}
                      />
                      <button
                        aria-label="Ask by voice"
                        onClick={() =>
                          setPanel({
                            kind: "nudge",
                            text: "Speak your doubt and Atlas listens. Voice comes with your free account.",
                          })
                        }
                        className="pz-chipbtn flex items-center justify-center"
                        style={{
                          flex: "none",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <Mic size={18} color="#6b6b80" />
                      </button>
                      <button
                        aria-label="Send"
                        onClick={() =>
                          setPanel({
                            kind: "nudge",
                            text: draft.trim()
                              ? "Atlas answers your own doubts 24×7 once you sign up. Until then, tap a suggestion to watch a full solution."
                              : "Type a doubt, or tap a suggestion to watch Atlas solve it.",
                          })
                        }
                        className="pz-chipbtn flex items-center justify-center"
                        style={{
                          flex: "none",
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: PURPLE,
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Send size={16} color="#ffffff" aria-hidden />
                      </button>
                    </div>
                    <p
                      style={{
                        margin: "8px 0 0",
                        textAlign: "center",
                        fontFamily: "var(--pz-font)",
                        fontSize: 10.5,
                        color: "#9a97a8",
                      }}
                    >
                      Prepzy can make mistakes
                    </p>
                  </div>
                ) : activeTab === "Visual Learning" ? (
                  <div
                    className="mx-auto w-full"
                    style={{
                      maxWidth: 720,
                      marginTop: "clamp(26px, 4vw, 38px)",
                    }}
                  >
                    {/* lesson rail — like the live demo */}
                    <div
                      className="pz-xrail flex overflow-x-auto"
                      style={{ gap: 10, paddingBottom: 4 }}
                    >
                      {LESSON_RAIL[demoKey].map((l, i) => {
                        const active = i === lessonIdx;
                        return (
                          <button
                            key={l.title}
                            onClick={() => {
                              setLessonIdx(i);
                              setLessonPlayed(false);
                            }}
                            className="pz-chipbtn text-left"
                            style={{
                              flex: "none",
                              width: 158,
                              background: active ? PURPLE : "#ffffff",
                              border: active
                                ? "none"
                                : "1px solid rgba(26,26,46,0.12)",
                              borderRadius: 14,
                              padding: "12px 13px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              className="flex items-center"
                              style={{
                                gap: 6,
                                fontFamily: "var(--pz-font)",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                color: active
                                  ? "#ffd9a0"
                                  : subjectTagColor(l.subject),
                              }}
                            >
                              <Play
                                size={10}
                                aria-hidden
                                color={
                                  active
                                    ? "#ffd9a0"
                                    : subjectTagColor(l.subject)
                                }
                                fill={
                                  active
                                    ? "#ffd9a0"
                                    : subjectTagColor(l.subject)
                                }
                                strokeWidth={0}
                              />
                              {l.subject}
                            </span>
                            <span
                              className="block"
                              style={{
                                marginTop: 5,
                                fontFamily: "var(--pz-font)",
                                fontSize: 12.5,
                                fontWeight: 600,
                                lineHeight: 1.35,
                                color: active ? "#ffffff" : INK,
                              }}
                            >
                              {l.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* player */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        marginTop: 14,
                        background:
                          "radial-gradient(120% 120% at 50% 0%, #2d2566 0%, #241d52 55%, #1d1745 100%)",
                        borderRadius: 18,
                        minHeight: "clamp(210px, 30vw, 280px)",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "#ffffff",
                          color: PURPLE,
                          fontFamily: "var(--pz-font)",
                          fontSize: 11.5,
                          fontWeight: 600,
                          padding: "5px 11px",
                          borderRadius: 999,
                          maxWidth: "calc(100% - 24px)",
                        }}
                      >
                        {LESSON_RAIL[demoKey][lessonIdx].title}
                      </span>
                      {lessonPlayed ? (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center text-center"
                          style={{ gap: 12, padding: 20 }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: "#e8e3ff",
                              fontFamily: "var(--pz-font)",
                              fontSize: 14,
                              fontWeight: 500,
                              maxWidth: 300,
                              lineHeight: 1.5,
                            }}
                          >
                            Full lessons unlock with your free account. Tutors
                            included.
                          </p>
                          <a
                            href="#signup"
                            style={{
                              background: AMBER,
                              color: INK,
                              fontFamily: "var(--pz-font)",
                              fontSize: 14,
                              fontWeight: 700,
                              borderRadius: 999,
                              padding: "11px 24px",
                              textDecoration: "none",
                            }}
                          >
                            Start free
                          </a>
                        </div>
                      ) : (
                        <>
                          <button
                            aria-label="Play sample lesson"
                            onClick={() => setLessonPlayed(true)}
                            className="pz-chipbtn absolute flex items-center justify-center"
                            style={{
                              top: "46%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: 58,
                              height: 58,
                              borderRadius: "50%",
                              background: AMBER,
                              border: "none",
                              cursor: "pointer",
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
                          </button>
                          <div
                            className="absolute flex items-center justify-between"
                            style={{ left: 14, right: 14, bottom: 12 }}
                          >
                            <span
                              style={{
                                background: "rgba(255,255,255,0.14)",
                                color: "#e8e3ff",
                                fontFamily: "var(--pz-font)",
                                fontSize: 10.5,
                                fontWeight: 600,
                                padding: "4px 10px",
                                borderRadius: 999,
                              }}
                            >
                              HD Quality
                            </span>
                            <span
                              className="flex items-center"
                              style={{ gap: 8 }}
                            >
                              <span
                                style={{
                                  color: "#e8e3ff",
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 10.5,
                                  fontWeight: 500,
                                }}
                              >
                                0:00 / 12:32
                              </span>
                              <span
                                style={{
                                  background: "rgba(255,255,255,0.14)",
                                  color: "#e8e3ff",
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 10.5,
                                  fontWeight: 600,
                                  padding: "4px 9px",
                                  borderRadius: 999,
                                }}
                              >
                                1x
                              </span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* tutor inside the lesson */}
                    {(() => {
                      const tutor = lessonTutor(
                        LESSON_RAIL[demoKey][lessonIdx].subject,
                      );
                      const t = TUTOR_STYLE[tutor];
                      return (
                        <div
                          className="relative flex items-start"
                          style={{
                            gap: 10,
                            marginTop: -22,
                            marginLeft: 14,
                            background: "#ffffff",
                            border: "1px solid rgba(26,26,46,0.1)",
                            borderRadius: 14,
                            padding: "10px 14px",
                            maxWidth: 330,
                            boxShadow: "0 12px 28px rgba(26,26,46,0.12)",
                          }}
                        >
                          <span
                            className="flex flex-shrink-0 items-center justify-center"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              background: t.bg,
                              color: t.color,
                              fontFamily: "var(--pz-font)",
                              fontWeight: 700,
                              fontSize: 13,
                            }}
                          >
                            {tutor[0]}
                          </span>
                          <span>
                            <span
                              className="block"
                              style={{
                                fontFamily: "var(--pz-font)",
                                fontSize: 13,
                                fontWeight: 600,
                                color: INK,
                              }}
                            >
                              {tutor} · {t.subject}
                            </span>
                            <span
                              className="block"
                              style={{
                                fontFamily: "var(--pz-font)",
                                fontSize: 12.5,
                                fontWeight: 400,
                                color: "#6b6b80",
                                lineHeight: 1.45,
                                marginTop: 2,
                              }}
                            >
                              {t.line}
                            </span>
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  (() => {
                    const total = demo.quiz.length;
                    if (qIndex >= total) {
                      const score = demo.quiz.filter(
                        (qq, qi) => quizPicks[qi] === qq.correct,
                      ).length;
                      return (
                        <div
                          className="mx-auto flex w-full flex-1 flex-col items-center justify-center"
                          style={{
                            maxWidth: 560,
                            marginTop: "clamp(26px, 4vw, 38px)",
                          }}
                        >
                          <div
                            className="pz-step flex w-full flex-col items-center text-center"
                            style={{
                              background: "rgba(255,184,77,0.16)",
                              borderRadius: 16,
                              padding: "26px 20px",
                              gap: 10,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontFamily: "var(--pz-font)",
                                fontSize: 15.5,
                                fontWeight: 700,
                                color: INK,
                              }}
                            >
                              You scored {score}/{total}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontFamily: "var(--pz-font)",
                                fontSize: 13,
                                fontWeight: 500,
                                color: "#6b6b80",
                                maxWidth: 340,
                                lineHeight: 1.5,
                              }}
                            >
                              Personalised tests find your weak topics and
                              explain every miss, instantly.
                            </p>
                            <a
                              href="#signup"
                              style={{
                                background: AMBER,
                                color: INK,
                                fontFamily: "var(--pz-font)",
                                fontSize: 14,
                                fontWeight: 700,
                                borderRadius: 999,
                                padding: "11px 24px",
                                textDecoration: "none",
                              }}
                            >
                              Start free
                            </a>
                            <button
                              onClick={() => {
                                setQIndex(0);
                                setQChosen(null);
                                setQLocked(false);
                                setQuizPicks({});
                              }}
                              className="pz-chipbtn"
                              style={{
                                background: "transparent",
                                border: "none",
                                fontFamily: "var(--pz-font)",
                                fontSize: 12.5,
                                fontWeight: 600,
                                color: PURPLE,
                                cursor: "pointer",
                              }}
                            >
                              Try again
                            </button>
                          </div>
                        </div>
                      );
                    }
                    const qq = demo.quiz[qIndex];
                    return (
                      <div
                        className="mx-auto flex w-full flex-col"
                        style={{
                          maxWidth: 720,
                          marginTop: "clamp(26px, 4vw, 38px)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontFamily: "var(--pz-font)",
                              fontSize: 11.5,
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              color: "#8a8a9a",
                            }}
                          >
                            QUESTION {qIndex + 1} OF {total}
                          </span>
                          <span
                            style={{
                              background: "rgba(255,184,77,0.25)",
                              color: "#854f0b",
                              fontFamily: "var(--pz-font)",
                              fontSize: 11.5,
                              fontWeight: 600,
                              padding: "5px 12px",
                              borderRadius: 999,
                            }}
                          >
                            1 mark
                          </span>
                        </div>

                        <div
                          style={{
                            height: 5,
                            background: "#efedfb",
                            borderRadius: 999,
                            marginTop: 10,
                          }}
                        >
                          <div
                            style={{
                              width: `${((qIndex + (qLocked ? 1 : 0)) / total) * 100}%`,
                              height: "100%",
                              background: AMBER,
                              borderRadius: 999,
                              transition: "width .35s ease",
                            }}
                          />
                        </div>

                        <p
                          style={{
                            margin: "18px 0 0",
                            fontFamily: "var(--pz-font)",
                            fontSize: 15,
                            fontWeight: 600,
                            color: INK,
                            lineHeight: 1.5,
                          }}
                        >
                          {qq.q}
                        </p>

                        <div
                          className="flex flex-col"
                          style={{ gap: 9, marginTop: 14 }}
                        >
                          {qq.options.map((opt, oi) => {
                            const letter = String.fromCharCode(65 + oi);
                            const isChosen = qChosen === oi;
                            const isCorrect = oi === qq.correct;
                            return (
                              <button
                                key={opt}
                                disabled={qLocked}
                                onClick={() => setQChosen(oi)}
                                className="pz-chipbtn flex items-center text-left"
                                style={{
                                  gap: 12,
                                  background: qLocked
                                    ? isCorrect
                                      ? "#e9f6ec"
                                      : isChosen
                                        ? "#fdecec"
                                        : "#ffffff"
                                    : isChosen
                                      ? "#efedfb"
                                      : "#ffffff",
                                  border: qLocked
                                    ? isCorrect
                                      ? "1.5px solid #4caf7d"
                                      : isChosen
                                        ? "1.5px solid #e26d6d"
                                        : "1px solid rgba(26,26,46,0.12)"
                                    : isChosen
                                      ? "1.5px solid rgba(61,52,139,0.55)"
                                      : "1px solid rgba(26,26,46,0.12)",
                                  borderRadius: 12,
                                  padding: "11px 14px",
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 13.5,
                                  fontWeight: 500,
                                  color: INK,
                                  cursor: qLocked ? "default" : "pointer",
                                }}
                              >
                                <span
                                  className="flex flex-shrink-0 items-center justify-center"
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    border: "1.5px solid rgba(26,26,46,0.18)",
                                    fontFamily: "var(--pz-font)",
                                    fontSize: 11.5,
                                    fontWeight: 700,
                                    color: INK,
                                  }}
                                >
                                  {letter}
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        <div
                          className="flex items-center justify-end"
                          style={{ gap: 10, marginTop: 16 }}
                        >
                          {!qLocked ? (
                            <>
                              <button
                                onClick={() => {
                                  setQuizPicks((p) => ({
                                    ...p,
                                    [qIndex]: -1,
                                  }));
                                  setQChosen(null);
                                  setQLocked(true);
                                }}
                                className="pz-chipbtn"
                                style={{
                                  background: "#ffffff",
                                  border: "1px solid rgba(26,26,46,0.15)",
                                  borderRadius: 999,
                                  padding: "10px 22px",
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 13.5,
                                  fontWeight: 600,
                                  color: INK,
                                  cursor: "pointer",
                                }}
                              >
                                Skip
                              </button>
                              <button
                                disabled={qChosen === null}
                                onClick={() => {
                                  if (qChosen === null) return;
                                  setQuizPicks((p) => ({
                                    ...p,
                                    [qIndex]: qChosen,
                                  }));
                                  setQLocked(true);
                                }}
                                className="pz-chipbtn"
                                style={{
                                  background:
                                    qChosen === null
                                      ? "rgba(61,52,139,0.35)"
                                      : PURPLE,
                                  border: "none",
                                  borderRadius: 999,
                                  padding: "10px 22px",
                                  fontFamily: "var(--pz-font)",
                                  fontSize: 13.5,
                                  fontWeight: 600,
                                  color: "#ffffff",
                                  cursor:
                                    qChosen === null ? "default" : "pointer",
                                }}
                              >
                                Lock Answer
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setQIndex(qIndex + 1);
                                setQChosen(null);
                                setQLocked(false);
                              }}
                              className="pz-chipbtn"
                              style={{
                                background: PURPLE,
                                border: "none",
                                borderRadius: 999,
                                padding: "10px 22px",
                                fontFamily: "var(--pz-font)",
                                fontSize: 13.5,
                                fontWeight: 600,
                                color: "#ffffff",
                                cursor: "pointer",
                              }}
                            >
                              {qIndex + 1 < total
                                ? "Next Question"
                                : "See result"}
                            </button>
                          )}
                        </div>

                        <div
                          style={{
                            marginTop: 16,
                            background: "#fbfaff",
                            border: "1px solid rgba(61,52,139,0.1)",
                            borderRadius: 14,
                            padding: "12px 16px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--pz-font)",
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              color: "#8a8a9a",
                            }}
                          >
                            FEEDBACK
                          </span>
                          {qLocked ? (
                            <p
                              className="pz-step"
                              style={{
                                margin: "6px 0 0",
                                fontFamily: "var(--pz-font)",
                                fontSize: 13,
                                fontWeight: 500,
                                lineHeight: 1.5,
                                color:
                                  qChosen === qq.correct
                                    ? "#2e7d52"
                                    : qChosen === null
                                      ? "#6b6b80"
                                      : "#b04a4a",
                              }}
                            >
                              {qChosen === qq.correct
                                ? "Correct. "
                                : qChosen === null
                                  ? "Skipped. "
                                  : "Not quite. "}
                              {qq.why}
                            </p>
                          ) : (
                            <p
                              style={{
                                margin: "6px 0 0",
                                fontFamily: "var(--pz-font)",
                                fontSize: 13,
                                fontWeight: 500,
                                color: "#9a97a8",
                              }}
                            >
                              Lock your answer or skip to see the feedback
                              here.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()
                )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
