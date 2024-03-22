<script lang="ts">
  export const csr = true

  import { onMount } from "svelte"

  export let id: string

  const ytId = "player-shell"

  onMount(() => {
    // TODO: add setInterval for 100ms if iframe mounting fails, then clearInterval if it successfully mounts
    const loadPlayer = () => {
      const ytIframeMount = new YT.Player(ytId, {
        height: "100%",
        width: "100%",
        videoId: id,
        playerVars: {
          rel: 0,
          fs: 0
        },
        events: {
          // TBA
        }
      })

      console.log(ytIframeMount)
    }

    // This is a hacky way to get the player to mount client-side
    setTimeout(loadPlayer, 25)
  })
</script>

<div class="aspect-video w-[40rem] rounded-lg overflow-hidden">
  <div id={ytId} />
</div>
