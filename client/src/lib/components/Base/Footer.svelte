<script>
  import Link from "../Link.svelte"

  const currentYear = new Date().getFullYear()
</script>

<footer class="mt-4 bg-slate-100 border-t border-slate-600">
  <div class="px-6 py-8 mx-auto max-w-screen-2xl">
    <article class="last:prose-p:mb-0 prose-p:mb-1.5">
      <p>
        <strong>SponsorExplorer</strong> is a modern rewrite of
        <Link href="https://sb.ltn.fi" external>SBbrowser</Link> with additional features!
      </p>
    </article>
    <div class="pt-3 border-t border-slate-400 mt-4 flex items-center gap-x-2">
      <span>{`© ${currentYear} Kerby Keith Aquino; licensed under MIT License`}</span>
      <Link href="https://github.com/kuroji-fusky/SponsorExplorer" external
        >Source code</Link
      >
      <span>COMMIT_HASH</span>
    </div>
  </div>
</footer>
