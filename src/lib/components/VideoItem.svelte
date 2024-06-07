<script lang="ts">
  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  import SegmentProgress from "./SegmentProgress.svelte"

  export let id: string = ""
  export let title: string = ""
  export let thumbnail: string = ""
  export let publishDate: string = ""

  export let fromChannelId: string | undefined = undefined
  export let fromChannelHandle: string | undefined = undefined

  const url = [`/video/${id}`]

  if (fromChannelId) url.push(`?fromChannelId=${fromChannelId}`)
  if (fromChannelHandle) url.push(`?fromChannelHandle=${fromChannelHandle}`)

  const parsedUrl = url.join("")

  let segmentCountRef: HTMLLIElement

  const segmentCountFetch = async () => {
    const res = await fetch(
      `https://sponsor.ajay.app/api/skipSegments?videoID=${id}&categories=["sponsor","intro","outro","selfpromo","interaction","preview","filler","music_offtopic"]`
    )

    if (res.status === 404) {
      segmentCountRef.textContent = "No segments"
      return
    }

    const skipSegments = await res.json()
    const skipSegLen = skipSegments.length

    segmentCountRef.textContent =
      skipSegLen <= 1 ? `${skipSegLen} segment` : `${skipSegLen} segments`

    return skipSegments.map((item: unknown) => ({
      startLength: item.segment[0],
      endLength: item.segment[1],
      segment: item.category
    }))
  }
</script>

<div class="flex flex-col gap-y-3 p-3 rounded-md hover:bg-neutral-900">
  <a class="block overflow-hidden rounded-md relative" href={parsedUrl}>
    <img src={thumbnail} alt="" class="aspect-video object-cover w-full" />
    <div
      class="absolute inset-x-0 bottom-0 h-1.5 empty:translate-y-4 translate-y-0 duration-200"
    >
      {#await segmentCountFetch() then segmentData}
        <SegmentProgress {segmentData} barOnly />
      {/await}
    </div>
  </a>
  <div>
    <a href={parsedUrl} class="text-lg leading-snug font-semibold">
      {title}
    </a>
    <ul
      class="mt-2.5 opacity-75 flex flex-wrap list-disc *:pr-5 last:*:pr-0 first:*:list-none"
    >
      <li>{publishDate}</li>
      <!-- <li bind:this={lockRef}></li> -->
      <li
        bind:this={segmentCountRef}
        class="empty:opacity-0 opacity-100 transition-all"
      ></li>
    </ul>
  </div>
</div>
