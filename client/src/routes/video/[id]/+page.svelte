<script>
  import { Meta } from "$lib/components";
  import { page } from "$app/state";
  import { setContext } from "svelte";
  import VideoInfo from "$lib/components/panels/VideoInfo.svelte";
  import { SubmissionTable } from "$lib/components/tables";
  import { SegmentShelf } from "$lib/components/shelf";
  import LockedSegments from "$lib/components/notices/LockedSegments.svelte";

  setContext("videoId", { id: page.params.id });
</script>

<Meta title="Segments for ((video))" />
<main class="@container w-full mx-auto max-w-screen-2xl px-6">
  <VideoInfo />
  <SegmentShelf />
  <!-- <LockedSegments /> -->
  <div role="tabpanel">
    <SubmissionTable />
  </div>
</main>
