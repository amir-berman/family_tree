import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type LinkButtonProps = BaseProps & { href: string };

type NativeButtonProps = BaseProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white/95 text-ink-50 shadow-glow hover:bg-white focus-visible:ring-violet-400/70",
  secondary:
    "bg-white/[0.06] text-pearl-50 shadow-glow ring-1 ring-white/10 hover:bg-white/[0.09]",
  ghost: "text-pearl-100 hover:bg-white/[0.06] ring-1 ring-transparent hover:ring-white/10",
};

export function Button(props: ButtonProps) {
  const { children, variant = "secondary", className } = props;

  const classes = cn(base, variants[variant], className);

  if ("href" in props) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {children}
    </button>
  );
}

