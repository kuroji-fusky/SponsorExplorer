<script lang="ts">
  import type { SBSegmentData } from "$lib/types"

  import ChannelIcon from "lucide-svelte/icons/square-user"
  import ExternalLinkIcon from "lucide-svelte/icons/external-link"
  import HelpIcon from "lucide-svelte/icons/circle-help"

  import Link from "./Link.svelte"
  import YouTube from "./YouTube.svelte"
  import LockedIndicator from "./LockedIndicator.svelte"

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
  class="flex lg:flex-row flex-col gap-y-4 gap-x-6 bg-neutral-900 rounded-md overflow-hidden"
  aria-label={`Segments for "${ytData.videoTitle}" by ${ytData.channelTitle}`}
>
  <div class="flex-shrink-0">
    <YouTube {id} />
  </div>
  <div
    class="flex flex-col gap-y-3 lg:py-5 pb-5 px-3 lg:pr-6 lg:pl-0 pl-6 w-full relative"
  >
    <!-- Title -->
    <section>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for</div>
      <h1 class="text-2xl mb-1 sticky top-0">{ytData.videoTitle}</h1>
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
        <Link
          external
          href={`https://www.youtube.com/channel/${ytData.channelId}`}
          title="Visit channel"
        >
          <ChannelIcon size={18} />
        </Link>
        <div aria-hidden class="h-4 border border-neutral-700" />
        <span>{ytData.videoPublishDate}</span>
      </ul>
    </section>
    <!-- Stats -->
    <section class="pt-2.5 grid gap-y-2">
      <!-- <LockedIndicator /> -->
      <span
        class="inline-flex flex-wrap gap-x-2 gap-y-1 items-center px-3 py-2 rounded-md border border-neutral-600"
      >
        <span class="inline-flex items-center gap-1">
          <div>
            <strong>69</strong>
            <span class="opacity-75">{" submissions"}</span>
            <span class="opacity-75">{" (34 downvotes + 35 hidden)"}</span>
          </div>
          <button class="opacity-75 hover:opacity-100">
            <HelpIcon size={16} />
          </button>
        </span>
        <div aria-hidden class="h-4 border border-neutral-700" />
        <div>
          <strong>2m 1s</strong><span class="opacity-75">
            {" of segments submitted"}</span
          >
        </div>
        <div aria-hidden class="h-4 border border-neutral-700" />
        <a
          href={`https://sb.ltn.fi/video/${id}`}
          target="_blank"
          rel="noopenner noreferer"
          class="inline-flex gap-x-1.5 hover:underline"
        >
          <span>View on SBbrowser</span>
          <ExternalLinkIcon size={18} />
        </a>
      </span>
    </section>
  </div>
</div>
<div id="scroll-wrapper"></div>
