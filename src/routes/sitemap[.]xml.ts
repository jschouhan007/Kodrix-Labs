import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/blog", changefreq: "daily", priority: "0.9" },
          { path: "/apps/pagify", changefreq: "monthly", priority: "0.8" },
          { path: "/apps/pagify/privacy", changefreq: "monthly", priority: "0.6" },
        ];

        const { data: posts } = await supabaseAdmin
          .from("posts")
          .select("slug,updated_at,published_at")
          .eq("published", true)
          .order("published_at", { ascending: false });

        const lines: string[] = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ];

        for (const e of staticEntries) {
          lines.push(
            `  <url><loc>${SITE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          );
        }
        for (const p of posts ?? []) {
          const lastmod = (p.updated_at ?? p.published_at ?? new Date().toISOString()).slice(0, 10);
          lines.push(
            `  <url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
          );
        }
        lines.push(`</urlset>`);

        return new Response(lines.join("\n"), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=600",
          },
        });
      },
    },
  },
});
