<script lang="ts">
  import {
    ChevronDownIcon,
    EllipsisVerticalIcon,
    ListFilterIcon,
    RefreshCwIcon,
    SquareMinusIcon,
    XIcon,
  } from "@lucide/svelte";
  import TabContainer from "../tabs/TabContainer.svelte";
  import TabItem from "../tabs/TabItem.svelte";
</script>

<div class="flex gap-x-1 sticky top-20 py-3">
  <TabContainer class="flex">
    <TabItem class="py-1.5 px-2.5 rounded-sm bg-neutral-600"
      >Submissions</TabItem
    >
    <TabItem class="py-1.5 px-2.5 rounded-sm">History</TabItem>
  </TabContainer>
  <span class="flex-1"></span>
  <button
    class="px-2.5 py-2 inline-flex items-center gap-x-1.5 rounded-md border"
  >
    <SquareMinusIcon size={17} />
    <span class="leading-0">Collapse</span></button
  >
  <div class="flex items-center rounded-md border">
    <button class="px-2.5 py-2 inline-flex items-center gap-x-1.5">
      <RefreshCwIcon size={17} /> <span class="leading-0">Refresh</span></button
    >
    <button class="px-1.5 py-2 border-l">
      <ChevronDownIcon size={17} />
    </button>
  </div>

  <div class="flex items-center rounded-md border">
    <button class="px-2.5 py-2 inline-flex items-center gap-x-1.5 rounded-md">
      <ListFilterIcon size={17} />
      <span class="leading-0">Filters</span></button
    >
    <button class="px-1.5 py-2 text-red-400"> <XIcon size={17} /></button>
  </div>

  <button class="p-2 rounded-md border">
    <EllipsisVerticalIcon size={17} />
  </button>
</div>
