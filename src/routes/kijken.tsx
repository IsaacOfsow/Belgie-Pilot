import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude route — alle programma's staan nu op /programmas. */
export const Route = createFileRoute("/kijken")({
  beforeLoad: () => { throw redirect({ to: "/programmas" }); },
});
