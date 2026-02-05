<script lang="ts">
  import { BookmarkIcon, EllipsisIcon, ExternalLinkIcon } from "@lucide/svelte";
  import Button from "../Button.svelte";

  // TODO send channel info props from setContext
</script>

<div id="channel-info-panel" class="flex items-center">
  <div class="size-32 aspect-square rounded-xl bg-red-50 mr-4"></div>
  <div class="flex-1 flex flex-col gap-y-1">
    <span class="opacity-60">Channel segments for</span>
    <h1 class="font-bold text-2xl" translate="no">((channel name))</h1>
    <div class="inline-flex items-center gap-x-1 mt-2">
      <span># videos</span>
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
