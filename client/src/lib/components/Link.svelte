<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  import type { WithChildrenSnippet } from "./shared_types";

  const {
    href,
    class: _class,
    children,
    ...others
  }: WithChildrenSnippet<HTMLAnchorAttributes> = $props();

  const hasHttp = href?.startsWith("http");
</script>

<a
  {href}
  class={twMerge(
    "text-red-900 dark:text-red-100 relative after:absolute after:block after:h-px after:inset-x-0 after:bottom-0 after:-z-10 after:bg-red-50/40 hover:after:bg-red-100",
    _class as string,
  )}
  target={hasHttp ? "_blank" : undefined}
  {...others}
>
  {@render children?.()}
</a>
