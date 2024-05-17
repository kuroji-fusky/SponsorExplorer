<script lang="ts">
  import { browser } from "$app/environment"
  import { onMount } from "svelte"

  export let id: string

  const ytId = "player-shell"

  onMount(() => {
    if (browser) {
      const loadPlayer = () => {
        const ytIframeMount = new YT.Player(ytId, {
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
                "-1": "UNSTARTED",
                "0": "ENDED",
                "1": "PLAYING",
                "2": "PAUSED",
                "3": "BUFFERING",
                "5": "CUED"
              }

              console.log(playbackStates[currentPlaybackState])
            }
          }
        })

        console.log(ytIframeMount)
      }

      // This is a hacky way to get the player to mount client-side
      setTimeout(loadPlayer, 25)
    }
  })
</script>

<div class="aspect-video w-[38rem] rounded-lg overflow-hidden">
  {#if browser}
    <div id={ytId} />
  {/if}
</div>
