<script lang="ts">
  import type { PageData } from "./$types"
  import { ChannelHeader, SEO } from "$lib/components"
  import { segmentCollection } from "$lib/stores"
  import VideoCollection from "$lib/components/VideoCollection.svelte"

  export let data: PageData
  const { details, videos, channelIdQuery, channelHandleQuery } = data
</script>

<SEO title={`Channel segments for "${details?.title}"`} />

<section class="mb-4">
  <ChannelHeader avatar={details?.avatar} name={details?.title} />
</section>

<section>
  <VideoCollection videoData={videos} {channelIdQuery} {channelHandleQuery} />
</section>
