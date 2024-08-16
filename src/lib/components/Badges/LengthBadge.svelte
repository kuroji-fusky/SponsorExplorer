<script lang="ts">
  import Badge from "./Badge.svelte"
  import FastForwardIcon from "lucide-svelte/icons/fast-forward"
  import VolumeXIcon from "lucide-svelte/icons/volume-x"
  import SparklesIcon from "lucide-svelte/icons/sparkles"
  import Bookmark from "lucide-svelte/icons/bookmark"
  import { formatTimecode } from "$lib/utils"

  export let actionType: string = "skip"
  export let startTime: number = 0
  export let endTime: number = 1

  const actionTypeIcons: any = {
    skip: FastForwardIcon,
    mute: VolumeXIcon
  }

  const calculatedLength = endTime - startTime

  const roundNum = (n: number) => n.toFixed(2)

  const displayLength = `${formatTimecode(startTime)} – ${formatTimecode(endTime)}`
  const displayLengthHighlight = `${roundNum(startTime)}s`
  const displayCalculatedLength = `(${roundNum(calculatedLength)}s)`

  const ICON_SIZE = 18
</script>

<Badge
  class="bg-neutral-900 rounded-2xl inline-flex items-center gap-x-1.5 py-0.5 [&_span]:text-sm"
>
  {#if actionType === "skip" || actionType === "mute"}
    <svelte:component this={actionTypeIcons[actionType]} size={ICON_SIZE} />
    <span>{displayLength}</span>
    <span class="opacity-75">{displayCalculatedLength}</span>
  {:else if actionType === "full"}
    <SparklesIcon size={ICON_SIZE} />
    <span class="font-bold">Full Video Label</span>
  {:else if actionType === "poi"}
    <SparklesIcon size={ICON_SIZE} class="stroke-sb-highlight" />
    <span>{displayLengthHighlight}</span>
  {:else if actionType === "chapter"}
    <Bookmark size={ICON_SIZE} />
    <span>{displayLength}</span>
    <span class="opacity-75">{displayCalculatedLength}</span>
  {/if}
</Badge>
