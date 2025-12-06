<script lang="ts">
  import { MenuIcon } from "@lucide/svelte";
  import { SIDEBAR_OPEN } from "$lib/stores";
</script>

<nav class="flex items-center h-14 px-3">
  <button
    class="p-2 cursor-pointer rounded-md"
    aria-controls="sidebar-contents"
    onclick={() => SIDEBAR_OPEN.set(!$SIDEBAR_OPEN)}
  >
    <MenuIcon size={20} />
  </button>
  <div class="flex items-center gap-x-1.5 ml-2">
    <div>logo</div>
    <span>breadcrumb item</span>
  </div>
  <span class="flex-1"></span>
  <!-- Right-side action buttons -->
  <div class="flex items-center gap-x-2">
    <span>search</span>
    <span>themes</span>
    <span>settings</span>
  </div>
</nav>
