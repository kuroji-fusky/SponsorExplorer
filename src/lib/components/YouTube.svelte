<script lang="ts">
  import { browser } from "$app/environment"
  import { onMount } from "svelte"
  import { ytCurrentTime, ytPlayerState } from "$lib/stores"

  export let id: string

  const ytId = "player-shell"

  onMount(() => {
    if (browser) {
      const loadPlayer = () => {
        new YT.Player(ytId, {
          host: "https://www.youtube-nocookie.com",
          height: "100%",
          width: "100%",
          videoId: id,
          playerVars: {
            rel: 0,
            fs: 0,
            enablejsapi: 1
          },
          events: {
            onReady: () => {
              console.log("I'm ready")
            },
            onStateChange: (e) => {
              const currentPlaybackState = e.data

              const playbackStates = {
                "-1": "Not started",
                "0": "Ended",
                "1": "Playing",
                "2": "Paused",
                "3": "Buffering",
                "5": "Cued"
              } as const

              $ytPlayerState = playbackStates[currentPlaybackState]
            }
          }
        })
      }

      // This is a hacky way to get the player to mount client-side
      setTimeout(loadPlayer, 100)
    }
  })
</script>

<div
  class="aspect-video 2xl:w-[45rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative"
>
  <noscript>
    <div
      class="w-full h-full bg-black/75 p-4 text-center grid place-items-center"
    >
      Failed to mount player, please re-enable JavaScript for better
      functionality!
    </div>
  </noscript>
  {#if browser}
    <div id={ytId} />
  {/if}
</div>
