import { Link } from "@tanstack/react-router";
import { Hexagon } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-elegant)]"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Hexagon className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">Kodrix Labs</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Build · Ship · Delight
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground bg-secondary" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-secondary/60" }}
            className="rounded-md px-3 py-2 transition-colors"
          >
            Home
          </Link>
          <a
            href="/#apps"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Apps
          </a>
          <a
            href="/#contact"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
