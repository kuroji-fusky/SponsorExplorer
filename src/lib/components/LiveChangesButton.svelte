<script lang="ts">
  import ChevronDownIcon from "lucide-svelte/icons/chevron-down"
  import PauseIcon from "lucide-svelte/icons/pause"
  import PlayIcon from "lucide-svelte/icons/play"
  import { isLiveFetchSegments } from "$lib/stores"
  import { cn } from "$lib/utils"
  import Badge from "./Badges/Badge.svelte"
  import Button from "./Button.svelte"
</script>

<div
  class={cn(
    "flex [&_button]:transition-colors",
    $isLiveFetchSegments
      ? "[&_button]:bg-red-600 hover:[&_button]:bg-red-700"
      : ""
  )}
>
  <Button
    title="Periodically fetch for new and updated segments in realtime; only applicable if server is set to https://sponsor.ajay.app/."
    clickEvent={isLiveFetchSegments.toggleState}
    class={cn(
      "flex gap-x-1.5 items-center rounded-tr-none rounded-br-none border-r border-r-neutral-300"
    )}
  >
    {#if !$isLiveFetchSegments}
      <PlayIcon size={18} />
    {:else}
      <PauseIcon size={18} />
    {/if}
    <span class="px-1.5">1m</span>
  </Button>
  <Button class="rounded-tl-none rounded-bl-none" iconOnly>
    <ChevronDownIcon size={18} />
  </Button>
</div>
