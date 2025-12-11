<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  const {
    children,
    hasFocusGuard,
    ondismiss,
  }: {
    children?: Snippet;
    hasFocusGuard?: boolean;
    ondismiss?: () => void;
  } = $props();
</script>

<div data-focus-lock="" class="contents">
  {#if hasFocusGuard}
    <button data-focus-guard="" aria-hidden="true" tabindex="0"></button>
  {/if}
  <div
    onpointerdown={ondismiss}
    class="bg-black/60 fixed inset-0"
    transition:fade={{ duration: 100 }}
  ></div>
  {@render children?.()}
  {#if hasFocusGuard}
    <button data-focus-guard="" aria-hidden="true" tabindex="0"></button>
  {/if}
</div>

<style lang="postcss">
  [data-focus-guard] {
    @apply pointer-events-none sr-only;
  }
</style>
