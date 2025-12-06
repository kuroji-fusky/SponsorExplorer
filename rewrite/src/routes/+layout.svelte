<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/layouts/Navbar.svelte";
  import Footer from "$lib/components/layouts/Footer.svelte";

  // Load font sources for preloading
  import _inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
  import _inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
  import _inter700 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";
  import { pwaInfo } from "virtual:pwa-info";
  import Sidebar from "$lib/components/layouts/Sidebar.svelte";

  const _forPreload = [_inter400, _inter600, _inter700];

  const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");

  const { children } = $props();
</script>

<svelte:head>
  {@html webManifest}
  <link rel="icon" href={favicon} />
  <!-- Preload fonts -->
  {#each _forPreload as font}
    <link rel="prefetch" href={font} as="font" crossorigin="anonymous" />
  {/each}
</svelte:head>

<div class="grid grid-rows-[auto_1fr] min-h-screen">
  <Navbar />
  <div class="flex">
    <Sidebar />
    <div class="flex-1 h-full grid grid-rows-[1fr_auto] col-span-2">
      <main>
        {@render children?.()}
      </main>
      <Footer />
    </div>
  </div>
</div>
