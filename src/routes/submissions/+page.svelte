<script lang="ts">
  import { SEO } from "$lib/components"
  import Link from "$lib/components/Link.svelte"
  import Notice from "$lib/components/Notice.svelte"
</script>

<SEO title="Submissions from [username]" />

<Notice heading="Note">
  The data you see here, including your existing localStorage cache on your
  browser, crawls data directly from <Link href="https://sb.ltn.fi" external
    >sb.ltn.fi</Link
  >; as SponsorExplorer doesn't provide its own dedicated database and relies on
  third-party databases instead, and the official SponsorBlock API doesn't
  include all of the user's submitted segments from videos by default.
  <br />
  <button
    class="border px-2.5 py-1 rounded-md mt-2 border-neutral-300 hover:border-neutral-400"
    >Dismiss</button
  >
</Notice>

<div>submission page</div>
