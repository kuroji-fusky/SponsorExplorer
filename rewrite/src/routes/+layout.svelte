<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/layouts/Navbar.svelte";
  import Footer from "$lib/layouts/Footer.svelte";

  // Load font sources for preloading
  import _inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
  import _inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
  import _inter700 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";

  const _forPreload = [_inter400, _inter600, _inter700];

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <!-- Preload fonts -->
  {#each _forPreload as font}
    <link rel="prefetch" href={font} as="font" crossorigin="anonymous" />
  {/each}
</svelte:head>

<Navbar />
<div class="contents">
  {@render children?.()}
  <Footer />
</div>
