<script lang="ts">
  import { Meta, Pagination, TabItem, VideoItemGrid } from "$lib/components";
  import ChannelInfoWrapper from "$lib/components/panels/ChannelInfoWrapper.svelte";
  import { page } from "$app/state";
  import Button from "$lib/components/Button.svelte";
  import TabContainer from "$lib/components/tabs/TabContainer.svelte";
  import {
    EllipsisVerticalIcon,
    FunnelIcon,
    ListIcon,
    TerminalIcon,
  } from "@lucide/svelte";

  const { channel_id: cid } = page.data;
</script>

<Meta title="Channel segments for ((channel))" />
<main class="@container max-w-screen-2xl mx-auto w-full px-6">
  <ChannelInfoWrapper {cid} />
  <!-- Filters and tabs -->
  <div class="flex items-center sticky top-14 bg-neutral-950 z-10 py-2 gap-x-3">
    <TabContainer>
      <TabItem active>Videos</TabItem>
      <TabItem>Shorts</TabItem>
    </TabContainer>
    <div class="flex-1 flex items-center">
      <Button>
        {#snippet prefix()}
          <ListIcon size={16} class="opacity-50" />
        {/snippet}
        123 submissions
        {#snippet suffix()}
          <FunnelIcon size={16} />
        {/snippet}
      </Button>
      <Button icon>
        <TerminalIcon size={17} />
      </Button>
    </div>
    <Button>
      {#snippet prefix()}
        <FunnelIcon size={17} />
      {/snippet}
      Filters
    </Button>
    <Button icon>
      <EllipsisVerticalIcon size={17} />
    </Button>
  </div>

  <!-- Video items -->
  <section class="mt-1">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-6"
    >
      {#each [...Array(32)] as _}
        <VideoItemGrid />
      {/each}
    </div>
    <div class="text-center mt-4 sticky bottom-0 bg-neutral-900">
      <Pagination basePath="/" />
    </div>
  </section>
</main>
