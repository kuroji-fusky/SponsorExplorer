<script>
  import "../app.css"
  import "@fontsource/inter"
  import "@fontsource/inter/600.css"
  import "@fontsource/inter/700.css"
  import { Navbar, Footer } from "$lib/components/Base"
</script>

<Navbar />
<main class="min-h-[calc(100dvh-4.75rem)] px-6 mx-auto max-w-screen-2xl">
  <slot />
</main>
<Footer />

<style lang="postcss">
  :global(:root) {
    --sb-intermission: #00ffff;
    --sb-selfpromo: #ffff00;
    --sb-sponsor: #00d400;
    --sb-interaction: #cc00ff;
    --sb-preview: #008fd6;
    --sb-endcards: #0202ed;
    --sb-filler: #7300ff;
    --sb-exclusive-access: #008a5c;
    --sb-non-music: #ff9900;
    --sb-highlight: #ff1684;
  }
</style>
