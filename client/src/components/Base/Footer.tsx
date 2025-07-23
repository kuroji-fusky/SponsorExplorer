import { _Link as Link } from "../Link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 pt-12 pb-6 mx-auto max-w-screen-2xl space-y-3.5">
      <div className="flex items-center justify-between gap-x-2">
        <p className="text-xs">
          <span className="opacity-75">{`© 2024-${currentYear} `}</span>
          <Link href="https://kurojifusky.com">Kuroji Fusky</Link>
          <span className="opacity-75">
            {". Licensed under the "}
          </span>
          <Link href="https://opensource.org/license/mit">MIT</Link>
          <span className="opacity-75">{" license."}</span>
        </p>
        <div className="space-x-3.5">
          <Link className="inline-flex items-center" href="/about">
            About
          </Link>
          <Link
            className="inline-flex items-center"
            href="https://github.com/kuroji-fusky/SponsorExplorer"
          >
            Source code
          </Link>
        </div>
      </div>
    </footer>
  )
}
