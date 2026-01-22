<script lang="ts">
  import { getContext } from "svelte";
  import YoutubePlayer from "../YoutubePlayer.svelte";
  import ChannelItem from "../ChannelItem.svelte";
  import Button from "../Button.svelte";
  import { BookmarkIcon, ExternalLinkIcon } from "@lucide/svelte";

  const { id } = getContext<{ id: string }>("videoId");

  const videoActions = [{ text: "SBbrowser" }, { text: "Timeline view" }];
</script>

<section class="mt-4 flex @max-5xl:flex-col">
  <YoutubePlayer {id} class="flex-1 rounded-md overflow-hidden" />
  <div
    class="space-y-2.5 shrink-0 w-[55%] @max-5xl:px-0 px-4 py-3 dark:bg-neutral-900/50 bg-neutral-100 @max-5xl:bg-transparent @max-5xl:rounded-none rounded-tr-md rounded-br-md"
  >
    <!-- Title -->
    <div>
      <div class="opacity-60 mb-1">Segments from</div>
      <h2 class="text-2xl font-bold">Video titles</h2>
    </div>
    <!-- Links and date -->
    <div class="flex items-center">
      <a href="/channel/a" class="inline-block leading-none">
        <ChannelItem class="inline-flex" src="#" name="Channel name" />
      </a>
      <div class="inline-flex items-center mx-1">
        <button class="p-1.5">
          <BookmarkIcon size={16} />
        </button>
        <a href="/fingers" class="p-1.5">
          <ExternalLinkIcon size={16} />
        </a>
      </div>
      <span class="size-1 rounded-md bg-white/60"></span>
      <time class="ml-2" datetime="NaN">NaN</time>
    </div>
    <!-- Info -->
    <div
      data-compact-info=""
      class="p-2.5 rounded-sm border border-neutral-500 grid grid-cols-2"
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
      {#each videoActions as { text }}
        <Button>{text}</Button>
      {/each}
    </div>
  </div>
</section>
