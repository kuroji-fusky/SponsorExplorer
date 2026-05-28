<script lang="ts">
  import { BookmarkIcon, EllipsisIcon, ExternalLinkIcon } from "@lucide/svelte";
  import Button from "../Button.svelte";
  import { getChannelMeta } from "$lib/context";

  const { name, videoCount, avatar } = getChannelMeta();
</script>

<div id="channel-info-panel" class="flex items-center">
  <img
    src={avatar}
    alt={`Channel avatar for ${name}`}
    class="size-32 aspect-square rounded-xl bg-red-50 mr-4 pointer-events-none"
    draggable="false"
  />
  <div class="flex-1 flex flex-col gap-y-1.5">
    <span class="opacity-60">Channel segments for</span>
    <h1 class="font-bold text-3xl" translate="no">{name}</h1>
    <div class="inline-flex items-center gap-x-1 mt-2">
      <span>{`${videoCount} videos`}</span>
      <!-- Separator -->
      <hr class="mx-1 h-4 border border-l opacity-50" />

      <!-- Actions -->
      <Button href="/#">
        <span>Visit channel</span>
        {#snippet suffix()}
          <ExternalLinkIcon size={16} />
        {/snippet}
      </Button>
      <Button>
        {#snippet prefix()}
          <BookmarkIcon size={17} />
        {/snippet}
        Save
      </Button>
      <Button icon>
        <EllipsisIcon size={17} />
      </Button>

      <!-- Consolidate options as dropdowns instead -->
      <!-- <div class="rounded-md border inline-flex items-center">
        <button class="hover:bg-white/20 px-2 py-1">Share</button>
        <button
          class="hover:bg-white/20 p-1 border border-l-neutral-600 border-transparent"
        >
          <ChevronDown size={15} />
        </button>
      </div>
      <div class="rounded-md border inline-flex items-center">
        <button class="hover:bg-white/20 px-2 py-1">Copy</button>
        <button
          class="hover:bg-white/20 p-1 border border-l-neutral-600 border-transparent"
        >
          <ChevronDown size={15} />
        </button>
      </div> -->
    </div>
  </div>
</div>
