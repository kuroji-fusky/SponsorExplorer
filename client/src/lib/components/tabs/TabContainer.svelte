<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  const { children, class: className }: Props = $props();
</script>

<div
  data-tab-container=""
  role="tablist"
  class={twMerge(["inline-flex items-center bg-neutral-700/50 p-0.5 rounded-md overflow-hidden border border-neutral-500", className as string])}
>
  {@render children?.()}
</div>
