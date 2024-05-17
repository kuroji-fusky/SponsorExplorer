<script lang="ts">
  import Badge from "./Badge.svelte"
  import FastForwardIcon from "lucide-svelte/icons/fast-forward"
  import VolumeXIcon from "lucide-svelte/icons/volume-x"
  import SparklesIcon from "lucide-svelte/icons/sparkles"

  export let actionType: string = "skip"
  export let startTime: number = 0
  export let endTime: number = 1

  const actionTypeIcons: any = {
    skip: FastForwardIcon,
    mute: VolumeXIcon
  }

  const calculatedLength = endTime - startTime

  const roundNum = (n: number) => n.toFixed(2)

  const displayLength = `${roundNum(startTime)} – ${roundNum(endTime)}`
  const displayLengthHighlight = `${roundNum(startTime)}s`
  const displayCalculatedLength = `${roundNum(calculatedLength)}s`
</script>

<Badge
  class="bg-gray-200 rounded-2xl inline-flex items-center gap-x-1 py-0.5 [&_span]:text-sm"
>
  {#if actionType === "skip" || actionType === "mute"}
    <svelte:component this={actionTypeIcons[actionType]} size={18} />
    <span>{displayLength}</span>
    <span class="opacity-75">{displayCalculatedLength}</span>
  {:else if actionType === "full"}
    <SparklesIcon size={18} />
    <span class="font-bold">Full Label</span>
  {:else if actionType === "poi"}
    <SparklesIcon size={18} class="stroke-sb-highlight" />
    <span>{displayLengthHighlight}</span>
  {/if}
</Badge>
