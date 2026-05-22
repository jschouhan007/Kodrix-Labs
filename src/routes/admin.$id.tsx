import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getPostAdmin } from "@/lib/blog.functions";
import { PostEditor } from "./admin.new";

export const Route = createFileRoute("/admin/$id")({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const fetcher = useServerFn(getPostAdmin);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "post", id],
    queryFn: () => fetcher({ data: { id } }),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <p className="mx-auto max-w-3xl px-6 py-10 text-sm text-destructive">
        {error instanceof Error ? error.message : "Post not found"}
      </p>
    );
  }
  return <PostEditor mode="edit" initial={data} />;
}
