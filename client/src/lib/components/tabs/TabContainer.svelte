<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  import type { WithChildrenSnippet } from "../shared_types";

  const { children, class: _class }: WithChildrenSnippet<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  data-tab-container=""
  role="tablist"
  class={twMerge(["inline-flex items-center bg-neutral-700/50 p-0.5 rounded-md overflow-hidden border border-neutral-500", _class as string])}
>
  {@render children?.()}
</div>
