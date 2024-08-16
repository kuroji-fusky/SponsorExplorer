<script lang="ts">
  import { ChannelHeader, SEO, VideoCollection } from "$lib/components"
  import { page } from "$app/stores"

  const {
    channelIdQuery,
    channelHandleQuery,
    details,
    videos: videoData,
    errors
  } = $page.data

  const { title, avatar } = details
</script>

<SEO title={`Channel segments for "${title}"`} />

{#if typeof videoData !== "undefined"}
  <section class="mb-4">
    <ChannelHeader {avatar} name={title} />
  </section>
  <section>
    <VideoCollection {videoData} {channelIdQuery} {channelHandleQuery} />
  </section>
{:else}
  <div>No parsable data found for {channelHandleQuery}</div>
  <div>Errors: {JSON.stringify(errors)}</div>
{/if}
