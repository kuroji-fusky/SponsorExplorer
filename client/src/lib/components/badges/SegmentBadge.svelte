<script lang="ts">
  import Badge from "./Badge.svelte";
  import { twMerge } from "tailwind-merge";
  import {
    CATEGORY_MAP,
    type Category as Segment,
  } from "$lib/constants/sponsorBlock";

  interface Props {
    chapterLabel?: string;
    segment: Segment;
  }

  const { segment, chapterLabel }: Props = $props();

  const _seg = CATEGORY_MAP[segment];
</script>

<Badge
  class="relative inline-flex items-center gap-x-1.5 rounded-2xl cursor-help"
>
  <span class={[_seg.bg, "rounded-full size-3 flex-shrink-0 z-[1]"]}
  ></span>
  <span
    class={[
      "text-sm font-semibold z-[1]",
      chapterLabel ? "underline decoration-dashed" : "",
    ]}>{chapterLabel ? chapterLabel : _seg.label}</span
  >
  <div class={[_seg.bg, "z-0 absolute inset-0 opacity-25"]}></div>
</Badge>
