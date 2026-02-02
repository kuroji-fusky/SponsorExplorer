<script lang="ts">
  import { EllipsisVerticalIcon } from "@lucide/svelte";
  import Thumbnail from "../Thumbnail.svelte";
  import type { VideoItemProps as Props } from "./videoItem.type";
  import Button from "../Button.svelte";

  // biome-ignore lint/style/useConst: assigned from the `button` element
  let segmentMore = $state(false);

  const { id = "7yr2uK9NXGs" }: Props = $props();

  const link = `/video/${id}`;
</script>

<div data-test-id="video-item-grid" class="flex flex-col group">
  <a href={link} class="block rounded-lg duration-200 transition-[border] border-2 border-transparent group-hover:border-amber-400">
    <Thumbnail {id} class="shrink-0" />
  </a>
  <div class="mt-2.5 pr-8 relative">
    <a href={link}>
      <h3 class="font-bold text-lg">((video_title))</h3>
    </a>
    <Button icon class="absolute top-0 right-0">
      <EllipsisVerticalIcon size={17} />
    </Button>
  </div>
  <span
    class="inline-flex flex-wrap mt-1 gap-x-2 *:not-[[data-has-segment]]:opacity-60"
  >
    <time datetime="NaN">Date</time>
    <button onclick={() => (segmentMore = !segmentMore)}>lmao</button>
  </span>
</div>
