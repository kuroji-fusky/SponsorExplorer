<script lang="ts">
  import { liveQuery } from "dexie";
  import { watchlistDB as db } from "../../db";

  import {
    BookmarkIcon,
    ChevronRightIcon,
    ChevronsRightIcon,
    ExternalLinkIcon,
    PencilIcon,
    Trash2Icon,
  } from "@lucide/svelte";
  import TabItem from "../tabs/TabItem.svelte";
  import ChannelItem from "../ChannelItem.svelte";
  import Button from "../Button.svelte";

  const { mobile_layout = false }: { mobile_layout?: boolean } = $props();

  const watchlist = liveQuery(() => db.watchlist.toArray());
  const recents = liveQuery(() => db.recentsList.toArray());
</script>

<aside
  id="sidebar-contents"
  class="h-full flex flex-col shrink-0"
  style="width: calc(var(--sidebar-width)*0.985)"
>
  <div id="tab-container" class="flex px-1">
    <div class="flex gap-x-2 flex-1 py-1.5" role="tablist">
      <TabItem active>History</TabItem>
      <TabItem>Playlist</TabItem>
    </div>

    {#if !mobile_layout}
      <button aria-label="Expand" class="shrink-0 p-1.5">
        <ChevronsRightIcon size={18} />
      </button>
    {/if}
  </div>
  <div class="w-full grid p-2">
    <section data-group-collapsible="">
      <div class="flex items-center">
        <Button icon class="border-none p-1">
          <span class="font-semibold text-base leading-none mx-1">
            Bookmarked
          </span>
          {#snippet suffix()}
            <ChevronRightIcon size={17} />
          {/snippet}
        </Button>
        <span class="flex-1"></span>
        <div id="actions" class="flex gap-x-0.5">
          <Button icon class="border-none">
            <PencilIcon size={17} />
          </Button>
          <Button icon class="border-none">
            <Trash2Icon size={17} />
          </Button>
        </div>
      </div>
      <div class="grid gap-y-1 my-2">
        {#each [...Array(2)] as _}
          <div class="relative">
            <a
              href="/channel/a"
              class="block hover:bg-neutral-700/40 px-1.5 py-1 rounded-md [--avatar-size:--spacing(6)]"
            >
              <ChannelItem src="gay" name="Gaming" />
            </a>
            <div class="absolute right-0 inset-y-0 z-10 flex items-center">
              <Button icon class="border-none">
                <BookmarkIcon size={17} />
              </Button>
              <!-- <Button icon class="border-none">
                <Trash2Icon size={17} />
              </Button> -->
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</aside>
