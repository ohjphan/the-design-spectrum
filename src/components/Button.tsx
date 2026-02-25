import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  href,
  children,
  className = "",
  variant = "primary",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-tight transition-colors disabled:opacity-50";
  const primary =
    "border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground";
  const secondary =
    "border border-foreground text-foreground hover:bg-foreground hover:text-background";
  const styles = variant === "primary" ? primary : secondary;
  const combined = `${base} ${styles} ${className}`.trim();

  if (href && !onClick) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={combined}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
