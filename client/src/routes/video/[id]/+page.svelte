<script>
  import { Meta, YoutubePlayer } from "$lib/components";
  import { page } from "$app/state";
</script>

<Meta title="Segments for ((video))" />
<main class="@container w-full mx-auto max-w-7xl px-6">
  <YoutubePlayer id={page.params.id} />
</main>
