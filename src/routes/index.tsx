import { createFileRoute } from "@tanstack/react-router";
import { Shield, Mail, Database, Cookie, Baby, Globe, RefreshCw, Lock, FileText, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Privacy Policy — [YOUR APP NAME]" },
      {
        name: "description",
        content:
          "Privacy Policy for [YOUR APP NAME], compliant with Google Play, Google AdMob, GDPR, CCPA and COPPA requirements.",
      },
      { property: "og:title", content: "Privacy Policy — [YOUR APP NAME]" },
      { property: "og:description", content: "Our commitment to your privacy and data protection." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const APP_NAME = "[YOUR APP NAME]";
const COMPANY = "[YOUR COMPANY / DEVELOPER NAME]";
const EMAIL = "[YOUR CONTACT EMAIL]";
const WEBSITE = "[YOUR WEBSITE URL]";
const EFFECTIVE_DATE = "May 21, 2026";

const sections = [
  { id: "introduction", label: "Introduction", icon: FileText },
  { id: "information-we-collect", label: "Information We Collect", icon: Database },
  { id: "how-we-use", label: "How We Use Information", icon: ChevronRight },
  { id: "admob", label: "Google AdMob & Advertising", icon: Globe },
  { id: "third-party", label: "Third-Party Services", icon: Globe },
  { id: "cookies", label: "Cookies & Tracking", icon: Cookie },
  { id: "data-security", label: "Data Security", icon: Lock },
  { id: "data-retention", label: "Data Retention", icon: RefreshCw },
  { id: "childrens-privacy", label: "Children's Privacy (COPPA)", icon: Baby },
  { id: "your-rights", label: "Your Rights (GDPR / CCPA)", icon: Shield },
  { id: "changes", label: "Changes to This Policy", icon: RefreshCw },
  { id: "contact", label: "Contact Us", icon: Mail },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header
        className="relative overflow-hidden border-b border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur">
            <Shield className="h-3.5 w-3.5" />
            Legal · Privacy
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">
            How {APP_NAME} collects, uses, and protects your information — written to comply with
            Google Play, Google AdMob, GDPR, CCPA, and COPPA.
          </p>
          <p className="mt-6 text-sm text-primary-foreground/70">
            Effective date: <span className="font-medium text-primary-foreground">{EFFECTIVE_DATE}</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <s.icon className="h-4 w-4 text-primary/70 transition-colors group-hover:text-primary" />
                  <span>{s.label}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="prose-policy">
            <Section id="introduction" icon={FileText} title="1. Introduction">
              <p>
                {COMPANY} ("we", "our", or "us") operates the mobile application {APP_NAME}
                (the "App"). This Privacy Policy explains what information we collect when you use
                our App, how we use it, and the choices you have. By downloading or using the App,
                you agree to the practices described here.
              </p>
            </Section>

            <Section id="information-we-collect" icon={Database} title="2. Information We Collect">
              <h3>2.1 Information you provide</h3>
              <p>
                We may collect information you voluntarily provide, such as your name, email address,
                or any content you submit through forms within the App.
              </p>
              <h3>2.2 Information collected automatically</h3>
              <ul>
                <li><strong>Device data:</strong> model, OS version, language, country, and unique device identifiers.</li>
                <li><strong>Usage data:</strong> screens viewed, features used, time spent, crash logs.</li>
                <li><strong>Advertising identifiers:</strong> Google Advertising ID (AAID) for ad personalization and frequency capping.</li>
                <li><strong>Approximate location:</strong> derived from IP address (we do not collect precise GPS location unless explicitly enabled).</li>
                <li><strong>Network info:</strong> IP address, mobile network, connection type.</li>
              </ul>
            </Section>

            <Section id="how-we-use" icon={ChevronRight} title="3. How We Use Your Information">
              <ul>
                <li>To provide, maintain, and improve App functionality.</li>
                <li>To personalize content and serve relevant advertisements.</li>
                <li>To analyze usage and diagnose technical issues.</li>
                <li>To detect, prevent, and address fraud or abuse.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </Section>

            <Section id="admob" icon={Globe} title="4. Google AdMob & Advertising">
              <p>
                Our App uses <strong>Google AdMob</strong>, a mobile advertising service provided by
                Google LLC, to display advertisements. AdMob may collect and process data including
                your Advertising ID, IP address, device information, and interaction with ads to
                deliver personalized advertising.
              </p>
              <p>
                For users in the European Economic Area (EEA), United Kingdom, and Switzerland, we
                use the <strong>Google-certified Consent Management Platform (CMP)</strong> to obtain
                consent for personalized ads in accordance with the EU User Consent Policy and IAB
                TCF v2.2.
              </p>
              <p>You can control ad personalization at any time:</p>
              <ul>
                <li><strong>Android:</strong> Settings → Google → Ads → "Delete advertising ID" or "Opt out of Ads Personalization".</li>
                <li>Learn more at{" "}
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                    Google Ads & Privacy Policy
                  </a>.
                </li>
              </ul>
            </Section>

            <Section id="third-party" icon={Globe} title="5. Third-Party Services">
              <p>
                We use trusted third-party providers that may collect information used to identify
                you. Each is bound by their own privacy policy:
              </p>
              <ul>
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google Play Services
                  </a>
                </li>
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google AdMob
                  </a>
                </li>
                <li>
                  <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
                    Firebase Analytics & Crashlytics
                  </a>
                </li>
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google Sign-In
                  </a>{" "}
                  (if applicable)
                </li>
              </ul>
            </Section>

            <Section id="cookies" icon={Cookie} title="6. Cookies & Similar Technologies">
              <p>
                The App and our advertising partners may use cookies, web beacons, SDKs, and similar
                tracking technologies to collect information about your usage and deliver targeted
                content and ads.
              </p>
            </Section>

            <Section id="data-security" icon={Lock} title="7. Data Security">
              <p>
                We use industry-standard administrative, technical, and physical safeguards to
                protect your information. Data in transit is encrypted using TLS. However, no method
                of transmission over the internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </Section>

            <Section id="data-retention" icon={RefreshCw} title="8. Data Retention">
              <p>
                We retain personal information only for as long as necessary to fulfill the purposes
                outlined in this Privacy Policy, unless a longer retention period is required by law.
                You may request deletion of your data at any time by contacting us.
              </p>
            </Section>

            <Section id="childrens-privacy" icon={Baby} title="9. Children's Privacy (COPPA)">
              <p>
                Our App is not directed to children under the age of 13 (or the equivalent minimum
                age in the relevant jurisdiction). We do not knowingly collect personal information
                from children. If you believe a child has provided us with personal information,
                please contact us and we will delete it promptly.
              </p>
            </Section>

            <Section id="your-rights" icon={Shield} title="10. Your Rights (GDPR & CCPA)">
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access, correct, or delete personal data we hold about you.</li>
                <li>Object to or restrict certain processing of your data.</li>
                <li>Request portability of your data.</li>
                <li>Withdraw consent at any time.</li>
                <li>Opt out of the "sale" or "sharing" of personal information (CCPA).</li>
                <li>Lodge a complaint with your local data protection authority.</li>
              </ul>
              <p>To exercise any of these rights, email us at{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            </Section>

            <Section id="changes" icon={RefreshCw} title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. The "Effective date" at the top
                indicates when it was last revised. Material changes will be communicated through the
                App or via the contact information you provided.
              </p>
            </Section>

            <Section id="contact" icon={Mail} title="12. Contact Us">
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices,
                please contact us:
              </p>
              <div className="not-prose mt-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-muted-foreground">Developer</dt>
                    <dd className="mt-1 text-foreground">{COMPANY}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">App</dt>
                    <dd className="mt-1 text-foreground">{APP_NAME}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Email</dt>
                    <dd className="mt-1">
                      <a className="text-primary hover:underline" href={`mailto:${EMAIL}`}>
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Website</dt>
                    <dd className="mt-1 text-foreground">{WEBSITE}</dd>
                  </div>
                </dl>
              </div>
            </Section>
          </article>
        </div>
      </div>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          <p>Last updated: {EFFECTIVE_DATE}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-border py-10 first:pt-0 last:border-b-0">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}
