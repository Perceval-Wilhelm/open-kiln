import { createFileRoute } from "@tanstack/react-router";

import { OpenKilnView } from "~/views/_public/OpenKilnView";

export const Route = createFileRoute("/_public/")({ component: OpenKilnView });
