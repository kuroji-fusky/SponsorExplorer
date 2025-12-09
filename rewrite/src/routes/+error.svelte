<script lang="ts">
  export const prerender = true;
  import { page } from "$app/stores";
</script>

<main class="flex flex-col justify-center text-center mt-20">
  <h1 class="text-5xl font-bold my-5">{$page.status}</h1>
  <p>{$page.error?.message || "Page not Found"}</p>
</main>
