<script lang="ts" module>
  import { Link as a } from "$lib/components";
  export { a };

  export let title: string;
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<div data-mdsvex-wrapper="">
  {@render children()}
</div>
