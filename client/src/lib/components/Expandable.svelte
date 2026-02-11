<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { WithChildrenSnippet } from "./shared_types";

  interface Props {
    open: boolean;
    class?: string;
    as?: keyof HTMLElementTagNameMap;
  }

  const {
    open = false,
    children,
    class: _class,
    as = "div",
  }: WithChildrenSnippet<Props> = $props();
</script>

<svelte:element
  this={as}
  data-expandable-container=""
  class={twMerge("grid grid-rows-(--is-open) transition-[grid]", _class as string)}
  style={`--is-open: ${open ? 1 : 0}fr`}
>
  <div class="overflow-hidden">
    {@render children?.()}
  </div>
</svelte:element>
