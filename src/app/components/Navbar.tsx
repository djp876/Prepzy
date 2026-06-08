"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div
        className="w-full max-w-[1392px] transition-shadow duration-300"
        style={{
          borderRadius: 20,
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(61,52,139,0.13)"
            : "0 4px 24px rgba(61,52,139,0.08)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 sm:px-7"
          style={{ minHeight: 72 }}
        >
          {/* Logo */}
          <a href="#home" className="flex-shrink-0" aria-label="Prepzy home">
            <Image
              src="/prepzy-logo.png"
              alt="Prepzy"
              width={500}
              height={177}
              priority
              style={{ height: 42, width: "auto" }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className="flex flex-col items-center"
                  style={{ textDecoration: "none", gap: 6 }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      lineHeight: 1,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "var(--pz-purple)" : "var(--pz-ink)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      height: 3,
                      width: "100%",
                      borderRadius: 999,
                      background: isActive ? "var(--pz-purple)" : "transparent",
                    }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#login"
            className="hidden items-center justify-center transition-opacity hover:opacity-80 lg:inline-flex"
            style={{
              background: "var(--pz-purple)",
              color: "#fff",
              fontSize: 15,
              borderRadius: 8,
              padding: "11px 26px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Login
          </a>

          {/* Mobile hamburger */}
          <button
            className="-mr-1 flex flex-col gap-[5px] p-3 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-300"
                style={{
                  width: 24,
                  height: 2,
                  background: "var(--pz-purple)",
                  transform: open
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(5px, -5px)"
                        : "none"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="flex flex-col gap-1 px-5 pb-5 sm:px-7 lg:hidden"
            style={{ borderTop: "1px solid rgba(61,52,139,0.08)" }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setOpen(false);
                  }}
                  style={{
                    padding: "12px 0",
                    fontSize: 16,
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "var(--pz-purple)" : "var(--pz-ink)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#login"
              style={{
                marginTop: 12,
                background: "var(--pz-purple)",
                color: "#fff",
                borderRadius: 8,
                padding: "14px 0",
                textAlign: "center",
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
