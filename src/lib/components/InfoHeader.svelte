<script lang="ts">
  import YouTube from "./YouTube.svelte"

  export let headingMuted: string
  export let headingTitle: string
  export let youtubeId: string = ""
</script>

<section class="flex">
  <div class="flex-shrink-0">
    {#if youtubeId}
      <YouTube id={youtubeId} />
    {/if}
  </div>
  <div class="flex-1 flex flex-col">
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">{headingMuted}</div>
      <h1 class="text-2xl mb-1">{headingTitle}</h1>
    </div>
    <slot name="stats" />
    <slot name="actions" />
  </div>
</section>
