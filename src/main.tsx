import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { routeTree } from "~/routeTree.gen";
import { ToastProvider } from "~/shared/components/ui/toast";
import { tanstackClient } from "~config/tanstack-query.config";

dayjs.extend(utc);

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={tanstackClient}>
      <WebApp />
    </QueryClientProvider>
  </StrictMode>,
);

export function WebApp() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
