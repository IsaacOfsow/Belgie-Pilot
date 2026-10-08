import { createFileRoute } from "@tanstack/react-router";
import { articles, categories } from "@/content/news";
import { companies, episodes, themes } from "@/content/site";
import { programmes } from "@/content/portal";
import { videos } from "@/content/video";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = ["/", "/programma", "/themas", "/afleveringen", "/verhalen", "/contact", "/nieuws", "/achtergrond", "/video", "/programmas", "/tvgids", "/podcast", "/live", "/app", "/adverteren", "/over-ons", "/nieuwsbrief",
          ...categories.map((c) => `/categorie/${c.slug}`), ...articles.map((a) => `/nieuws/${a.slug}`), ...videos.map((v) => `/video/${v.slug}`), ...programmes.map((p) => `/programmas/${p.slug}`),
          ...themes.map((t) => `/themas/${t.slug}`), ...episodes.map((e) => `/afleveringen/${e.slug}`), ...companies.map((c) => `/verhalen/${c.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
