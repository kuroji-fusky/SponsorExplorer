<script lang="ts">
  import { SIDEBAR_OPEN } from "$lib/stores";
  import { fly, slide, scale } from "svelte/transition";
  import TabItem from "../TabItem.svelte";

  // hard code the default width for the time being
  // TODO: fetch width state from localstorage
</script>

{#if $SIDEBAR_OPEN}
  <div
    class="overflow-hidden"
    style="width: 280px"
    transition:slide={{ duration: 600, axis: "x" }}
  >
    <aside
      id="sidebar-contents"
      style="width: 290px"
      class="h-full flex flex-col bg-amber-900"
    >
      <div id="tab-container" class="flex">
        <div class="flex" role="tablist">
          <TabItem>OH MY GOD</TabItem>
          <TabItem>OH MY GOD</TabItem>
          <TabItem>OH MY GOD</TabItem>
        </div>
      </div>
      <div></div>
    </aside>
  </div>
{/if}
