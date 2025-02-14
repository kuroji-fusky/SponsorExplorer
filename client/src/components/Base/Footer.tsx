import { _Link as Link } from "../Link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-4 dark:bg-neutral-900 border-t border-neutral-600">
      <footer className="px-6 py-7 mx-auto max-w-screen-2xl">
        <div className="flex items-center gap-x-2">
          <span className="flex-1">
            {`© ${currentYear} `}
            <Link
              className="no-underline inline-flex items-center"
              href="https://kuroji.fusky.pet"
            >
              Kuroji Fusky, licensed under Apache-2.0
            </Link>
          </span>

          <div className="space-x-3.5">
            <Link className="inline-flex items-center" href="/about">
              About
            </Link>
            <Link
              className="inline-flex items-center"
              href="https://github.com/kuroji-fusky/SponsorExplorer"
            >
              Source
            </Link>
            <span className="font-mono">DEVELOPMENT</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
