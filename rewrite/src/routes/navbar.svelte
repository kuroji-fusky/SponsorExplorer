<script lang="ts">
  import { MonitorIcon, SearchIcon, Settings2Icon } from "@lucide/svelte";
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
    const { abort, signal } = new AbortController();
    resizeWin();

    window.addEventListener("resize", resizeWin, { signal });

    return () => {
      abort();
    };
  });
</script>

<nav class="fixed top-0 inset-x-0 flex items-center h-14 px-3">
  <LogoNav />
  <!-- Spacer -->
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
