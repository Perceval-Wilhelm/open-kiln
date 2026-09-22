import * as React from "react";

import { cn } from "~/lib/utils";

export type SpinnerProps = {
  size?: "sm" | "md" | "lg";
} & React.HTMLAttributes<HTMLDivElement>;

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ className, size = "md", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className,
      )}
      {...props}
    />
  );
});
Spinner.displayName = "Spinner";

export { Spinner };

// Alias for backwards compatibility
export const Loading = Spinner;
