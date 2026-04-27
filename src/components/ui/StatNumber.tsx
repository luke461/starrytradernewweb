import { cn } from "@/lib/cn";

type Props = {
  value: string;
  className?: string;
  surface?: "dark" | "light";
};

export function StatNumber({ value, className, surface = "dark" }: Props) {
  return (
    <span
      className={cn(
        "font-mono font-bold leading-none tracking-tight tabular-nums",
        surface === "light" ? "text-starry-violet-deep" : "text-starry-blue-light",
        className,
      )}
    >
      {value}
    </span>
  );
}
