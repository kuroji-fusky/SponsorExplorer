<script lang="ts">
  import { onMount } from "svelte"
  import SegmentProgress from "./SegmentProgress.svelte"
  import { pluralFormatter } from "$lib/utils"

  export let id: string = ""
  export let title: string = ""
  export let thumbnail: string = ""
  export let publishDate: string = ""

  export let fromChannelId: string | null = null
  export let fromChannelHandle: string | null = null

  export let autoFetchSegments = true

  const url = [`/video/${id}`]

  if (fromChannelId) url.push(`?fromChannelId=${fromChannelId}`)
  if (fromChannelHandle) url.push(`?fromChannelHandle=${fromChannelHandle}`)

  const parsedUrl = url.join("")

  let segmentCountRef: HTMLLIElement
  let segmentData: any

  let fullLabelDetails: {
    cls: string
    label: string
  }

  onMount(() => {
    const segmentCountFetch = async () => {
      try {
        const res = await fetch(
          `https://sponsor.ajay.app/api/skipSegments?videoID=${id}&categories=["sponsor","intro","outro","selfpromo","interaction","preview","filler","music_offtopic"]&actionTypes=["skip","mute"]`
        )

        const rawResponse = res.text.toString()

        if (!rawResponse.startsWith("{")) {
          if (res.status === 404) {
            segmentCountRef.textContent = "No segments"
            return
          }

          if (res.status === 502 || res.status === 504) {
            segmentCountRef.textContent = "Unable to retrieve segments"
            return
          }
        }
        const skipSegments = await res.json()
        const skipSegLen = skipSegments.length

        segmentCountRef.textContent = pluralFormatter(
          skipSegLen,
          "segment",
          "segments"
        )

        segmentData = skipSegments.map((item: any) => ({
          startLength: item.segment[0],
          endLength: item.segment[1],
          segment: item.category
        }))

        // console.log(segmentData)
      } catch {}
    }

    const fullLabelFetch = async () => {
      try {
        const res = await fetch(
          `https://sponsor.ajay.app/api/skipSegments?videoID=${id}&categories=["sponsor","selfpromo","exclusive_access"]&actionType=full`
        )

        const rawResponse = await res.text()

        // console.log("full label fetch =>", rawResponse)
        if (!rawResponse.startsWith("[")) {
          if (res.status === 404 || res.status === 502 || res.status === 504)
            return
        }

        const labelSegment = JSON.parse(rawResponse)[0].category

        // Will improve on this later, this is mad garbage lmao
        if (labelSegment === "selfpromo") {
          fullLabelDetails = {
            label: "Unpaid/Self Promotion",
            cls: "bg-sb-selfpromo text-black"
          }
          return
        }
        if (labelSegment === "sponsor") {
          fullLabelDetails = {
            label: "Sponsor",
            cls: "bg-sb-sponsor"
          }
          return
        }
        if (labelSegment === "exclusive_access") {
          fullLabelDetails = {
            label: "Exclusive Access",
            cls: "bg-sb-exclusive-access"
          }
          return
        }

        return
      } catch {}
    }

    segmentCountFetch()
    fullLabelFetch()
  })
</script>

<div class="flex flex-col gap-y-3 p-3 rounded-md hover:bg-neutral-900 group">
  <a class="block overflow-hidden rounded-md relative" href={parsedUrl}>
    <div class="relative aspect-video">
      <!-- Full video and lock indicators -->
      <div
        class="empty:hidden group-hover:opacity-40 absolute flex top-2 left-2 overflow-hidden rounded-md *:px-2 *:py-0.5"
      >
        <!-- <div class="bg-yellow-600 grid place-items-center">
          <LockIcon size={14.5} strokeWidth={2.5} />
        </div> -->
        {#if fullLabelDetails}
          <div class="text-[0.865rem] font-semibold {fullLabelDetails.cls}">
            {fullLabelDetails.label}
          </div>
        {/if}
      </div>
      <img src={thumbnail} alt="" class="aspect-video object-cover w-full" />
    </div>
    <div
      class="absolute inset-x-0 bottom-0 h-1.5 empty:translate-y-4 translate-y-0 duration-200"
    >
      {#if autoFetchSegments}
        {#if segmentData}
          <SegmentProgress {segmentData} barOnly />
        {/if}
      {/if}
    </div>
  </a>
  <div>
    <a href={parsedUrl} class="text-lg leading-snug font-semibold">
      {title}
    </a>
    <ul
      class="mt-2.5 opacity-75 flex flex-wrap list-disc *:pr-5 last:*:pr-0 first:*:list-none"
    >
      {#if autoFetchSegments}
        <li>{publishDate}</li>
        <li bind:this={segmentCountRef}>Loading segments...</li>
      {/if}
    </ul>
  </div>
</div>
