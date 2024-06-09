<script lang="ts">
  import { SEO } from "$lib/components"
  import { page } from "$app/stores"
</script>

<SEO title={`${$page.status}: ${$page.error?.message}`} />

<main class="flex flex-col justify-center text-center mt-20">
  <h1 class="text-5xl font-bold my-5">{$page.status}</h1>
  <p>{$page.error?.message || "Page Not Found"}</p>
</main>
