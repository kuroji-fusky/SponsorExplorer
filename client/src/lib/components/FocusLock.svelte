<script lang="ts">
  import { fade } from "svelte/transition";
  import type { WithChildrenSnippet } from "./shared_types";

  interface Props {
    hasFocusGuard?: boolean;
    ondismiss?: () => void;
  }

  const { children, hasFocusGuard, ondismiss }: WithChildrenSnippet<Props> = $props();
</script>

<div data-focus-lock="" class="contents">
  {#if hasFocusGuard}
    <button data-focus-guard="" aria-hidden="true" tabindex="0"></button>
  {/if}
  <div
    onpointerdown={ondismiss}
    class="bg-black/60 z-20 fixed inset-0"
    transition:fade={{ duration: 100 }}
  ></div>
  {@render children?.()}
  {#if hasFocusGuard}
    <button data-focus-guard="" aria-hidden="true" tabindex="0"></button>
  {/if}
</div>

<style>
  [data-focus-guard] {
    @apply pointer-events-none sr-only;
  }
</style>
