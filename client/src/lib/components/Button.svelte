<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  interface Props extends Omit<HTMLButtonAttributes, "prefix"> {
    icon?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
  }

  const {
    icon,
    prefix,
    suffix,
    children,
    class: _class,
    ...others
  }: Props = $props();
</script>

<button
  class={twMerge(
    "select-none hover:bg-neutral-400/20 px-2.5 py-1.5 rounded-sm border hover:dark:border-neutral-400/60 dark:border-neutral-500/50 inline-flex items-center gap-x-1.5",
    prefix || suffix ? "inline-flex" : "inline-block",
    _class as string,
  )}
  {...others}
>
  {@render prefix?.()}
  {@render children?.()}
  {@render suffix?.()}
</button>
