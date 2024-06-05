<script lang="ts">
  import Link from "./Link.svelte"
  import YouTube from "./YouTube.svelte"

  export let id: string
  export let title: string
  export let channelName: string
  export let channelId: string
  export let channelAvatar: string
</script>

<div
  class="flex gap-y-4 gap-x-6 mt-9 bg-neutral-900 rounded-md"
  aria-label={`Segments for "${title}" by ${channelName}`}
>
  <YouTube {id} />
  <div class="flex flex-col gap-y-3 py-5">
    <!-- Title -->
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for</div>
      <h1 class="text-2xl mb-1">{title}</h1>
      <ul class="flex items-center mt-2 gap-x-2">
        <a
          href={`/channel?id=${channelId}`}
          class="inline-flex items-center gap-x-2 group"
        >
          <img
            src={channelAvatar}
            width="30"
            height="30"
            class="rounded-full overflow-hidden"
            alt={`Channel avatar for ${channelName}`}
          />
          <span class="font-medium group-hover:underline">
            {channelName}
          </span>
        </a>
        <div aria-hidden class="h-4 border border-neutral-700" />
        <Link external href={`https://www.youtube.com/channel/${channelId}`}
          >Visit channel</Link
        >
      </ul>
    </div>
    <!-- Stats -->
    <div>stats</div>
    <!-- Actions -->
    <div>actions</div>
  </div>
</div>
<div id="scroll-wrapper"></div>
