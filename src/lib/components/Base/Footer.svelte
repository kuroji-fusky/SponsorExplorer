<script>
  import Link from "../Link.svelte"

  const currentYear = new Date().getFullYear()
</script>

<footer>
  <article>
    <p>
      <strong>SponsorExplorer</strong> is a modern rewrite of
      <Link href="https://sb.ltn.fi" external>SBbrowser</Link>
      with additional features such as play submitted segments, and others that rely on the
      YouTube Data API.
    </p>
    <p>
      Uses SponsorBlock data licensed under CC BY-NC-SA from <Link
        href="https://sponsor.ajay.app"
        external>https://sponsor.ajay.app</Link
      >.
    </p>
    <p>{`© ${currentYear} Kuroji Fusky`}</p>
  </article>
</footer>
