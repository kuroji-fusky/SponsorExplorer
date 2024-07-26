<script lang="ts">
  import type { PageData } from "./$types"
  import { ChannelHeader, SEO, VideoCollection } from "$lib/components"
  import { onMount } from "svelte"

  export let data: PageData
  const { details, videos, channelIdQuery, channelHandleQuery, errors } = data

  onMount(() => {})
</script>

<SEO title={`Channel segments for "${details?.title}"`} />

{#if typeof videos !== "undefined"}
  <section class="mb-4">
    <ChannelHeader avatar={details?.avatar} name={details?.title} />
  </section>
  <section>
    <VideoCollection videoData={videos} {channelIdQuery} {channelHandleQuery} />
  </section>
{:else}
  <div>No parsable data found for {channelHandleQuery}</div>
  <div>Errors: {JSON.stringify(errors)}</div>
{/if}
