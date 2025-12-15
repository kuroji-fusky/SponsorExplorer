<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    id?: string;
    class?: string;
  }

  const { id, class: className }: Props = $props();

  const rnd = `player-mount-${crypto.randomUUID()}`;
</script>

<noscript>couldn't mount yt player</noscript>
<div data-yt-player="" class={twMerge("*:aspect-video", className)}>
  <span id={rnd}></span>
  <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title="no">
  </iframe>
</div>
