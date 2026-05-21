import { Link } from "@tanstack/react-router";
import { Hexagon, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Hexagon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">Kodrix Labs</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An independent app studio crafting useful, privacy-respecting mobile experiences for
              Android and beyond.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Studio</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#apps" className="text-muted-foreground hover:text-foreground">
                  Our apps
                </a>
              </li>
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-foreground">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:kodrixlabs007@gmail.com"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" />
                  kodrixlabs007@gmail.com
                </a>
              </li>
              <li>
                <Link
                  to="/apps/pagify/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pagify privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Kodrix Labs. All rights reserved.</p>
          <p>Made with care for our users.</p>
        </div>
      </div>
    </footer>
  );
}
