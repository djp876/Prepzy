import { Menu } from "lucide-react";

const LINKS = ["Home", "About Us", "Courses", "Pricing", "Resources", "Contact"];

const INK = "#1a1a2e";
const PURPLE = "#3d348b";

export function NavbarV1() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ padding: "14px 16px 0" }}
    >
      <nav
        className="mx-auto flex w-full items-center justify-between"
        style={{
          maxWidth: 1200,
          background: "#ffffff",
          border: "1px solid var(--pz-line)",
          borderRadius: "var(--pz-radius-pill)",
          padding: "9px 12px 9px 22px",
          boxShadow: "0 2px 12px -4px rgba(26,26,46,0.12)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/prepzy-logo.png"
          alt="Prepzy"
          style={{ height: 30, width: "auto", display: "block" }}
        />

        <ul
          className="hidden items-center lg:flex"
          style={{ gap: 22, listStyle: "none", margin: 0, padding: 0 }}
        >
          {LINKS.map((l, i) => (
            <li key={l}>
              <a
                href="#"
                style={{
                  fontSize: 14,
                  fontWeight: i === 0 ? 600 : 500,
                  color: i === 0 ? PURPLE : INK,
                  textDecoration: "none",
                  paddingBottom: 3,
                  borderBottom:
                    i === 0 ? `2px solid ${PURPLE}` : "2px solid transparent",
                  transition: "color var(--pz-dur) var(--pz-ease-out)",
                }}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center" style={{ gap: 10 }}>
          <a
            href="#"
            className="hidden sm:inline-flex"
            style={{
              background: PURPLE,
              color: "#fff",
              borderRadius: "var(--pz-radius-pill)",
              padding: "10px 22px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Login
          </a>
          <button
            aria-label="Open menu"
            className="lg:hidden"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              borderRadius: "var(--pz-radius-pill)",
              background: "var(--pz-lavender)",
              border: "none",
              color: PURPLE,
              cursor: "pointer",
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
