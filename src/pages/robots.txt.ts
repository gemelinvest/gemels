import type { APIRoute } from "astro";
import { withBase } from "../data/site";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase("/sitemap-index.xml"), site).href;
  const body = `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
