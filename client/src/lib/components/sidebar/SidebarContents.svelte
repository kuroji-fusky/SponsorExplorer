<script lang="ts">
  import { ChevronsRightIcon } from "@lucide/svelte";
  import TabItem from "../TabItem.svelte";

  const { mobile_layout = false }: { mobile_layout?: boolean } = $props();
</script>

<aside
  id="sidebar-contents"
  class="h-full flex flex-col shrink-0 w-[calc(var(--sidebar-width)*0.98)]"
>
  <div id="tab-container" class="flex">
    <div class="flex gap-x-2 flex-1" role="tablist">
      <TabItem>History</TabItem>
      <TabItem>Playlist</TabItem>
    </div>

    {#if !mobile_layout}
      <button aria-label="Expand" class="shrink-0 p-2">
        <ChevronsRightIcon />
      </button>
    {/if}
  </div>
  <div class="w-full grid px-2 py-2">INAMO</div>
</aside>
