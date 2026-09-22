import * as React from "react";

import { cn } from "~/lib/utils";

export type EmptyProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, title, description, icon, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-center justify-center p-8 text-center", className)} {...props}>
        {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
        {title && <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>}
        {description && <p className="mb-4 text-sm text-muted-foreground max-w-sm">{description}</p>}
        {children}
      </div>
    );
  },
);
Empty.displayName = "Empty";

export { Empty };
