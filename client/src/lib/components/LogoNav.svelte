<script lang="ts">
  import {
    SIDEBAR_OPEN as SIDEBAR_OPEN_DESKTOP,
    SIDEBAR_OPEN_MOBILE,
    IS_MOBILE,
  } from "$lib/stores";
  import { page } from "$app/state";
  import { ChevronsUpDownIcon, MenuIcon } from "@lucide/svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";

  const { mobile_layout = false }: { mobile_layout?: boolean } = $props();

  const persistRoutes = ["/docs", "/about"];

  function toggleSidebar() {
    const IN_PERSISTED_ROUTE = persistRoutes.some(
      (x) => location.pathname.startsWith(x) || location.pathname === "/",
    );

    console.log(IN_PERSISTED_ROUTE, IN_PERSISTED_ROUTE && !$IS_MOBILE);

    if (IN_PERSISTED_ROUTE) {
      SIDEBAR_OPEN_MOBILE.set(!$SIDEBAR_OPEN_MOBILE);
      return;
    }
    if (!$IS_MOBILE) {
      SIDEBAR_OPEN_DESKTOP.set(!$SIDEBAR_OPEN_DESKTOP);
      return;
    }

    if ($IS_MOBILE) {
      SIDEBAR_OPEN_MOBILE.set(!$SIDEBAR_OPEN_MOBILE);
      return;
    }
  }

  const isRootPath = $derived(page.url.pathname === "/");
</script>

<button
  onclick={toggleSidebar}
  class="p-2 cursor-pointer rounded-md"
  aria-controls="sidebar-contents"
>
  <MenuIcon size={20} />
</button>
<div class="flex items-center gap-x-2.5 ml-1">
  <div
    class={!mobile_layout
      ? "hidden md:inline-flex items-center hover:bg-neutral-800/75 rounded-md"
      : "inline-flex items-center"}
  >
    <a href="/" class="text-lg font-bold px-2 py-0.5">SponsorExplorer</a>
    <button
      class="px-1 py-2 hover:bg-neutral-700/50 cursor-pointer rounded-tr-md rounded-br-md hover:opacity-100 opacity-60"
    >
      <ChevronsUpDownIcon size={15} />
    </button>
  </div>
  {#if !isRootPath}
    {#if !mobile_layout}
      <Breadcrumbs
        crumb1={{ kind: "default", text: "Channel", href: "/channel/a" }}
      />
    {/if}
  {/if}
</div>
