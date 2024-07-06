<script lang="ts">
  import type { SBSegmentData } from "$lib/types"

  import ExternalLinkIcon from "lucide-svelte/icons/external-link"

  import Link from "./Link.svelte"
  import YouTube from "./YouTube.svelte"

  export let id: string

  export let ytData: {
    channelId: string
    channelTitle: string
    channelHandle: string | null | undefined
    channelJoinDate: string | null | undefined
    channelAvatar: string
    videoTitle: unknown
    videoPublishDate: string
  }

  export let sponsorblockData: {
    statusCode: number
    segmentCount: number
    items: SBSegmentData[]
    errors: string
  }
</script>

<div
  class="flex lg:flex-row flex-col gap-y-4 gap-x-6 bg-neutral-900 rounded-md"
  aria-label={`Segments for "${ytData.videoTitle}" by ${ytData.channelTitle}`}
>
  <div class="flex-shrink-0">
    <YouTube {id} />
  </div>
  <div class="flex flex-col gap-y-3 lg:py-5 pb-5 lg:pr-6 lg:pl-0 pl-6">
    <!-- Title -->
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for</div>
      <h1 class="text-2xl mb-1">{ytData.videoTitle}</h1>
      <ul class="flex items-center mt-2 gap-x-2">
        <a
          href={`/channel?id=${ytData.channelId}`}
          class="inline-flex items-center gap-x-2 group"
        >
          <img
            src={ytData.channelAvatar}
            width="30"
            height="30"
            class="rounded-full overflow-hidden"
            alt={`Channel avatar for ${ytData.channelTitle}`}
          />
          <span class="font-medium group-hover:underline">
            {ytData.channelTitle}
          </span>
        </a>
        <div aria-hidden class="h-4 border border-neutral-700" />
        <Link
          external
          href={`https://www.youtube.com/channel/${ytData.channelId}`}
        >
          <div class="inline-flex gap-x-1.5">
            <span>Visit channel</span>
            <ExternalLinkIcon size={18} />
          </div>
        </Link>
      </ul>
    </div>
    <!-- Stats -->
    <div>
      <span>{`Published on ${ytData.videoPublishDate}`}</span>
    </div>
    <!-- Actions -->
    <div>
      <a
        href={`https://sb.ltn.fi/video/${id}`}
        target="_blank"
        rel="noopenner noreferer"
        class="inline-flex gap-x-1.5 hover:underline"
      >
        <span>View on SBbrowser</span>
        <ExternalLinkIcon size={18} />
      </a>
    </div>
  </div>
</div>
<div id="scroll-wrapper"></div>
