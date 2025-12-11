<script lang="ts">
  import { SIDEBAR_OPEN, SIDEBAR_OPEN_MOBILE, IS_MOBILE } from "$lib/stores";
  import { ChevronsUpDownIcon, MenuIcon } from "@lucide/svelte";

  const { mobile_layout = false }: { mobile_layout?: boolean } = $props();

  function toggleSidebar() {
    if (!$IS_MOBILE) {
      SIDEBAR_OPEN.set(!$SIDEBAR_OPEN);
      return;
    }

    SIDEBAR_OPEN_MOBILE.set(!$SIDEBAR_OPEN_MOBILE);
    return;
  }
</script>

<button
  onclick={toggleSidebar}
  class="p-2 cursor-pointer rounded-md"
  aria-controls="sidebar-contents"
>
  <MenuIcon size={20} />
</button>
<div class="flex items-center gap-x-2.5 ml-1">
  <div class="inline-flex items-center hover:bg-neutral-800/75 rounded-md">
    <a href="/" class="text-lg font-bold px-2 py-0.5">SponsorExplorer</a>
    {#if !mobile_layout}
      <button
        class="px-1 py-2 hover:bg-neutral-700/50 cursor-pointer rounded-tr-md rounded-br-md"
      >
        <ChevronsUpDownIcon size={16} />
      </button>
    {/if}
  </div>
  {#if !mobile_layout}
    <span>breadcrumb item</span>
  {/if}
</div>
