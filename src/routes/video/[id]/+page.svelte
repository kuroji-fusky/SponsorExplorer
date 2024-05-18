<script lang="ts">
  import type { PageData } from "./$types"
  import { SegmentBadge, LengthBadge } from "$lib/components/Badges"
  import { SegmentTable } from "$lib/components/Table"
  import { VideoHeader } from "$lib/components"
  import { cn } from "$lib/utils"
  import SEO from "$lib/components/SEO.svelte"

  export let data: PageData
  const { id, sponsorblock } = data

  const tempTitle = "temp"
</script>

<SEO title={`Segments for "${tempTitle}"`} />

<section class="mb-4">
  <VideoHeader {id} title={tempTitle} />
</section>
<section>
  {#if sponsorblock.statusCode === 200 && sponsorblock.items.length !== 0}
    <div>Filter segments</div>
    <SegmentTable>
      {#each sponsorblock.items as item}
        <tr
          class={cn(
            "border-b border-slate-300",
            item.votes <= -2 || item.isHidden || item.isShadowHidden
              ? "opacity-30 hover:opacity-100 grayscale-[.75] hover:grayscale-0"
              : null
          )}
        >
          <td id="submitted-date">
            <time datetime={item.submittedDate}>
              {item.submittedDateReadable}
            </time>
          </td>
          <td id="username-userid">
            <div class="overflow-ellipsis overflow-hidden w-48">
              {item.userid}
            </div>
          </td>
          <td id="length">
            <LengthBadge
              actionType={item.segmentAction}
              startTime={item.startTime}
              endTime={item.endTime}
            />
          </td>
          <td id="segment">
            <SegmentBadge
              segment={item.segmentLabel}
              chapterLabel={item.description}
            />
          </td>
          <td id="votes">{item.votes}</td>
          <td id="views">{item.segmentAction !== "full" ? item.views : "—"}</td>
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
