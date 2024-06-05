<script lang="ts">
  import type { PageData } from "./$types"
  import { SEO } from "$lib/components"
  import ChannelHeader from "$lib/components/ChannelHeader.svelte"
  import { Divide } from "lucide-svelte"

  export let data: PageData
  const { details, videos, channelIdQuery } = data
</script>

<SEO title={`Channel segments for "${details.title}"`} />

<section class="mb-4">
  <ChannelHeader avatar={details.avatar} name={details.title} />
</section>

<section>
  {#each videos as boom}
    <div class="flex gap-x-2">
      <a
        class="block overflow-hidden rounded-md"
        href={`/video/${boom.id}?fromChannelId=${channelIdQuery}`}
      >
        <img
          src={boom.thumbnail}
          alt=""
          class="aspect-video object-cover w-52"
        />
      </a>
      <div>
        <h2 class="text-lg">
          <a href={`/video/${boom.id}?fromChannelId=${channelIdQuery}`}>
            {boom.title}
          </a>
        </h2>
        <span>
          {boom.publishDate}
        </span>
      </div>
    </div>
  {/each}
</section>
