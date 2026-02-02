<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface Props {
    id: string;
    title?: string;

    smol?: boolean;
    displayTS?: string | "premiere";
    hasHighlight?: boolean;
    isShorts?: boolean;

    class?: string;

    topRightSlot?: Snippet;
    segmentSlot?: Snippet;
  }

  const {
    id,
    smol,
    displayTS = "0:00",
    hasHighlight,
    isShorts,
    title,
    class: _class,
    segmentSlot,
    topRightSlot,
  }: Props = $props();
</script>

<div
  data-thumbnail-wrapper=""
  class={twMerge(
    "relative aspect-video w-full rounded-md overflow-hidden",
    _class as string,
  )}
>
  <img
    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
    alt={`Thumbnail for ${title}`}
    class="object-cover size-full"
  />
  <span
    class="backdrop-blur-xs leading-none py-1.5 px-2 rounded-md bg-black/40 absolute bottom-2 right-2"
    >{displayTS}</span
  >
  {#if topRightSlot}
    <div class="absolute top-2 left-2 z-10">
      {@render topRightSlot()}
    </div>
  {/if}
  {#if segmentSlot}
    <div class="absolute bottom-0 inset-x-0 z-10">
      {@render segmentSlot()}
    </div>
  {/if}
</div>
