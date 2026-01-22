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
  {#if children}
    <div data-portal="" use:moveDom={to}>
      {@render children?.()}
    </div>
  {/if}
{/if}

<style>
  [data-portal] {
    @apply contents empty:hidden;
  }
</style>
