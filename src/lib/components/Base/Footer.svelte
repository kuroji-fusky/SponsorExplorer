<script>
  import Link from "../Link.svelte"
  import ExternalLink from "lucide-svelte/icons/external-link"

  const currentYear = new Date().getFullYear()
</script>

<footer class="mt-4 bg-neutral-900 border-t border-neutral-600">
  <div class="px-6 py-8 mx-auto max-w-screen-2xl">
    <article class="last:prose-p:mb-0 prose-p:mb-1.5">
      <p>
        <strong>SponsorExplorer</strong> is a rewrite of the
        <Link href="https://sb.ltn.fi" external>SBbrowser</Link> frontend with additional
        features and a modern and intuitive UI! Utilizing SponsorBlock and YouTube
        Data APIs and crawls the SBbrowser database for user submitted segments.
      </p>
    </article>
    <div
      class="pt-3 border-t border-neutral-400 mt-4 flex items-center gap-x-2"
    >
      <span class="flex-1">{`© ${currentYear} Fusky Labs Software Ltd.`}</span>
      <Link
        class="inline-flex items-center"
        href="https://github.com/kurojifusky/SponsorExplorer"
        external
      >
        <span>Source code</span>
        <ExternalLink size={17} class="ml-1" />
      </Link>
    </div>
  </div>
</footer>
