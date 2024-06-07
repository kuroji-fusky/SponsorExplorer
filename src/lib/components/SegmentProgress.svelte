<script lang="ts">
  import type { Segments } from "$lib/types"

  type SkippableSegments = Exclude<
    Segments,
    "poi_highlight" | "exclusive_access" | "chapter"
  >

  interface MultiProgressBarProps {
    segment: SkippableSegments
    startLength: number
    endLength: number
  }

  interface _RelativeSegments {
    className: string
    relativeDuration: number
  }

  export let segmentData: MultiProgressBarProps[] | never[] = []
  export let barOnly = false

  const segmentTwClass = {
    sponsor: "bg-sb-sponsor",
    selfpromo: "bg-sb-selfpromo",
    intro: "bg-sb-intermission",
    interaction: "bg-sb-interaction",
    preview: "bg-sb-preview",
    outro: "bg-sb-endcards",
    filler: "bg-sb-filler",
    music_offtopic: "bg-sb-non-music"
  }

  console.log("segmentData", segmentData)

  let parsedRelativeSegment: _RelativeSegments[]

  const allSegmentSum = segmentData.reduce(
    (acc, cur) => (acc += cur.endLength - cur.startLength),
    0
  )

  parsedRelativeSegment = segmentData.map((dp) => {
    const segmentDuration = dp.endLength - dp.startLength

    return {
      className: segmentTwClass[dp.segment],
      relativeDuration: (segmentDuration / allSegmentSum) * 100
    }
  })
</script>

<div class="flex flex-col gap-y-2.5">
  <div id="bar" class="flex h-2">
    {#each parsedRelativeSegment as { className, relativeDuration }}
      <span class={className} style={`width:${relativeDuration}%`} />
    {/each}
  </div>
  {#if !barOnly}
    <div id="details"></div>
  {/if}
</div>
