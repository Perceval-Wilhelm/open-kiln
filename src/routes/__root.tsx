import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type RouterContext = {
  theme?: "light" | "dark";
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <div>Not Found</div>,
});

export function Root() {
  return <Outlet />;
}
