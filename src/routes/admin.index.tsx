import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { listAllPostsAdmin, deletePost } from "@/lib/blog.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const list = useServerFn(listAllPostsAdmin);
  const del = useServerFn(deletePost);
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => list(),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["posts", "published"] });
      router.invalidate();
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your blog content. Drafts stay private; publishing makes a post live and
            discoverable on Google.
          </p>
        </div>
        <Link
          to="/admin/new"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : error ? (
          <p className="p-6 text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load posts"}
          </p>
        ) : !data || data.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-base font-semibold">No posts yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Click <span className="font-medium">New post</span> to write your first article.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Updated</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " +
                        (p.published
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary text-muted-foreground")
                      }
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {p.published ? (
                        <a
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> View
                        </a>
                      ) : null}
                      <Link
                        to="/admin/$id"
                        params={{ id: p.id }}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-foreground hover:bg-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${p.title}"? This cannot be undone.`)) {
                            mutation.mutate(p.id);
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
