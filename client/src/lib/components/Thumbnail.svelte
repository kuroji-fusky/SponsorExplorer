<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    src: string;
    title?: string;

    smol?: boolean;
    displayTS?: string | "premiere";
    hasHighlight?: boolean;
    isShorts?: boolean;

    isLocked?: boolean;
    fullLabel?: string;

    class?: string;
  }

  const {
    src,
    smol,
    displayTS = "0:00",
    hasHighlight,
    isShorts,
    isLocked,
    fullLabel,
    title,
    class: _class,
  }: Props = $props();
</script>

<div data-thumbnail-wrapper="" class={twMerge("relative aspect-video", _class as string)}>
  <img {src} alt={`Thumbnail for ${title}`} />
</div>
