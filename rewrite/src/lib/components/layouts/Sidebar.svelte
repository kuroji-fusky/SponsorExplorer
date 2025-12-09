<script lang="ts">
  import TabItem from "../TabItem.svelte";

  import { SIDEBAR_OPEN } from "$lib/stores";
  import { slide } from "svelte/transition";
  import { ChevronsRightIcon } from "@lucide/svelte";

  // hard code the default width for the time being
  // TODO: fetch width state from localstorage
  const SIDEBAR_WIDTH = 280;
</script>

{#if $SIDEBAR_OPEN}
  <div
    class="overflow-hidden flex w-(--sidebar-width)"
    style={`--sidebar-width: ${SIDEBAR_WIDTH}px`}
    transition:slide={{ duration: 900, axis: "x" }}
  >
    <aside
      id="sidebar-contents"
      class="h-full flex flex-col shrink-0 w-[calc(var(--sidebar-width)*1)]"
    >
      <div id="tab-container" class="flex">
        <div class="flex gap-x-2 flex-1" role="tablist">
          <TabItem>History</TabItem>
          <TabItem>Playlist</TabItem>
        </div>

        <button aria-label="Expand" class="shrink-0 p-2">
          <ChevronsRightIcon />
        </button>
      </div>
      <div class="w-full grid px-2 py-2">INAMO</div>
    </aside>
    <div id="panel-grip" class="flex-1 h-full w-2 bg-red-300"></div>
  </div>
{/if}
