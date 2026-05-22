import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, CalendarDays, Tag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { listPublishedPosts } from "@/lib/blog.functions";
import { SITE_URL } from "@/lib/site";

const postsQO = queryOptions({
  queryKey: ["posts", "published"],
  queryFn: () => listPublishedPosts(),
});

export const Route = createFileRoute("/blog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQO),
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog — Kodrix Labs | News & updates from our Android apps" },
      {
        name: "description",
        content:
          "Latest news, release notes, tutorials and behind-the-scenes updates from Kodrix Labs and our apps including Pagify.",
      },
      { property: "og:title", content: "Kodrix Labs Blog — News & app updates" },
      {
        property: "og:description",
        content: "Release notes, tutorials and updates from the Kodrix Labs studio.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Kodrix Labs Blog",
          url: `${SITE_URL}/blog`,
          publisher: {
            "@type": "Organization",
            name: "Kodrix Labs",
            url: SITE_URL,
          },
        }),
      },
    ],
  }),
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQO);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Kodrix Labs · Journal
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Updates, releases, and stories from the studio.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Release notes, tutorials, deep-dives, and behind-the-scenes posts about{" "}
            <span className="font-medium text-foreground">Pagify</span> and everything else
            we&rsquo;re shipping.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
              <p className="text-lg font-semibold text-foreground">No posts yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The first stories from the Kodrix Labs studio are on the way. Check back soon.
              </p>
            </div>
          ) : (
            <ol className="grid gap-6 sm:grid-cols-2">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
                  >
                    {p.cover_image_url ? (
                      <img
                        src={p.cover_image_url}
                        alt={p.title}
                        loading="lazy"
                        width={1200}
                        height={630}
                        className="aspect-[1200/630] w-full object-cover"
                      />
                    ) : (
                      <div
                        className="aspect-[1200/630] w-full"
                        style={{ background: "var(--gradient-hero)" }}
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {p.published_at
                            ? new Date(p.published_at).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                        {p.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider"
                          >
                            <Tag className="h-3 w-3" />
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
                        {p.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {p.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                        <span className="font-medium text-foreground">Read article</span>
                        <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
