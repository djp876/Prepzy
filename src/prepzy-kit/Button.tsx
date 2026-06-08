import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const base: React.CSSProperties = {
  fontFamily: "var(--pz-font)",
  fontWeight: 600,
  borderRadius: "var(--pz-radius-pill)",
  border: "none",
  cursor: "pointer",
  transition: "transform 120ms ease, box-shadow 120ms ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--pz-space-2)",
};

const sizes: Record<Size, React.CSSProperties> = {
  sm: { padding: "8px 16px", fontSize: "var(--pz-text-sm)" },
  md: { padding: "12px 24px", fontSize: "var(--pz-text-base)" },
  lg: { padding: "16px 32px", fontSize: "var(--pz-text-lg)" },
};

const variants: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--pz-amber)",
    color: "var(--pz-ink)",
    boxShadow: "var(--pz-shadow-sm)",
  },
  secondary: {
    background: "var(--pz-purple)",
    color: "var(--pz-white)",
    boxShadow: "var(--pz-shadow-sm)",
  },
  ghost: {
    background: "transparent",
    color: "var(--pz-purple)",
    border: "1px solid var(--pz-purple)",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  style,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
