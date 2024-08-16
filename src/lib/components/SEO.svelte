<script lang="ts">
  export let title = ""
  export let description = ""

  const SITE_TITLE = "SponsorExplorer"
  const SITE_AUTHOR = "@kurojifusky"

  const parsedTitle = !title ? title : `${title} - ${SITE_TITLE}`
</script>

<svelte:head>
  <title>{parsedTitle}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={parsedTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={SITE_TITLE} />
  <meta name="twitter:author" content={SITE_AUTHOR} />

  <link rel="manifest" href="manifest.json" />
</svelte:head>
