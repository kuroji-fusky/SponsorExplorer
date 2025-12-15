<script lang="ts">
  import { Meta, Pagination, TabItem, VideoItemGrid } from "$lib/components";
  import ChannelInfo from "$lib/components/panels/ChannelInfo.svelte";
</script>

<Meta title="Channel segments for ((channel))" />
<main class="@container max-w-7xl mx-auto w-full px-6">
  <section class="mb-2">
    <div
      role="tablist"
      class="flex gap-x-2 *:data-[tab-active]:[--tab-active:bg-amber-600]"
    >
      <TabItem class="px-0.5 py-2">Channel vidyas</TabItem>
      <TabItem class="px-0.5 py-2">Submissions</TabItem>
    </div>
    <ChannelInfo />
  </section>

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
