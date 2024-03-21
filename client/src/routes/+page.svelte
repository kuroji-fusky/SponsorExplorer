<script>
  import { SegmentBadge } from "$lib/components/Badges"
  import YouTube from "$lib/components/YouTube.svelte"
</script>

<svelte:head>
  <title>testing</title>
</svelte:head>

<div class="flex gap-y-4 gap-x-6 mt-8">
  <YouTube id="3KPY-gjmHWA" />
  <div class="flex flex-col gap-y-3">
    <!-- Title -->
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for</div>
      <span class="text-3xl font-bold">Video title</span>
    </div>
    <!-- Stats -->
    <div>stats</div>
    <!-- Actions -->
    <div>actions</div>
  </div>
</div>

<SegmentBadge segment="sponsor" />
<SegmentBadge segment="selfpromo" />
<SegmentBadge segment="interaction" />
<SegmentBadge segment="highlight" />
<SegmentBadge segment="preview" />
<SegmentBadge segment="endcards" />
<SegmentBadge segment="exclusive-access" />
<SegmentBadge segment="non-music" />
<SegmentBadge segment="filler" />
