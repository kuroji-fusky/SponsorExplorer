<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  interface Props extends HTMLAnchorAttributes {
    children?: Snippet;
  }

  const { href, class: className, children, ...others }: Props = $props();

  const hasHttp = href?.startsWith("http");
</script>

<a
  {href}
  class={twMerge(
    "text-red-900 dark:text-red-100 relative after:absolute after:block after:h-px after:inset-x-0 after:bottom-0 after:-z-10 after:bg-red-50/40 hover:after:bg-red-100",
    className as string,
  )}
  target={hasHttp ? "_blank" : undefined}
  {...others}
>
  {@render children?.()}
</a>
