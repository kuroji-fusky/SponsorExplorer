<script lang="ts">
  import { getContext } from "svelte";
  import YoutubePlayer from "../YoutubePlayer.svelte";

  const { id } = getContext<{ id: string }>("videoId");
</script>

<div class="flex bg-neutral-900 @max-5xl:flex-col">
  <YoutubePlayer {id} class="flex-1 rounded-md overflow-hidden" />
  <div class="shrink-0 w-[55%] px-3.5 py-3">
    <span>Segments from</span>
    <h2>Video titles</h2>
  </div>
</div>
