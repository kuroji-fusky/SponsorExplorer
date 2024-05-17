<script>
  import { SegmentBadge } from "$lib/components/Badges"
  import SEO from "$lib/components/SEO.svelte"
  import YouTube from "$lib/components/YouTube.svelte"
</script>

<SEO title="Yes" />

<div class="flex gap-y-4 gap-x-6 mt-8">
  <YouTube id="3Vsd6zPChIU" />
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
<SegmentBadge segment="intro" />
<SegmentBadge segment="interaction" />
<SegmentBadge segment="poi_highlight" />
<SegmentBadge segment="preview" />
<SegmentBadge segment="outro" />
<SegmentBadge segment="exclusive_access" />
<SegmentBadge segment="non_music" />
<SegmentBadge segment="filler" />
