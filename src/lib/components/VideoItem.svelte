<script lang="ts">
  import { onMount } from "svelte"
  import { segmentCollection } from "$lib/stores"
  import { writable } from "svelte/store"
  import { cn } from "$lib/utils"

  export let id: string
  export let title: string
  export let thumbnail: string
  export let publishDate: string

  export let fromChannelId: string | undefined = undefined
  export let fromChannelHandle: string | undefined = undefined

  const url = [`/video/${id}`]

  if (fromChannelId) url.push(`?fromChannelId=${fromChannelId}`)
  if (fromChannelHandle) url.push(`?fromChannelHandle=${fromChannelHandle}`)

  const parsedUrl = url.join("")

  let segmentCountRef: HTMLLIElement

  const parsedRelativeSegment = writable([])

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

  onMount(() => {
    const segmentCountFetch = async () => {
      const res = await fetch(
        `https://sponsor.ajay.app/api/skipSegments?videoID=${id}&service=YouTube&categories=["sponsor","intro","outro","selfpromo","interaction","preview","filler","music_offtopic"]`
      )

      if (res.status === 404) {
        segmentCountRef.textContent = "No segments"
        return
      }

      const skipSegments = await res.json()

      const skipSegLen = skipSegments.length

      segmentCountRef.textContent =
        skipSegLen <= 1 ? `${skipSegLen} segment` : `${skipSegLen} segments`

      const allSegmentSum = skipSegments.reduce(
        (acc, cur) => (acc += cur.segment[1] - cur.segment[0]),
        0
      )

      $parsedRelativeSegment = skipSegments.map(({ category, segment }) => {
        const segLen = segment[1] - segment[0]

        return {
          segment: category,
          relativeDuration: (segLen / allSegmentSum) * 100
        }
      })

      // TODO: I'll deal with this later
      // $segmentCollection.push(skipSegments)
      console.log($parsedRelativeSegment)
    }

    segmentCountFetch()
  })
</script>

<div class="flex flex-col gap-y-3 p-3 rounded-md hover:bg-neutral-900">
  <a class="block overflow-hidden rounded-md relative" href={parsedUrl}>
    <img src={thumbnail} alt="" class="aspect-video object-cover w-full" />
    <div
      id="mini-segment-indicator"
      class="absolute inset-x-0 bottom-0 h-3 flex"
    >
      {#each $parsedRelativeSegment as { segment, relativeDuration }}
        <span
          class={cn(
            segmentTwClass[segment],
            "h-1/2 translate-y-2 hover:h-full hover:translate-y-0 transition-all"
          )}
          style={`width:${relativeDuration}%`}
        />
      {/each}
    </div>
  </a>
  <div>
    <a href={parsedUrl} class="text-lg leading-snug font-semibold">
      {title}
    </a>
    <ul
      class="mt-2.5 opacity-75 flex flex-wrap list-disc *:pr-5 last:*:pr-0 first:*:list-none empty:*:hidden"
    >
      <li>{publishDate}</li>
      <!-- <li bind:this={lockRef}></li> -->
      <li bind:this={segmentCountRef}></li>
    </ul>
  </div>
</div>
