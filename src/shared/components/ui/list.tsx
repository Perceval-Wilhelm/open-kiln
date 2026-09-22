import * as React from "react";

import { cn } from "~/lib/utils";

type ListProps<T = any> = React.HTMLAttributes<HTMLUListElement> & {
  dataSource?: Array<T>;
  loading?: boolean;
  renderItem?: (item: T, index: number) => React.ReactNode;
  size?: "small" | "default" | "large";
  locale?: {
    emptyText?: string;
  };
};

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    actions?: React.ReactNode;
  }
>(({ className, actions, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex items-center justify-between p-2 rounded-md hover:bg-accent hover:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <div className="flex-1">{children}</div>
    {actions && <div className="ml-2">{actions}</div>}
  </li>
));
ListItem.displayName = "ListItem";

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, dataSource = [], loading = false, renderItem, size = "default", locale, children, ...props }, ref) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-primary" />
        </div>
      );
    }

    if (dataSource.length === 0 && !children) {
      return (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          {locale?.emptyText || "No data"}
        </div>
      );
    }

    return (
      <ul
        ref={ref}
        className={cn(
          "space-y-1",
          {
            "text-sm": size === "small",
            "text-base": size === "default",
            "text-lg": size === "large",
          },
          className,
        )}
        {...props}
      >
        {renderItem
          ? dataSource.map((item, index) => <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>)
          : children}
      </ul>
    );
  },
);
List.displayName = "List";

// Attach Item as a static property for backwards compatibility
const ListWithItem = List as typeof List & {
  Item: typeof ListItem;
};
ListWithItem.Item = ListItem;

export { ListWithItem as List, ListItem };
