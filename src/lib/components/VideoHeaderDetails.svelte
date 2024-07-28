<script lang="ts">
  import ChannelIcon from "lucide-svelte/icons/square-user"
  import ExternalLinkIcon from "lucide-svelte/icons/external-link"
  import HelpIcon from "lucide-svelte/icons/circle-help"
  import BookmarkPlus from "lucide-svelte/icons/bookmark-plus"
  import BookmarkMinus from "lucide-svelte/icons/bookmark-minus"

  import Link from "./Link.svelte"
  import LockedIndicator from "./LockedIndicator.svelte"
</script>

<div
  class="flex flex-col gap-y-3 lg:py-5 pb-5 px-3 lg:pr-6 lg:pl-0 pl-6 w-full relative"
>
  <!-- Title -->
  <section>
    <div class="flex justify-between mb-1">
      <span class="text-sm opacity-75 uppercase">Segments for</span>
      <button class="hover:text-green-600">
        <BookmarkPlus size={19} />
      </button>
    </div>

    <h1 class="mb-1 sticky top-0 inline-flex gap-x-1 text-2xl">
      {ytData.videoTitle}
    </h1>

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
        <ChannelIcon size={19} />
      </Link>
      <button class="hover:bg-green-600 rounded-md p-1">
        <BookmarkPlus size={19} />
      </button>
      <div aria-hidden class="h-4 border border-neutral-700" />
      <span>{ytData.videoPublishDate}</span>
    </ul>
  </section>
  <!-- Stats -->
  <section class="pt-2.5 grid gap-y-2">
    <!-- <LockedIndicator /> -->
    <span
      class="inline-flex flex-wrap gap-x-2 gap-y-1 items-center px-3 py-2 rounded-md border border-neutral-600 [&_span]:opacity-75"
    >
      <span class="inline-flex items-center gap-1">
        <div class="">
          <strong>{segmentCount}</strong>
          <span>{submissionStr}</span>
          <!-- <span>{" (34 downvotes + 35 hidden)"}</span> -->
        </div>
        <!-- <button class="opacity-75 hover:opacity-100">
            <HelpIcon size={16} />
          </button> -->
      </span>
      <div aria-hidden class="h-4 border border-neutral-700" />
      <div>
        <strong>2m 1s</strong><span>{" of segments submitted"}</span>
      </div>
      <div aria-hidden class="h-4 border border-neutral-700" />
      <a
        href={`https://sb.ltn.fi/video/${id}`}
        target="_blank"
        rel="noopenner noreferer"
        class="inline-flex gap-x-1.5 hover:underline items-center"
      >
        <span>View on SBbrowser</span>
        <ExternalLinkIcon size={16} />
      </a>
    </span>
  </section>
</div>
