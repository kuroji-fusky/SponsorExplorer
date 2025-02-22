import { _Link as Link } from "../Link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-4 dark:bg-neutral-900 border-t border-neutral-600">
      <footer className="px-6 py-7 mx-auto max-w-screen-2xl space-y-3.5">
        <div className="flex items-center justify-between gap-x-2">
          <div>Status placeholder</div>
          <div className="space-x-3.5">
            <Link className="inline-flex items-center" href="/about">
              About SponsorExplorer
            </Link>
            <Link
              className="inline-flex items-center"
              href="https://github.com/kuroji-fusky/SponsorExplorer"
            >
              Source code
            </Link>
            <span className="font-mono">DEVELOPMENT</span>
          </div>
        </div>
        <div className="text-xs">
          <span className="opacity-75">{`© 2024-${currentYear} `}</span>
          <Link href="https://github.com/kuroji-fusky">Kuroji Fusky</Link>
          <span className="opacity-75">{"; licensed under the "}</span>
          <Link href="https://opensource.org/license/mit">
            MIT
          </Link>
          <span className="opacity-75">{" license."}</span>
        </div>
      </footer>
    </div>
  )
}
