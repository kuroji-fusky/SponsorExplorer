<script lang="ts">
  import { liveQuery } from "dexie";
  import { watchlistDB as db } from "../../db";

  import {
    BookmarkIcon,
    ChevronsRightIcon,
    SearchIcon,
    SquareActivityIcon,
    Trash2Icon,
    XIcon,
  } from "@lucide/svelte";
  import TabItem from "../tabs/TabItem.svelte";
  import ChannelItem from "../ChannelItem.svelte";
  import Button from "../Button.svelte";
  import Section from "./Section.svelte";

  const { mobile_layout = false }: { mobile_layout?: boolean } = $props();

  const watchlist = liveQuery(() => db.watchlist.toArray());
  const recents = liveQuery(() => db.recentsList.toArray());
</script>

<aside
  id="sidebar-contents"
  class="size-full flex flex-col shrink-0"
  style="width: calc(var(--sidebar-width)*0.985)"
>
  <div class="flex px-2 py-0.5">
    <div class="flex-1 flex py-1.5 items-center gap-x-1">
      <SquareActivityIcon size={21} />
      <span>Activity</span>
    </div>
    <Button icon variant="tritery">
      <SearchIcon size={17} />
    </Button>
    {#if !mobile_layout}
      <button aria-label="Expand" class="shrink-0 p-1.5">
        <ChevronsRightIcon size={18} />
      </button>
    {/if}
  </div>
  <div
    class="@container w-full h-[calc(100dvh_-_--spacing(14))] flex flex-col p-2 pt-0.5 gap-y-1.5 relative overflow-y-scroll"
  >
    <Section name="From channel" isOpen>
      {#snippet action()}
        <Button icon variant="tritery">
          <XIcon size={17} />
        </Button>
      {/snippet}
      <div class="grid gap-y-1 my-2">
        {#each [...Array(48)] as _}
          <div class="relative min-w-0">
            <a
              href="/channel/a"
              class="block hover:bg-neutral-700/40 px-1.5 py-1 rounded-md w-full overflow-hidden pr-9"
            >
              <ChannelItem
                class="*:data-[channel-name]:truncate [--avatar-size:--spacing(6)]"
                src="gaming"
                name="This is a really long channel name yes very long"
              />
            </a>
            <div class="absolute right-0 inset-y-0 z-10 flex items-center">
              <Button icon variant="tritery">
                <BookmarkIcon size={17} />
              </Button>
            </div>
          </div>
        {/each}
      </div>
    </Section>
    <Section name="Bookmarks">
      {#snippet action()}
        <Button icon variant="tritery">
          <Trash2Icon size={17} />
        </Button>
      {/snippet}
      <div class="grid gap-y-1 my-2">
        {#each [...Array(28)] as _}
          <div class="relative">
            <a
              href="/channel/a"
              class="block hover:bg-neutral-700/40 px-1.5 py-1 rounded-md [--avatar-size:--spacing(6)]"
            >
              <ChannelItem src="gaming" name="Gaming" />
            </a>
            <div class="absolute right-0 inset-y-0 z-10 flex items-center">
              <Button icon variant="tritery">
                <BookmarkIcon size={17} />
              </Button>
              <!-- <Button icon class="border-none">
                <Trash2Icon size={17} />
              </Button> -->
            </div>
          </div>
        {/each}
      </div>
    </Section>
    <Section name="Recents" isExpandable={false}>
      {#snippet action()}
        <Button icon variant="tritery">
          <Trash2Icon size={17} />
        </Button>
      {/snippet}
    </Section>
  </div>
</aside>
