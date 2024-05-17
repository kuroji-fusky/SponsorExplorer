<script lang="ts">
  import { SegmentBadge } from "$lib/components/Badges"
  import { SegmentTable } from "$lib/components/Table"
  import VideoHeader from "$lib/components/VideoHeader.svelte"
  import YouTube from "$lib/components/YouTube.svelte"
  import { cn } from "$lib/utils/cn.js"

  export let data

  const { id, sponsorblock } = data
</script>

<section class="mb-4">
  <VideoHeader {id} />
</section>
<section>
  {#if sponsorblock.statusCode === 200 && sponsorblock.items.length !== 0}
    <SegmentTable>
      {#each sponsorblock.items as item}
        <tr
          class={cn(
            item.votes <= -2 || item.isHidden || item.isShadowHidden
              ? "opacity-60 hover:opacity-100 grayscale-[.75] hover:grayscale-0 transition-[opacity,filter]"
              : "",
            "border-b border-slate-300"
          )}
        >
          <td id="submitted-date">
            <time datetime={item.submittedDate}
              >{item.submittedDateReadable}</time
            >
          </td>
          <td id="username-userid"></td>
          <td id="length"></td>
          <td id="segment">
            <SegmentBadge segment={item?.segmentLabel} />
          </td>
          <td id="votes">{item.votes}</td>
          <td id="views">{item.views}</td>
          <td id="is-hidden"></td>
        </tr>
      {/each}
    </SegmentTable>
  {:else}
    <div class="px-4 py-2.5 rounded-md bg-blue-200">
      <h2 class="text-xl mb-1">No segments found</h2>
      <span
        >Either there aren't any submissions yet or wait for the database to be
        updated for any segments to show up here.</span
      >
    </div>
  {/if}

  {#if sponsorblock.statusCode > 500}
    <div class="px-4 py-2.5 rounded-md bg-red-200">
      <h2 class="text-xl mb-1">SponsorBlock: Server Error</h2>
      <span
        >{`Recieved status code ${sponsorblock.statusCode}: ${sponsorblock.errors}`}</span
      >
    </div>
  {/if}
</section>
