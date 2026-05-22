import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPublishedPostBySlug } from "@/lib/blog.functions";
import { renderMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

const postQO = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: async () => {
      const post = await getPublishedPostBySlug({ data: { slug } });
      if (!post) throw notFound();
      return post;
    },
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params, context }) => context.queryClient.ensureQueryData(postQO(params.slug)),
  component: BlogPost,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Post not found</h1>
        <p className="mt-2 text-muted-foreground">This article doesn&rsquo;t exist or was moved.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </div>
    </div>
  ),
  head: ({ params, loaderData }) => {
    const post = loaderData;
    const url = `${SITE_URL}/blog/${params.slug}`;
    const title = post ? `${post.title} — Kodrix Labs Blog` : "Article — Kodrix Labs";
    const description =
      (post?.meta_description || post?.excerpt || "Read the latest from Kodrix Labs.").slice(0, 180);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "author", content: post?.author_name ?? "Kodrix Labs" },
        { name: "keywords", content: post?.tags?.join(", ") ?? "" },
        { property: "og:title", content: post?.title ?? title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post?.cover_image_url
          ? [
              { property: "og:image", content: post.cover_image_url },
              { name: "twitter:image", content: post.cover_image_url },
            ]
          : []),
        { property: "article:published_time", content: post?.published_at ?? "" },
        { property: "article:modified_time", content: post?.updated_at ?? "" },
        { property: "article:author", content: post?.author_name ?? "Kodrix Labs" },
        { name: "twitter:card", content: post?.cover_image_url ? "summary_large_image" : "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.meta_description || post.excerpt,
                image: post.cover_image_url ?? undefined,
                datePublished: post.published_at,
                dateModified: post.updated_at,
                author: {
                  "@type": "Organization",
                  name: post.author_name,
                  url: SITE_URL,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Kodrix Labs",
                  url: SITE_URL,
                },
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                keywords: post.tags?.join(", "),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
                  { "@type": "ListItem", position: 3, name: post.title, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQO(slug));
  const html = renderMarkdown(post.content);
  const published = post.published_at
    ? new Date(post.published_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{post.title}</li>
          </ol>
        </nav>

        <header>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <time dateTime={post.published_at ?? undefined}>{published}</time>
            </span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider"
              >
                <Tag className="h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          ) : null}
          <p className="mt-6 text-sm text-muted-foreground">By {post.author_name}</p>
        </header>

        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            width={1200}
            height={630}
            className="mt-10 aspect-[1200/630] w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)]"
          />
        ) : null}

        <div
          className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:tracking-tight prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-14 border-t border-border pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
        </footer>
      </article>

      <SiteFooter />
    </div>
  );
}
