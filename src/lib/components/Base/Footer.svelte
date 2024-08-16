<script>
  import Link from "../Link.svelte"
  import { env } from "$env/dynamic/public"

  const currentYear = new Date().getFullYear()

  const commitSha = env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

<footer class="mt-4 bg-neutral-900 border-t border-neutral-600">
  <div class="px-6 py-8 mx-auto max-w-screen-2xl">
    <article class="last:prose-p:mb-0 prose-p:mb-1.5">
      <p>
        <strong>SponsorExplorer</strong> is a modern rewrite of
        <Link href="https://sb.ltn.fi" external>SBbrowser</Link> with additional
        features and an intuitive UI!
      </p>
    </article>
    <div
      class="pt-3 border-t border-neutral-400 mt-4 flex items-center gap-x-2"
    >
      <span class="flex-1"
        >{`© ${currentYear} Kerby Keith Aquino; licensed under MIT`}</span
      >
      <Link href="https://github.com/kurojifusky/SponsorExplorer" external
        >Source code</Link
      >
      {#if commitSha}
        <a href={commitSha} target="_blank">{commitSha.substring(0, 8)}</a>
      {/if}
    </div>
  </div>
</footer>
