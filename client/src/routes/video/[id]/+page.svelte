<script>
  import { Meta } from "$lib/components";
  import { page } from "$app/state";
  import { setContext } from "svelte";
  import VideoInfo from "$lib/components/panels/VideoInfo.svelte";
  import { SubmissionTable } from "$lib/components/tables";
  import { SegmentShelf } from "$lib/components/shelf";

  setContext("videoId", { id: page.params.id });
</script>

<Meta title="Segments for ((video))" />
<main class="@container w-full mx-auto max-w-screen-2xl px-6 space-y-2">
  <VideoInfo />
  <SegmentShelf />
  <SubmissionTable />
</main>
