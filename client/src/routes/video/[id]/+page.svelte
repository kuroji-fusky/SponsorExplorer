<script lang="ts">
  import { Meta } from "$lib/components";
  import { page } from "$app/state";
  import VideoInfo from "$lib/components/panels/VideoInfo.svelte";
  import { SubmissionTable } from "$lib/components/tables";
  import { SegmentShelf } from "$lib/components/shelf";
  import type { LayoutProps } from "./$types";
  import { setVideoMeta } from "$lib/context";
  import Badge from "$lib/components/badges/Badge.svelte";
  import SegmentBadge from "$lib/components/badges/SegmentBadge.svelte";
  // import LockedSegments from "$lib/components/notices/LockedSegments.svelte";

  const { data }: LayoutProps = $props();
  const { details } = data;

  setVideoMeta({ id: page.params.id!, ...details });
</script>

<Meta title={`Segments from "${details.title}" by ${details.channel.name}`} />
<main class="@container w-full mx-auto max-w-screen-2xl px-6">
  <VideoInfo />
  <SegmentShelf />
  <!-- <LockedSegments /> -->
  <div role="tabpanel">
    <SubmissionTable />
  </div>
  <SegmentBadge chapterLabel="LMAO" segment="chapter" />
</main>
