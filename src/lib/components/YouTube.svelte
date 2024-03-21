<script lang="ts">
  import { onMount } from "svelte"

  export let id: string = "UpxtO4nFBZw"

  onMount(() => {
    const ytIframeMount = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: id,
      playerVars: {
        rel: 0
      }
    })

    console.log(ytIframeMount)
  })
</script>

<div class="aspect-video w-1/2 rounded-md overflow-hidden">
  <div id="player" />
</div>
