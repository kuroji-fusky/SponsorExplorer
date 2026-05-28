<script lang="ts">
  import Dexie from "dexie";
  import { Meta, Pagination, TabItem, VideoItemGrid } from "$lib/components";
  import ChannelInspectWrapper from "$lib/components/panels/ChannelInspectWrapper.svelte";
  import ChannelShelf from "$lib/components/shelf/ChannelShelf.svelte";
  import { setChannelMeta } from "$lib/context";
  import { watchlistDB } from "$lib/db";
  import ChannelInfo from "$lib/components/panels/ChannelInfo.svelte";

  const { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  const { name, id, details, avatar, videos } = data;

  setChannelMeta({
    id,
    avatar,
    name,
    handle: "",
    videoCount: 69, // temp
  });

  $effect(() => {
    // log channel to recents
    watchlistDB.recentChannelsList.add({
      channelId: id,
      channelAvatar: avatar,
      channelName: name,
      channelHandle: "WIP",
      added: new Date(),
    });

    // fetch segments
    const handlePrefetchSegments = () => {
      const chan = new BroadcastChannel("sveltekit-sw");
      const conslidatedIds = videos.map((v) => v.id);

      chan.postMessage({
        type: "APPEND_YT_IDS",
        payload: conslidatedIds,
      });
    };

    handlePrefetchSegments();
    navigation.addEventListener("navigate", handlePrefetchSegments);
  });
</script>

<Meta title={`Channel segments for ${name}`} />
<main class="@container max-w-screen-2xl mx-auto w-full px-6">
  <ChannelInspectWrapper cid={`UC${id}`}>
    <ChannelInfo />
  </ChannelInspectWrapper>
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
