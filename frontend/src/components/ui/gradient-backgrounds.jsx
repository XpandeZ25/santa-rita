import { cn } from "../../lib/utils.js";

export function GradientBackground({ children, className }) {
  return (
    <div className={cn("gradient-background", className)}>
      <div className="gradient-background-layer" aria-hidden="true" />
      <div className="gradient-background-content">{children}</div>
    </div>
  );
}
