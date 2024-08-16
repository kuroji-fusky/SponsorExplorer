<script lang="ts">
  import LockIcon from "lucide-svelte/icons/lock"
  import HelpIcon from "lucide-svelte/icons/circle-help"
  import ChevronRightIcon from "lucide-svelte/icons/chevron-right"
  import Link from "./Link.svelte"
  import { cn } from "$lib/utils"

  let helpInfoPanel = false

  const toggleHelpInfo = () => (helpInfoPanel = !helpInfoPanel)
</script>

<div class="bg-yellow-700 bg-opacity-40 text-yellow-50 px-3 py-2 rounded-md">
  <div class="flex justify-between">
    <div class="font-semibold inline-flex gap-x-2 items-center">
      <LockIcon size={17.5} class="flex-shrink-0" />
      <span
        >This video has a number of segments locked from further submissions
      </span>
      <button
        class="flex-shrink-0 opacity-75 hover:opacity-100"
        on:click={toggleHelpInfo}
      >
        <HelpIcon size={16} />
      </button>
    </div>
    <button class="flex-shrink-0">
      <ChevronRightIcon size={19} />
    </button>
  </div>
  <div class="contents [&_div:not(.hidden)]:mt-2">
    <div class="hidden"></div>
    <div class={cn(helpInfoPanel ? "" : "hidden")}>
      <p class="pb-1">
        <strong>About locked segments:</strong> certain or all segments are
        locked to prevent it from irrelevant and/or spammy segments; and, in
        most cases, all the submitted segments are perfectly timed and won't
        need any further submissions in the future. <Link
          href="https://wiki.sponsor.ajay.app/w/VIP#Moderating_segments"
          external>Learn more</Link
        >
      </p>
    </div>
  </div>
</div>
