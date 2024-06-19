<script lang="ts">
  import type { PageData } from "./$types"
  import { SegmentTable, SegmentTableRow } from "$lib/components/Table"
  import { VideoHeader, SEO, FilterSegments } from "$lib/components"

  export let data: PageData
  const { id, sponsorblock, yt } = data
</script>

<SEO title={`Segments for "${yt.videoTitle}" by ${yt.channelTitle}`} />

<main class="flex">
  <div>xd</div>
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
        <div class="px-4 py-2.5 rounded-md bg-blue-800">
          <h2 class="text-xl mb-1">No segments found</h2>
          <span>{sponsorblock.errors}</span>
        </div>
      {/if}

      {#if sponsorblock.statusCode > 500}
        <div class="px-4 py-2.5 rounded-md bg-red-800">
          <h2 class="text-xl mb-1">SponsorBlock: Server Error</h2>
          <span
            >{`Recieved status code ${sponsorblock.statusCode}: ${sponsorblock.errors}`}</span
          >
        </div>
      {/if}
    </section>
  </div>
</main>
