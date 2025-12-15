<script lang="ts">
  import type { VideoItemProps as Props } from "./videoItem.type";

  // biome-ignore lint/style/useConst: assigned from the `button` element
  let segmentMore = $state(false);

  const {}: Partial<Props> = $props();
</script>

<div data-test-id="video-item-grid" class="flex flex-col">
  <div
    class="shrink-0 aspect-video w-full relative rounded-md overflow-hidden bg-amber-300"
  ></div>
  <div class="font-bold text-lg mt-2.5">((video_title))</div>
  <span
    class="inline-flex flex-wrap mt-1 gap-x-2 *:not-[[data-has-segment]]:opacity-60"
  >
    <time datetime="NaN">Date</time>
    <button onclick={() => (segmentMore = !segmentMore)}>lmao</button>
  </span>
</div>
