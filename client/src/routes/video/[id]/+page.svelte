<script lang="ts">
  import { SegmentBadge } from "$lib/components/Badges"
  import YouTube from "$lib/components/YouTube.svelte"
  import { cn } from "$lib/utils/cn.js"

  export let data

  const { id, sponsorblock } = data
</script>

<div class="mb-4">
  <YouTube {id} />
</div>
<div>
  <!-- TODO: Make a component that uses <table> to display data -->
  {#if sponsorblock.statusCode === 200 && sponsorblock.items.length !== 0}
    {#each sponsorblock.items as item}
      <div
        class={cn(
          item.votes <= -2 || item.isHidden || item.isShadowHidden
            ? "opacity-50 hover:opacity-100"
            : ""
        )}
      >
        <time datetime={item.submittedDate}>{item.submittedDateReadable}</time>
        <SegmentBadge segment={item?.segmentLabel} />
        <span>Views: {item.views}</span>
        <span>Votes: {item.votes}</span>
      </div>
    {/each}
  {:else}
    <div class="px-4 py-2.5 rounded-md bg-blue-200">
      <h2 class="text-xl mb-1">No segments found</h2>
      <span
        >Either there aren't any submissions yet or wait for the database to be updated
        for any segments to show up here.</span
      >
    </div>
  {/if}
  <!-- {#if sponsorblock.statusCode === 404}
    <div class="px-4 py-2.5 rounded-md bg-red-200">
      <h2 class="text-xl mb-1">SponsorBlock: Server Error</h2>
      <span
        >{`Recieved status code ${sponsorblock.statusCode}: ${sponsorblock.errors}`}</span
      >
    </div>
  {/if} -->
</div>
