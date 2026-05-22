import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { upsertPost, type AdminPost } from "@/lib/blog.functions";
import { renderMarkdown } from "@/lib/markdown";

export type EditorMode = "new" | "edit";

export function PostEditor({ mode, initial }: { mode: EditorMode; initial?: AdminPost }) {
  const save = useServerFn(upsertPost);
  const navigate = useNavigate();
  const router = useRouter();
  const qc = useQueryClient();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugDirty, setSlugDirty] = useState(Boolean(initial));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [metaDescription, setMetaDescription] = useState(initial?.meta_description ?? "");
  const [cover, setCover] = useState(initial?.cover_image_url ?? "");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [appSlug, setAppSlug] = useState(initial?.app_slug ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    if (!slugDirty) {
      const auto = title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80);
      setSlug(auto);
    }
  }, [title, slugDirty]);

  const preview = useMemo(() => renderMarkdown(content), [content]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const res = await save({
        data: {
          id: initial?.id,
          title,
          slug,
          excerpt,
          meta_description: metaDescription || excerpt.slice(0, 160),
          cover_image_url: cover.trim() ? cover.trim() : null,
          tags: tagList,
          app_slug: appSlug || null,
          content,
          published,
        },
      });
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["posts", "published"] });
      qc.invalidateQueries({ queryKey: ["post", res.slug] });
      router.invalidate();
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Title
          </label>
          <input
            required
            maxLength={160}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A descriptive, keyword-rich title"
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-2xl font-bold tracking-tight"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Slug · /blog/<span className="text-foreground">{slug || "your-slug"}</span>
            </label>
            <input
              required
              maxLength={120}
              pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
              value={slug}
              onChange={(e) => {
                setSlugDirty(true);
                setSlug(e.target.value);
              }}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Related app (optional)
            </label>
            <input
              maxLength={80}
              value={appSlug}
              onChange={(e) => setAppSlug(e.target.value)}
              placeholder="pagify"
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Excerpt
          </label>
          <textarea
            maxLength={320}
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="One or two sentences shown on cards and used as fallback meta description."
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Meta description (SEO)
            </label>
            <textarea
              maxLength={180}
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Under 160 chars. Falls back to excerpt."
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <p className="mt-1 text-[10px] text-muted-foreground">
              {metaDescription.length}/160 characters
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags (comma separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="android, release-notes, pagify"
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cover image URL (1200×630 recommended for OG)
          </label>
          <input
            type="url"
            maxLength={500}
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="https://..."
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Content (Markdown)
            </label>
            <div className="inline-flex rounded-md border border-border bg-card p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setTab("write")}
                className={
                  "rounded px-3 py-1 " +
                  (tab === "write" ? "bg-secondary text-foreground" : "text-muted-foreground")
                }
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={
                  "rounded px-3 py-1 " +
                  (tab === "preview" ? "bg-secondary text-foreground" : "text-muted-foreground")
                }
              >
                Preview
              </button>
            </div>
          </div>
          {tab === "write" ? (
            <textarea
              required
              rows={22}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"# Heading\n\nWrite your post in Markdown. Use ## subheadings, **bold**, _italic_, lists, and [links](https://example.com)."}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-3 font-mono text-sm leading-relaxed"
            />
          ) : (
            <div
              className="prose prose-neutral dark:prose-invert mt-1.5 min-h-[400px] max-w-none rounded-md border border-border bg-background p-6"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          )}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span className="text-sm">
              <span className="font-semibold text-foreground">Publish</span>
              <span className="ml-2 text-muted-foreground">
                Makes the post visible on /blog and in the sitemap.
              </span>
            </span>
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] disabled:opacity-60"
            style={{ background: "var(--gradient-hero)" }}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {mode === "new" ? "Create post" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export const Route = createFileRoute("/admin/new")({
  component: () => <PostEditor mode="new" />,
});
