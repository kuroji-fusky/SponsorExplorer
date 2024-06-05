<script lang="ts">
  import type { PageData } from "./$types"
  import { SegmentTable, SegmentTableRow } from "$lib/components/Table"
  import { VideoHeader, SEO } from "$lib/components"

  export let data: PageData
  const { id, sponsorblock, yt } = data
</script>

<SEO title={`Segments for "${yt.videoTitle}" by ${yt.channelTitle}`} />

<section class="mb-4">
  <VideoHeader
    {id}
    title={yt.videoTitle}
    channelName={yt.channelTitle}
    channelAvatar={yt.channelAvatar}
    channelId={yt.channelId}
  />
</section>
<section>
  {#if sponsorblock.statusCode === 200 && sponsorblock.items.length !== 0}
    <div>Filter segments</div>
    <SegmentTable>
      {#each sponsorblock.items as item}
        <SegmentTableRow {item} />
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

<style lang="postcss">
  td:is(#username-userid, #length, #segment) {
    @apply overflow-hidden;
  }
</style>
