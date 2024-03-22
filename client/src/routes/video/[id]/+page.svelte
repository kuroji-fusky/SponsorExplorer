<script lang="ts">
  import { SegmentBadge } from "$lib/components/Badges"
  import YouTube from "$lib/components/YouTube.svelte"
  import { cn } from "$lib/utils/cn.js"

  export let data
</script>

<div>
  <YouTube id={data.id} />
</div>
<div>
  {#each data.items as item}
    <div class={cn(item.votes <= -2 ? "opacity-50" : "")}>
      <span>{item.submittedDate}</span>
      <SegmentBadge segment={item.segmentLabel} />
      <span>{item.segmentAction}</span>
      <span>{item.segmentLabel}</span>
      <span>Views: {item.views}</span>
      <span>{item.votes}</span>
    </div>
  {/each}
</div>
