<script lang="ts">
  import YouTube from "./YouTube.svelte"

  export let id: string = "3Vsd6zPChIU"
  export let title: string = "Never Gonna Give You Up"
  export let channelName: string = "RickAstleyVEVO"
</script>

<div
  class="flex gap-y-4 gap-x-6 mt-9 bg-gray-200 rounded-md"
  aria-label={`Segments for "${title}" by ${channelName}`}
>
  <YouTube {id} />
  <div class="flex flex-col gap-y-3 py-3.5">
    <!-- Title -->
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for</div>
      <h1 class="text-3xl mb-1">{title}</h1>
      <div>{channelName}</div>
    </div>
    <!-- Stats -->
    <div>stats</div>
    <!-- Actions -->
    <div>actions</div>
  </div>
</div>
<div id="scroll-wrapper"></div>
