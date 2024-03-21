<script lang="ts">
  import { onMount } from "svelte"

  export let id: string

  onMount(() => {
    const ytIframeMount = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: id,
      playerVars: {
        rel: 0,
        fs: 0
      }
    })

    console.log(ytIframeMount)
  })
</script>

<div class="aspect-video w-[40rem] rounded-lg overflow-hidden">
  <div id="player"></div>
</div>
