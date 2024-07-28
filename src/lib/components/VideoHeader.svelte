<script lang="ts">
  import YouTube from "./YouTube.svelte"
  import { pluralFormatter } from "$lib/utils"

  import VideoHeaderDetails from "./VideoHeaderDetails.svelte"

  export let id: string

  const submissionStr = pluralFormatter(
    segmentCount,
    " submission",
    " submissions",
    {
      noIncludeNum: true
    }
  )
</script>

<div
  class="flex lg:flex-row flex-col gap-y-4 gap-x-6 bg-neutral-900 rounded-md overflow-hidden"
  aria-label={`Segments for "${ytData.videoTitle}" by ${ytData.channelTitle}`}
>
  <div class="flex-shrink-0">
    <YouTube {id} />
  </div>
  <VideoHeaderDetails />
</div>
<div id="scroll-wrapper"></div>
