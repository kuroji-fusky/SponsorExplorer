<script lang="ts">
  import YoutubePlayer from "../YoutubePlayer.svelte";
  import ChannelItem from "../ChannelItem.svelte";
  import Button from "../Button.svelte";
  import {
    BookmarkIcon,
    ExternalLinkIcon,
    SquareGanttChartIcon,
  } from "@lucide/svelte";
  import { getVideoMeta } from "$lib/context";

  const { id, title, channel, uploadDate } = getVideoMeta();

  const channelId = `/channel/UC${channel.id}`;
</script>

<section class="mt-4 flex @max-5xl:flex-col">
  <YoutubePlayer {id} class="flex-1 rounded-md overflow-hidden" />
  <div
    class="space-y-3 shrink-0 w-[52%] @max-5xl:px-0 px-5 py-4 dark:bg-neutral-900 bg-neutral-100 @max-5xl:bg-transparent @max-5xl:rounded-none rounded-tr-md rounded-br-md"
  >
    <!-- Title -->
    <div>
      <div class="opacity-60 mb-1.5">Segments from</div>
      <h2 class="text-2xl font-bold">{title}</h2>
    </div>
    <!-- Channel and date -->
    <div class="flex items-center">
      <a href={channelId} class="inline-block leading-none">
        <ChannelItem
          class="inline-flex"
          src={channel.avatar}
          name={channel.name}
        />
      </a>
      <div class="@max-5xl:hidden inline-flex items-center mx-1">
        <button class="p-1.5">
          <BookmarkIcon size={16} />
        </button>
        <a href={`https://www.youtube.com/${channelId}`} class="p-1.5">
          <ExternalLinkIcon size={16} />
        </a>
      </div>
      <span class="size-1 rounded-md dark:bg-white/60 bg-black"></span>
      <time class="ml-2" datetime={uploadDate}>{uploadDate}</time>
    </div>
    <!-- Info -->
    <div
      data-compact-info=""
      class="px-3.5 py-3 rounded-sm border border-neutral-400 dark:border-neutral-500 grid grid-cols-2"
    >
      <div>
        <div class="opacity-60 mb-0.5"># of segments submitted</div>
        <span class="text-base font-semibold">A</span>
      </div>
      <div>
        <div class="opacity-60 mb-0.5">Total of views accrued</div>
        <span class="text-base font-semibold">B</span>
      </div>
    </div>
    <!-- Actions -->
    <div class="flex gap-x-1">
      <Button href={`https://sb.ltn.fi/video/${id}?source=se.fusky.dev`}
        >View on SBbrowser
        {#snippet suffix()}
          <ExternalLinkIcon size={17} />
        {/snippet}
      </Button>
      <Button variant="secondary">
        {#snippet prefix()}
          <SquareGanttChartIcon size={17} />
        {/snippet}
        Switch to Timeline view
      </Button>
    </div>
  </div>
</section>
