import * as React from "react";

// Basic toast implementation - replace with proper shadcn/ui toast when needed
export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  type?: "success" | "error" | "warning" | "info";
};

const toasts: Array<ToastProps> = [];

export const useToast = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const toast = React.useCallback(
    (props: ToastProps) => {
      const id = Math.random().toString(36).substring(7);
      toasts.push({ ...props, id });
      forceUpdate();

      // Auto remove after 5 seconds
      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id);
        if (index > -1) {
          toasts.splice(index, 1);
          forceUpdate();
        }
      }, 5000);
    },
    [forceUpdate],
  );

  return { toast };
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
