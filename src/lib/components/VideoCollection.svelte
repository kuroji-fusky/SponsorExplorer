<script lang="ts">
  import { segmentCollection } from "$lib/stores"
  import XIcon from "lucide-svelte/icons/x"

  import FilterVideos from "./FilterVideos.svelte"
  import VideoItem from "./VideoItem.svelte"
  import Button from "./Button.svelte"

  export let videoData: {
    id: string
    title: string
    thumbnail: string
    publishDate: string
    duration: string
  }[]

  export let channelIdQuery: string | null
  export let channelHandleQuery: string | null
</script>

<div class="flex gap-x-5">
  <div>
    <FilterVideos />
    <section class="flex gap-x-6">
      <!-- Video stuff -->
      <div>
        {#if typeof videoData !== "undefined"}
          <div
            class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3"
          >
            {#each videoData as video}
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
        {:else}
          <div>No videos found</div>
        {/if}
      </div>
    </section>
  </div>

  <!-- Filters and stuff -->
  <!-- <aside
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
  </aside> -->
</div>
