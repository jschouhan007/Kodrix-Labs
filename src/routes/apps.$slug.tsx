import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Shield } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type AppDetail = {
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  highlights: string[];
  privacyPath: "/apps/pagify/privacy";
  accent: string;
  icon: typeof BookOpen;
};

const APPS: Record<string, AppDetail> = {
  pagify: {
    name: "Pagify",
    tagline: "Read, organize, and rediscover.",
    description:
      "Pagify is a focused reading & notes companion for Android. Capture pages, annotate, and come back to what matters — without ads in your face or trackers in your pocket.",
    category: "Productivity · Reading",
    status: "Live",
    highlights: [
      "Distraction-free reading mode",
      "Powerful search across notes and pages",
      "Privacy-first analytics — no personal profiling",
      "Lightweight, fast, and battery-aware",
    ],
    privacyPath: "/apps/pagify/privacy",
    accent: "from-blue-500 to-indigo-500",
    icon: BookOpen,
  },
};

export const Route = createFileRoute("/apps/$slug")({
  loader: ({ params }) => {
    const app = APPS[params.slug];
    if (!app) throw notFound();
    return { app };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.app.name ?? "App";
    const desc = loaderData?.app.description ?? "An app by Kodrix Labs.";
    return {
      meta: [
        { title: `${name} — Kodrix Labs` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Kodrix Labs` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-foreground">App not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find that app. It may have been moved or doesn't exist yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Kodrix Labs
        </Link>
      </div>
    </div>
  ),
  component: AppPage,
});

function AppPage() {
  const { app } = Route.useLoaderData();
  const Icon = app.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{ background: "var(--gradient-hero)" }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All apps
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${app.accent} text-white shadow-[var(--shadow-elegant)]`}
            >
              <Icon className="h-10 w-10" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {app.category}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {app.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{app.tagline}</p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {app.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={app.privacyPath}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Shield className="h-4 w-4" />
              View privacy policy
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:kodrixlabs007@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Contact support
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Highlights
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              What makes {app.name} different
            </h2>
          </div>
          <ul className="space-y-4">
            {app.highlights.map((h: string) => (
              <li
                key={h}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed text-foreground">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
