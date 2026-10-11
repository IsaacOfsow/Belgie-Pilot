import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { btn } from "@/components/site/ui";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <p className="eyebrow">Fout 404</p>
        <h1 className="mt-4 text-6xl md:text-8xl">Niet gevonden</h1>
        <p className="mt-4 text-muted-foreground">Deze pagina bestaat niet of is verplaatst.</p>
        <Link to="/" className={`${btn()} mt-8`}>Terug naar home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl">Deze pagina laadde niet</h1>
        <p className="mt-2 text-sm text-muted-foreground">Er ging iets mis. Probeer opnieuw.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className={`${btn()} mt-6`}>Opnieuw proberen</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pilot België" },
      { name: "description", content: "Redactioneel televisieprogramma over Belgische ondernemers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@500;700;800&family=Inter:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="nl-BE">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Naar inhoud</a>
      <Header />
      <main id="main" key={path} className="page-fade"><Outlet /></main>
      <Footer />
    </QueryClientProvider>
  );
}
