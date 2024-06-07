<script lang="ts">
  import type { PageData } from "./$types"
  import XIcon from "lucide-svelte/icons/x"
  import { SEO } from "$lib/components"
  import ChannelHeader from "$lib/components/ChannelHeader.svelte"
  import VideoItem from "$lib/components/VideoItem.svelte"
  import Button from "$lib/components/Button.svelte"
  import { segmentCollection } from "$lib/stores"

  export let data: PageData
  const { details, videos, channelIdQuery, channelHandleQuery } = data
</script>

<SEO title={`Channel segments for "${details.title}"`} />

<section class="mb-4">
  <ChannelHeader avatar={details.avatar} name={details.title} />
</section>

<section class="flex gap-x-6">
  <!-- Video stuff -->
  <div>
    <div class="grid grid-cols-3 gap-3">
      {#each videos as video}
        <VideoItem
          id={video.id}
          publishDate={video.publishDate}
          thumbnail={video.thumbnail}
          title={video.title}
          fromChannelId={channelIdQuery}
          fromChannelHandle={channelHandleQuery}
        />
      {/each}
    </div>
  </div>
  <!-- Filters and stuff -->
  <aside
    class="flex-shrink-0 w-80 sticky top-20 [align-self:flex-start] flex flex-col gap-y-3"
  >
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Statistics</h1>
      <Button iconOnly>
        <XIcon size={18} />
      </Button>
    </div>
    <section>
      <span class="font-semibold text-base">Recent segments submitted</span>
    </section>
    <section>
      <span class="font-semibold text-base">Recent submitters</span>
      <div></div>
    </section>
  </aside>
</section>
