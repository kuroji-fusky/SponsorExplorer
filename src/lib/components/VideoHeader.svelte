<script lang="ts">
  import YouTube from "./YouTube.svelte"
  import VideoHeaderDetails from "./VideoHeaderDetails.svelte"

  import { segmentVideoDetails } from "$lib/stores"

  const {
    id,
    yt: { videoTitle, channelTitle }
  } = $segmentVideoDetails as any
</script>

<div
  class="flex lg:flex-row flex-col gap-y-4 gap-x-6 bg-neutral-900 rounded-md overflow-hidden"
  aria-label={`Segments for "${videoTitle}" by ${channelTitle}`}
>
  <div class="flex-shrink-0">
    <YouTube {id} />
  </div>
  <VideoHeaderDetails />
</div>
<div id="scroll-wrapper"></div>
