<script lang="ts">
  import type { Snippet } from "svelte";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";

  type Lezzie = Omit<HTMLAnchorAttributes & HTMLButtonAttributes, "role">;

  interface Props extends Lezzie {
    children?: Snippet;
  }

  const dynElement = "button";

  const { children, class: cN, ...bruh }: Props = $props();
</script>

<svelte:element this={dynElement} role="tab" class={cN} {...bruh}>
  {@render children?.()}
</svelte:element>
