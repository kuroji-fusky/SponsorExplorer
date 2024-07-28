<script lang="ts">
  import { onMount } from "svelte"

  export let heading: string

  let scrollerRef: HTMLDivElement

  onMount(() => {})
</script>

<div>
  <h2 class="text-xl lg:text-2xl mb-3.5">{heading}</h2>
  <div
    bind:this={scrollerRef}
    class="flex gap-x-1 overflow-x-scroll overflow-y-hidden rounded-md"
  >
    <slot />
  </div>
</div>
