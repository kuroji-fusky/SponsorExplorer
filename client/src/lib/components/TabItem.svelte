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
  }

  const dynElement = "button";

  const { children, class: className, ...bruh }: Props = $props();
</script>

<svelte:element
  this={dynElement}
  role="tab"
  class={twMerge(["shrink-0", className as string])}
  {...bruh}
>
  {@render children?.()}
</svelte:element>
