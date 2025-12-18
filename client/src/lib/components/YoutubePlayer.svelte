<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { twMerge } from "tailwind-merge";

  interface Props {
    id?: string;
    class?: string;
  }

  const { id, class: className }: Props = $props();

  const rnd = `player-${crypto.randomUUID()}`;

  const yt_loaded = getContext<Writable<boolean>>("ytIframeLoaded");
  $effect(() => {
    if (!$yt_loaded) return;

    new YT.Player(rnd, {
      host: "https://www.youtube-nocookie.com",
      height: "100%",
      width: "100%",
      videoId: id,
      playerVars: {
        rel: 0,
        enablejsapi: 1,
        showinfo: 0,
        fs: 0
      },
    });
  });
</script>

<div data-yt-player="" class={twMerge("*:aspect-video", className)}>
  <span id={rnd}></span>
  {#if !$yt_loaded}
  <div class="size-full flex items-center justify-center">
    <span>Mounting player</span>
    <noscript>Couldn't mount player, make sure that JavaScript is enabled.</noscript>
    </div>
  {/if}
</div>
