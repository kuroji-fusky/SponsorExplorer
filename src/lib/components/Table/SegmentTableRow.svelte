<script lang="ts">
  import EyeOffIcon from "lucide-svelte/icons/eye-off"
  import LockIcon from "lucide-svelte/icons/lock"
  import TimerOffIcon from "lucide-svelte/icons/timer-off"
  import XCircleIcon from "lucide-svelte/icons/circle-x"

  import type { SBSegmentData } from "$lib/types"
  import { cn, formatNumber } from "$lib/utils"

  import { LengthBadge, SegmentBadge } from "../Badges"

  export let item: SBSegmentData

  const isDownvoted = item.votes <= -2
  const hiddenIndicator = isDownvoted || item.isHidden || item.isShadowHidden
</script>

<tr
  class={cn(
    "border-b border-neutral-800",
    hiddenIndicator
      ? "opacity-30 hover:opacity-100 grayscale-[.75] hover:grayscale-0"
      : null
  )}
>
  <td id="submitted-date">
    <time datetime={item.submittedDate}>
      {item.submittedDateReadable}
    </time>
  </td>

  <td id="votes">
    <div class="flex items-center gap-x-1.5">
      <span>{formatNumber(item.votes)}</span>
      {#if item.isLocked}
        <div class="cursor-help" title="Segment has been locked by a VIP">
          <LockIcon class="text-yellow-500" size={18} />
        </div>
      {/if}
    </div>
  </td>

  <td id="views">
    <div class="flex items-center gap-x-1.5">
      <span class={item.segmentAction !== "full" ? null : "opacity-50"}>
        {item.segmentAction !== "full" ? formatNumber(item.views) : "—"}
      </span>
      {#if isDownvoted}
        <div
          class="text-red-500 cursor-help"
          title="Segment not shown from downvotes"
        >
          <XCircleIcon size={18} />
        </div>
      {/if}
      {#if item.isShadowHidden}
        <div
          class="text-red-500 cursor-help"
          title="Segment has been shadowhidden"
        >
          <EyeOffIcon size={18} />
        </div>
      {/if}
      {#if item.isHidden}
        <div
          class="text-orange-500 cursor-help"
          title="Segment is hidden from video duration change"
        >
          <TimerOffIcon size={18} />
        </div>
      {/if}
    </div>
  </td>

  <td id="segment">
    <div class="group relative w-fit">
      <SegmentBadge
        segment={item.segmentLabel}
        chapterLabel={item.chapterLabel}
      />
      <div
        class="absolute w-max z-20 top-9 left-0 group-hover:opacity-100 opacity-0 bg-neutral-950 py-2 px-3 border border-neutral-600 rounded-md pointer-events-none transition-opacity flex flex-col"
      >
        <div>
          UUID: {item.uuid}
        </div>
        <div class="border border-neutral-600 my-1.5 w-full" aria-hidden />
        <div class="text-sm opacity-75">
          <kbd>Shift</kbd> + Click to copy UUID
        </div>
        <div class="text-sm opacity-75">
          <kbd>Alt</kbd> + <kbd>Shift</kbd> + Click to copy segment info
        </div>
      </div>
    </div>
  </td>

  <td id="length">
    <LengthBadge
      actionType={item.segmentAction}
      startTime={item.startTime}
      endTime={item.endTime}
    />
  </td>

  <td id="username-userid">
    <div class="overflow-ellipsis overflow-hidden w-48">
      {item.userid}
    </div>
  </td>
</tr>
