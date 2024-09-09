import { _Link as Link } from "../Link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-4 bg-neutral-900 border-t border-neutral-600">
      <div className="px-6 py-8 mx-auto max-w-screen-2xl">
        <article className="last:prose-p:mb-0 prose-p:mb-1.5">
          <p>
            <strong>SponsorExplorer</strong> is a rewrite of the
            <Link href="https://sb.ltn.fi" external>
              SBbrowser
            </Link>{" "}
            frontend with additional features and a modern and intuitive UI!
            Utilizing SponsorBlock and YouTube Data APIs and crawls the
            SBbrowser database for user submitted segments.
          </p>
        </article>
        <div className="pt-3 border-t border-neutral-400 mt-4 flex items-center gap-x-2">
          <span className="flex-1">{`© ${currentYear} Kerby Keith Aquino`}</span>
          <Link
            className="inline-flex items-center"
            href="https://github.com/kurojifusky/SponsorExplorer"
            external
          >
            <span>Source code</span>
            <ExternalLinkIcon size={17} className="ml-1" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
