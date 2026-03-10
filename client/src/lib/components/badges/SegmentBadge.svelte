<script lang="ts">
  import Badge from "./Badge.svelte";
  import {
    CATEGORY_MAP,
    type Category as Segment,
  } from "$lib/constants/sponsorBlock";

  interface Props {
    chapterLabel?: string;
    segment: Segment;
  }

  const { segment, chapterLabel }: Props = $props();

  // svelte-ignore state_referenced_locally
  const _seg = CATEGORY_MAP[segment];
</script>

<Badge
  style={`--badge-color: var(--${_seg.var});`}
  class={[
    "relative inline-flex items-center gap-x-1.5 rounded-2xl cursor-help",
    "before:bg-(--badge-color) before:rounded-full before:size-3 before:shrink-0 before:z-[1]",
    "after:bg-(--badge-color) after:z-0 after:absolute after:inset-0 after:opacity-25",
  ]}
>
  <span
    class={[
      "text-sm font-semibold z-[1]",
      chapterLabel ? "underline decoration-dashed" : "",
    ]}>{chapterLabel ? chapterLabel : _seg.label}</span
  >
</Badge>
