<script lang="ts">
  import {
    BugIcon,
    ChevronDownIcon,
    EllipsisVerticalIcon,
    ListFilterIcon,
    RefreshCwIcon,
    SquareMinusIcon,
  } from "@lucide/svelte";
  import TabContainer from "../tabs/TabContainer.svelte";
  import TabItem from "../tabs/TabItem.svelte";
  import Button from "../Button.svelte";
</script>

<div class="kuro-bg flex gap-x-1 sticky top-14 py-3">
  <TabContainer>
    <TabItem active>Submissions</TabItem>
    <TabItem>History</TabItem>
  </TabContainer>
  <span class="flex-1"></span>

  <Button aria-label="Filters">
    {#snippet prefix()}
      <ListFilterIcon size={17} />
    {/snippet}
    Filters
  </Button>

  <div
    class="group flex items-center rounded-md border border-neutral-500/50 hover:dark:border-neutral-400/60"
  >
    <Button class="border-none h-full rounded-none">
      {#snippet prefix()}
        <RefreshCwIcon size={17} />
      {/snippet}
      <span class="leading-0">Refresh</span>
    </Button>

    <Button
      class="p-2 border-0 border-l rounded-none hover:dark:border-neutral-400/60"
    >
      <ChevronDownIcon size={17} />
    </Button>
  </div>

  <!-- <Button aria-label="Collapse contents">
    {#snippet prefix()}
      <SquareMinusIcon size={17} />
    {/snippet}
    Collapse
  </Button> -->

  <!-- <Button>
    {#snippet prefix()}
      <BugIcon size={17} />
    {/snippet}
    Debug
  </Button> -->

  <Button class="p-2">
    <EllipsisVerticalIcon size={17} />
  </Button>
</div>
