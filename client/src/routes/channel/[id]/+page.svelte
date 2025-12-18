<script lang="ts">
  import { Meta, Pagination, TabItem, VideoItemGrid } from "$lib/components";
  import ChannelInfoWrapper from "$lib/components/panels/ChannelInfoWrapper.svelte";
  import { page } from "$app/state";

  const { channel_id: cid } = page.data;
</script>

<Meta title="Channel segments for ((channel))" />
<main class="@container max-w-7xl mx-auto w-full px-6">
  <ChannelInfoWrapper {cid} />
  <!-- Filters and tabs -->
  <div class="flex sticky top-14 bg-neutral-950 z-10 py-3">
    <div role="tablist" class="flex gap-x-2">
      <TabItem>Videos</TabItem>
      <TabItem>Shorts</TabItem>
    </div>
    <div class="flex-1">Submissions</div>
    <div>
      <button> Filter </button>
    </div>
    <button>More</button>
  </div>

  <!-- Video items -->
  <section class="mt-1">
    <div class="grid grid-cols-4 gap-x-3 gap-y-6">
      {#each [...Array(32)] as _}
        <VideoItemGrid />
      {/each}
    </div>
    <div class="text-center mt-4">
      <Pagination basePath="/" />
    </div>
  </section>
</main>
