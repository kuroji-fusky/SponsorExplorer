<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface Props {
    open: boolean;
    class: string;
    children: Snippet;
    as: keyof HTMLElementTagNameMap;
  }

  const {
    open = false,
    children,
    class: _class,
    as = "div",
  }: Partial<Props> = $props();
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
