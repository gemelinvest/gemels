import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.PUBLIC_SITE_URL || "https://gemel-ins-site.example";

export default defineConfig({
  site,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  image: {
    domains: [],
  },
});
