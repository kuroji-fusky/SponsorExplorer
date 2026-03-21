<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "./navbar.svelte";
  import Footer from "./footer.svelte";

  // Load font sources for preloading
  import _inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
  import _inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
  import _inter700 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";
  import { pwaInfo } from "virtual:pwa-info";
  import { Sidebar } from "$lib/components";
  import clientInit from "$lib/init";

  const _forPreload = [_inter400, _inter600, _inter700];

  const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");

  const { children } = $props();

  $effect.pre(() => clientInit());
</script>

<svelte:head>
  {@html webManifest}
  <link rel="icon" href={favicon} />
  <!-- Preload fonts -->
  {#each _forPreload as font}
    <link rel="prefetch" href={font} as="font" crossorigin="anonymous" />
  {/each}
  <!-- Preload proxy server -->
  <link rel="preconnect" href="http://localhost:4000/" crossorigin="anonymous" />
  <!-- Preload third-party crap -->
  <link rel="preconnect" href="https://www.youtube-nocookie.com" crossorigin="anonymous" />
</svelte:head>

<div class="grid min-h-screen">
  <Navbar />
  <div class="flex mt-14">
    <Sidebar />
    <div class="flex-1 h-full grid grid-rows-[1fr_auto]">
      {@render children?.()}
      <Footer />
    </div>
  </div>
</div>
