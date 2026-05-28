<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import TabContainer from "$lib/components/tabs/TabContainer.svelte";
  import {
    EllipsisVerticalIcon,
    FunnelIcon,
    ListIcon,
    ScanSearchIcon,
  } from "@lucide/svelte";
  import TabItem from "../tabs/TabItem.svelte";
</script>

<div class="flex items-center sticky top-14 bg-neutral-950 z-10 py-2 gap-x-3">
  <TabContainer>
    <TabItem>All</TabItem>
    <TabItem active>Videos</TabItem>
    <TabItem>Shorts</TabItem>
  </TabContainer>
  <div class="flex-1 gap-x-1 flex items-center">
    <Button variant="secondary">
      {#snippet prefix()}
        <ListIcon size={16} class="opacity-50" />
      {/snippet}
      123 submissions
      {#snippet suffix()}
        <FunnelIcon size={16} />
      {/snippet}
    </Button>
    <Button variant="secondary" icon>
      <ScanSearchIcon size={17} />
    </Button>
  </div>
  <!-- spacer -->
  <div class="flex items-center gap-x-1">
    <Button variant="secondary">
      {#snippet prefix()}
        <FunnelIcon size={17} />
      {/snippet}
      Filters
    </Button>
    <Button variant="secondary" icon>
      <EllipsisVerticalIcon size={17} />
    </Button>
  </div>
</div>
