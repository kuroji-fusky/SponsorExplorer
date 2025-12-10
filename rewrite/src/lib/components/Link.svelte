<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  interface Props extends HTMLAnchorAttributes {
    children?: Snippet;
  }

  const { href, class: className, children, ...others }: Props = $props();
</script>

<a
  {href}
  class={twMerge("underline text-red-300", className as string)}
  {...others}
>
  {@render children?.()}
</a>
