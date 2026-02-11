<script lang="ts">
  import { moveDom } from "$lib/utils/moveDOM";
  import { browser } from "$app/environment";
  import type { WithChildrenSnippet } from "./shared_types";

  interface Props {
    to?: string;
  }

  const { to = "body", children }: WithChildrenSnippet<Props> = $props();
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
