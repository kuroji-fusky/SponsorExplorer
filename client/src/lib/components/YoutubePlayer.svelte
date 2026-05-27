<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { twMerge } from "tailwind-merge";
  import Spinner from "./Spinner.svelte";

  interface Props {
    id?: string;
    class?: string;
  }

  const { id, class: className }: Props = $props();

  const rnd = `player-${crypto.randomUUID()}`;

  const yt_iframe_loaded = getContext<Writable<boolean>>("ytIframeLoaded");
  let yt_loaded = $state(false);

  let load_msg = $state("Waiting for Iframe API to load...");

  $effect(() => {
    const start_timer = performance.now();
    if (!$yt_iframe_loaded) return;
    load_msg = "Iframe API loaded - waiting for player...";

    new YT.Player(rnd, {
      host: "https://www.youtube-nocookie.com",
      height: "100%",
      width: "100%",
      videoId: id,
      playerVars: {
        rel: 0,
        enablejsapi: 1,
        showinfo: 0,
      },
      events: {
        onReady: () => {
          yt_loaded = true;
          load_msg = "";
          const breakpoint_ready = performance.now();
          console.debug(
            "Iframe onReady =>",
            (breakpoint_ready - start_timer) / 1024,
          );
        },
        onStateChange: (e) => {
          const currentTime = e.target.getCurrentTime();

          console.log("onStateChange ->", {
            state: e.target.getPlayerState(),
            ts: currentTime,
            rel_ts: (currentTime / e.target.getDuration()) * 100,
          });
        },
        // onApiChange: (e) => {
        //   console.log("onApiChange ->", { ts: e.target.getCurrentTime(), rel_ts: e.target });
        // },
        onError: (e) => {
          console.error("Error", e);
        },
      },
    });
  });
</script>

<div data-yt-player="" class={twMerge("*:aspect-video relative", className)}>
  <div id={rnd}></div>
  {#if !($yt_iframe_loaded && yt_loaded)}
    <div
      class="size-full flex flex-col items-center justify-center absolute inset-0 bg-black gap-y-2"
    >
      <Spinner />
      <div class="select-none">{load_msg}</div>

      <noscript>
        <div>Couldn't mount player, make sure that JavaScript is enabled.</div>
      </noscript>
    </div>
  {/if}
</div>
