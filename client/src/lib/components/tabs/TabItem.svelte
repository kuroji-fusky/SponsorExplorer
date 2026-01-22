<script lang="ts">
  import type { Snippet } from "svelte";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type HTMLTabAttrs = Omit<HTMLAnchorAttributes & HTMLButtonAttributes, "role">;

  interface Props extends HTMLTabAttrs {
    children?: Snippet;
    active?: boolean;
  }

  const dynElement = "button";

  const { children, class: className, active, ...others }: Props = $props();
</script>

<svelte:element
  this={dynElement}
  role="tab"
  data-active-tab={active ? "" : undefined}
  class={twMerge([
    "shrink-0 select-none px-2.5 rounded-md py-1 data-active-tab:bg-red-700",
    className as string,
  ])}
  {...others}
>
  {@render children?.()}
</svelte:element>
