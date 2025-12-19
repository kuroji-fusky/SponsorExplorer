<script lang="ts">
  import { getContext } from "svelte";
  import YoutubePlayer from "../YoutubePlayer.svelte";

  const { id } = getContext<{ id: string }>("videoId");

  const videoActions = [
    { text: "Save" },
    { text: "SBbrowser" },
    { text: "Timeline view" },
    { text: "Debug" },
    { text: "Copy" },
  ];
</script>

<section class="mt-4 flex @max-5xl:flex-col">
  <YoutubePlayer {id} class="flex-1 rounded-md overflow-hidden" />
  <div
    class="shrink-0 w-[55%] @max-5xl:px-0 px-3.5 py-3 bg-neutral-900 @max-5xl:bg-transparent @max-5xl:rounded-none rounded-tr-md rounded-br-md"
  >
    <span>Segments from</span>
    <h2 class="text-2xl font-bold">Video titles</h2>
    <div>
      <a href="/channel/a" class="inline-flex items-center">
        <div class="size-7 aspect-square rounded-full mr-1.5 bg-red-400"></div>
        <span>Channel</span>
      </a>
    </div>
    <div class="flex gap-x-1">
      {#each videoActions as { text }}
        <button class="px-2.5 py-1.5 rounded-lg border">{text}</button>
      {/each}
    </div>
  </div>
</section>
