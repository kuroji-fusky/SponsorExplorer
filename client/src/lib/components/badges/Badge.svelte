<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { WithChildrenSnippet } from "../shared_types";

  interface Props {
    class: string | string[];
    style?: string;
  }

  const {
    children,
    class: _class,
    style,
  }: WithChildrenSnippet<Props> = $props();
</script>

<div
  data-badge=""
  {style}
  class={twMerge("px-2.5 py-[0.15rem] rounded-md overflow-hidden", _class)}
>
  {@render children?.()}
</div>
