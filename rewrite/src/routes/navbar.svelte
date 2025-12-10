<script lang="ts">
  import {
    ChevronsUpDownIcon,
    MenuIcon,
    MonitorIcon,
    SearchIcon,
    Settings2Icon,
  } from "@lucide/svelte";
  import { SIDEBAR_OPEN } from "$lib/stores";
</script>

<nav class="fixed top-0 inset-x-0 flex items-center h-14 px-3">
  <button
    class="p-2 cursor-pointer rounded-md"
    aria-controls="sidebar-contents"
    onclick={() => SIDEBAR_OPEN.set(!$SIDEBAR_OPEN)}
  >
    <MenuIcon size={20} />
  </button>
  <div class="flex items-center gap-x-2.5 ml-1">
    <div class="inline-flex items-center hover:bg-neutral-800/75 rounded-md">
      <a href="/" class="text-lg font-bold px-2 py-0.5">SponsorExplorer</a>
      <button
        class="px-1 py-2 hover:bg-neutral-700/50 cursor-pointer rounded-tr-md rounded-br-md"
      >
        <ChevronsUpDownIcon size={16} />
      </button>
    </div>
    <span>breadcrumb item</span>
  </div>
  <span class="flex-1"></span>
  <!-- Right-side action buttons -->
  <div class="flex items-center gap-x-0.5">
    <button class="p-2 border rounded-md">
      <SearchIcon size={18} />
    </button>
    <button class="p-2 border rounded-md">
      <MonitorIcon size={18} />
    </button>
    <button class="p-2 border rounded-md">
      <Settings2Icon size={18} />
    </button>
  </div>
</nav>
<div class="h-14"></div>
