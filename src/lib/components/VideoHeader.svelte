<script lang="ts">
  import YouTube from "./YouTube.svelte"

  export let id: string
  export let title: string
  export let channelName: string
  export let channelId: string
  export let channelAvatar: string
</script>

<div
  class="flex gap-y-4 gap-x-6 mt-9 bg-gray-200 rounded-md"
  aria-label={`Segments for "${title}" by ${channelName}`}
>
  <YouTube {id} />
  <div class="flex flex-col gap-y-3 py-5">
    <!-- Title -->
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for</div>
      <h1 class="text-2xl mb-1">{title}</h1>
      <div class="flex gap-x-2 items-center mt-2">
        <img
          src={channelAvatar}
          width="33"
          height="33"
          class="rounded-full overflow-hidden"
          alt={`Channel avatar for ${channelName}`}
        />
        <a class="font-medium text-base" href={`/channel?id=${channelId}`}>
          {channelName}
        </a>
      </div>
    </div>
    <!-- Stats -->
    <div>stats</div>
    <!-- Actions -->
    <div>actions</div>
  </div>
</div>
<div id="scroll-wrapper"></div>
