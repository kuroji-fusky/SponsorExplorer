<script lang="ts">
  import { Meta, Pagination, TabItem, VideoItemGrid } from "$lib/components";
  import ChannelInfoWrapper from "$lib/components/panels/ChannelInfoWrapper.svelte";

  import ChannelShelf from "$lib/components/shelf/ChannelShelf.svelte";
  import { setChannelMeta } from "$lib/context";

  const { data }: PageProps = $props();
  const { name, id, details, avatar, videos } = data;

  setChannelMeta({
    id,
    avatar,
    name,
    handle: "",
    videoCount: 69, // temp
  });
</script>

<Meta title={`Channel segments for ${name}`} />
<main class="@container max-w-screen-2xl mx-auto w-full px-6">
  <ChannelInfoWrapper cid={`UC${id}`} />
  <!-- Filters and tabs -->
  <ChannelShelf />

  <!-- Video items -->
  <section class="mt-1">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-6"
    >
      {#each videos as video}
        <VideoItemGrid
          id={video.id}
          title={video.details.title}
          date={video.details.uploadDate}
        />
      {/each}
    </div>
    <div class="text-center mt-4 sticky bottom-0 bg-neutral-900">
      <Pagination basePath="/" />
    </div>
  </section>
</main>
