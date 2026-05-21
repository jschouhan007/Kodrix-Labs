import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Shield,
  Sparkles,
  Smartphone,
  Zap,
  Lock,
  Mail,
  Hexagon,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Kodrix Labs — Independent App Studio" },
      {
        name: "description",
        content:
          "Kodrix Labs is an independent studio building useful, privacy-respecting mobile apps. Explore our apps including Pagify and their privacy policies.",
      },
      { property: "og:title", content: "Kodrix Labs — Independent App Studio" },
      {
        property: "og:description",
        content: "Useful, privacy-respecting apps. Meet our products and policies.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

type App = {
  slug: "pagify";
  name: string;
  tagline: string;
  description: string;
  status: "Live" | "In development" | "Beta";
  category: string;
  icon: typeof BookOpen;
  accent: string;
};

const APPS: App[] = [
  {
    slug: "pagify",
    name: "Pagify",
    tagline: "Read, organize, and rediscover.",
    description:
      "A clean, distraction-free reading and notes companion designed to make every page feel intentional.",
    status: "Live",
    category: "Productivity · Reading",
    icon: BookOpen,
    accent: "from-blue-500 to-indigo-500",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--gradient-hero)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Independent app studio
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            We build apps people{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              actually love using.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Kodrix Labs is a small team obsessed with clean design, fast performance, and respect
            for your data. Every product we ship is built around a single rule —{" "}
            <span className="font-medium text-foreground">your privacy is not the product</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#apps"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              Explore our apps
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              About the studio
            </a>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { value: "100%", label: "Compliance-first" },
              { value: "0", label: "Data sold, ever" },
              { value: "1+", label: "Apps shipped" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur"
              >
                <p className="text-3xl font-bold tracking-tight text-foreground">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The studio
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Small team. High standards. Useful software.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Kodrix Labs is an indie mobile studio focused on shipping focused, polished Android
              apps. We don't chase trends — we build products that solve a real problem and stay
              out of the way.
            </p>
            <p>
              Every app we publish is paired with a transparent, jurisdiction-aware privacy policy
              covering Google Play, AdMob, GDPR, CCPA, and COPPA so you always know exactly what
              data is collected and why.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              How we work
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Three rules we don't break.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Privacy by default",
                body: "We collect the minimum data needed to make the app work. No dark patterns, no surprise tracking.",
              },
              {
                icon: Zap,
                title: "Fast, always",
                body: "Snappy launch times, lean APKs, and battery-friendly background behavior on every release.",
              },
              {
                icon: Smartphone,
                title: "Made for real devices",
                body: "Tested across Android versions, screen sizes, and connection speeds — not just flagships.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Our apps
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Apps by Kodrix Labs
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tap any card to view app details and its complete privacy policy.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {APPS.length} {APPS.length === 1 ? "app" : "apps"} · more on the way
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}

            {/* Coming-soon card */}
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                <Hexagon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">More apps coming soon</p>
              <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
                We're cooking up the next one. Watch this space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-10 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-14"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
                  <Shield className="h-3.5 w-3.5" />
                  Privacy · Support · Partnership
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Get in touch with Kodrix Labs.
                </h2>
                <p className="mt-3 max-w-xl text-primary-foreground/85">
                  Have a question about one of our apps, a data request under GDPR or CCPA, or a
                  partnership idea? We read every email.
                </p>
              </div>
              <a
                href="mailto:kodrixlabs007@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                kodrixlabs007@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  const Icon = app.icon;
  return (
    <Link
      to="/apps/$slug"
      params={{ slug: app.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${app.accent} text-white shadow-md`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {app.status}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{app.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {app.category}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{app.description}</p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="font-medium text-foreground">View details</span>
        <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
