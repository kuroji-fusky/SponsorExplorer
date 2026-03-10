<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { WithChildrenSnippet } from "../shared_types";

  const { children, class: _class }: WithChildrenSnippet<{ class: string }> =
    $props();
</script>

<div class={twMerge("px-2.5 py-[0.15rem] rounded-md overflow-hidden", _class)}>
  {@render children?.()}
</div>
