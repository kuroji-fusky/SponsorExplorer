<script lang="ts">
  import {
    SquareKanbanIcon,
    MonitorIcon,
    SearchIcon,
    Settings2Icon,
    XIcon,
  } from "@lucide/svelte";
  import { IS_MOBILE, SIDEBAR_OPEN_MOBILE } from "$lib/stores";
  import { LogoNav } from "$lib/components";
  import { onMount } from "svelte";

  const MOBILE_VIEWPORT_LIMIT = 1280;

  function resizeWin() {
    IS_MOBILE.set(Math.round(window.innerWidth) <= MOBILE_VIEWPORT_LIMIT);

    // This ensures that the mobile nav always gets closed when resizing
    if (!$IS_MOBILE && $SIDEBAR_OPEN_MOBILE) {
      SIDEBAR_OPEN_MOBILE.set(false);
    }
  }

  onMount(() => {
    resizeWin();

    window.addEventListener("resize", resizeWin);

    return () => {
      window.removeEventListener("resize", resizeWin);
    };
  });
</script>

<nav
  class="bg-neutral-950 z-10 fixed top-0 inset-x-0 flex items-center h-14 px-3 border-b border-b-neutral-500"
>
  <LogoNav />
  <!-- Spacer -->
  <span class="flex-1"></span>
  <!-- Right-side action buttons -->
  <div class="flex items-center gap-x-0.5">
    <button
      class="px-2.5 py-2 border rounded-md hidden md:inline-flex items-center"
    >
      <SquareKanbanIcon size={18} />
      <span class="ml-2 leading-none">Kanban</span>
    </button>
    <button class="p-2 border rounded-md">
      <SearchIcon size={18} />
    </button>
    <button class="p-2 border rounded-md hidden md:block">
      <MonitorIcon size={18} />
    </button>
    <button class="p-2 border rounded-md">
      <Settings2Icon size={18} />
    </button>
  </div>
</nav>
<div class="h-14"></div>
