import Link from "next/link";
import type { ReactNode } from "react";

const AuthLogo = () => {
  return (
    <div className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 shadow-lg shadow-black/40 ring-1 ring-white/10">
      <span className="font-heading text-xl font-bold leading-none text-foreground">
        F
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent"
      />
    </div>
  );
};

type AuthFooter = {
  label: string;
  linkText: string;
  linkHref: string;
};

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  footer: AuthFooter;
  children: ReactNode;
};

export const AuthLayout = ({
  title,
  subtitle,
  footer,
  children,
}: AuthLayoutProps) => {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-900 px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] [background:radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]"
      />

      <div className="flex w-full max-w-sm flex-col items-stretch gap-8">
        <div className="flex flex-col items-center gap-6">
          <AuthLogo />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-zinc-800/40 p-6 backdrop-blur-sm sm:p-8">
          {children}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {footer.label}{" "}
          <Link
            href={footer.linkHref}
            className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            tabIndex={0}
          >
            {footer.linkText}
          </Link>
        </p>
      </div>
    </main>
  );
};
