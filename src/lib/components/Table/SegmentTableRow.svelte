<script lang="ts">
  import type { SBSegmentData } from "$lib/types"
  import { cn } from "$lib/utils"
  import {
    EyeOffIcon,
    LockIcon,
    TimerOffIcon,
    XCircleIcon
  } from "lucide-svelte"
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
      <span>{item.votes}</span>
      {#if item.isLocked}
        <div class="cursor-help" title="Segment has been locked by a VIP">
          <LockIcon class="text-yellow-500" size={18} />
        </div>
      {/if}
    </div>
  </td>

  <td id="views">
    <div class="flex items-center gap-x-1.5">
      <span>
        {item.segmentAction !== "full" ? item.views : "—"}
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
          class="text-red-500 cursor-help"
          title="Segment is hidden from video duration change"
        >
          <TimerOffIcon size={18} />
        </div>
      {/if}
    </div>
  </td>
  <td id="segment">
    <SegmentBadge
      segment={item.segmentLabel}
      chapterLabel={item.chapterLabel}
    />
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
