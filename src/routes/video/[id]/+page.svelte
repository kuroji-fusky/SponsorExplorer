<script lang="ts">
  import type { PageData } from "./$types"
  import { SegmentTable, SegmentTableRow } from "$lib/components/Table"
  import { Notice, VideoHeader, SEO, FilterSegments } from "$lib/components"

  export let data: PageData
  const { id, sponsorblock, yt } = data
</script>

<SEO title={`Segments for "${yt.videoTitle}" by ${yt.channelTitle}`} />

<!-- <div class="z-10 fixed left-0 bg-neutral-400 bottom-0 top-0">xdddddddddddddd</div> -->

<div class="flex-1 flex flex-col gap-y-3">
  <div class="flex flex-col gap-y-2">
    <section class="flex">
      <button></button>
    </section>
    <section>
      <VideoHeader {id} ytData={yt} sponsorblockData={sponsorblock} />
    </section>
  </div>
  <section>
    <FilterSegments />
    {#if sponsorblock.statusCode === 200}
      <SegmentTable>
        {#each sponsorblock.items as item}
          <SegmentTableRow {item} />
        {/each}
      </SegmentTable>
    {:else}
      <Notice heading="No segments found">
        {sponsorblock.errors}
      </Notice>
    {/if}

    {#if sponsorblock.statusCode > 500}
      <!-- TODO: fallback to sb.ltn.fi -->
      <Notice heading="SponsorBlock: Server Error">
        {`Recieved status code ${sponsorblock.statusCode}: ${sponsorblock.errors}`}
      </Notice>
    {/if}
  </section>
</div>
