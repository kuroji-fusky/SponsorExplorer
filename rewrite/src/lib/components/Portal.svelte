<script lang="ts">
  import { moveDom } from "$lib/utils/moveDOM";
  import { browser } from "$app/environment";
  import type { Snippet } from "svelte";

  interface Props {
    to?: string;
    children?: Snippet;
  }

  const { to = "body", children }: Props = $props();
</script>

{#if browser}
  <div data-portal="" class="contents" use:moveDom={to}>
    {@render children?.()}
  </div>
{/if}
