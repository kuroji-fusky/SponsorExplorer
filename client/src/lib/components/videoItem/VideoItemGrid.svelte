<script lang="ts">
  import { EllipsisVerticalIcon } from "@lucide/svelte";
  import Thumbnail from "../Thumbnail.svelte";
  import type { VideoItemProps as Props } from "./videoItem.type";
  import Button from "../Button.svelte";
  import Datetime from "../Datetime.svelte";

  // biome-ignore lint/style/useConst: assigned from the `button` element
  let segmentMore = $state(false);

  const { id, title, date }: Props = $props();

  const link = `/video/${id}`;
</script>

<div data-test-id="video-item-grid" class="flex flex-col group">
  <a
    href={link}
    class="block rounded-lg duration-200 transition-[border] border-2 border-transparent group-hover:border-amber-400"
  >
    <Thumbnail {id} {title} class="shrink-0" />
  </a>
  <div class="flex flex-col gap-y-2">
    <div class="mt-2.5 pr-8 relative">
      <a href={link}>
        <h3 class="font-bold text-lg">{title}</h3>
      </a>
      <Button icon variant="tritery" class="absolute top-0 right-0">
        <EllipsisVerticalIcon size={17} />
      </Button>
    </div>
    <!-- <span>Channel collab feature</span> -->
    <span
      class="inline-flex flex-wrap gap-x-2 *:not-[[data-has-segment]]:opacity-60"
    >
      <!-- <time datetime="NaN">{date}</time> -->
      <Datetime {date} />
      <button onclick={() => (segmentMore = !segmentMore)}>N segments</button>
    </span>
  </div>
</div>
