import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type PublicPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  meta_description: string;
  tags: string[];
  app_slug: string | null;
  author_name: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminPost = PublicPost & { published: boolean };

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const PostInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(slugRe, "Use lowercase letters, numbers and hyphens"),
  title: z.string().min(1).max(160),
  excerpt: z.string().max(320).default(""),
  meta_description: z.string().max(180).default(""),
  content: z.string().max(100_000).default(""),
  cover_image_url: z.string().url().max(500).nullable().optional(),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  app_slug: z.string().max(80).nullable().optional(),
  published: z.boolean().default(false),
});

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

// ---------- Public ----------

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select(
      "id,slug,title,excerpt,cover_image_url,meta_description,tags,app_slug,author_name,published_at,created_at,updated_at,content",
    )
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []) as PublicPost[];
});

export const getPublishedPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(120).regex(slugRe) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("posts")
      .select(
        "id,slug,title,excerpt,content,cover_image_url,meta_description,tags,app_slug,author_name,published_at,created_at,updated_at",
      )
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as PublicPost | null;
  });

// ---------- Admin ----------

export const listAllPostsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select(
        "id,slug,title,excerpt,content,cover_image_url,meta_description,tags,app_slug,author_name,published,published_at,created_at,updated_at",
      )
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminPost[];
  });

export const getPostAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { data: row, error } = await supabaseAdmin
      .from("posts")
      .select(
        "id,slug,title,excerpt,content,cover_image_url,meta_description,tags,app_slug,author_name,published,published_at,created_at,updated_at",
      )
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Post not found");
    return row as AdminPost;
  });

export const upsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PostInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const now = new Date().toISOString();
    const payload = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? "",
      meta_description: data.meta_description ?? "",
      content: data.content ?? "",
      cover_image_url: data.cover_image_url ?? null,
      tags: data.tags ?? [],
      app_slug: data.app_slug ?? null,
      published: data.published,
      published_at: data.published ? now : null,
    };

    if (data.id) {
      const { data: existing } = await supabaseAdmin
        .from("posts")
        .select("published_at,published")
        .eq("id", data.id)
        .maybeSingle();
      // preserve original published_at if it was already published
      if (existing?.published && existing.published_at) {
        payload.published_at = existing.published_at;
      }
      const { data: row, error } = await supabaseAdmin
        .from("posts")
        .update(payload)
        .eq("id", data.id)
        .select("id,slug")
        .single();
      if (error) throw new Error(error.message);
      return row;
    }
    const { data: row, error } = await supabaseAdmin
      .from("posts")
      .insert(payload)
      .select("id,slug")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Sitemap helper ----------

export const listPublishedSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("slug,updated_at,published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});
