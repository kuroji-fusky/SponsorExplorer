<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface Props {
    src: string;
    name: string;
    otherMeta?: Snippet;
    actions?: Snippet;
    class?: string;
  }

  const { src, name, otherMeta, actions, class: _class }: Props = $props();
</script>

<div
  data-channel-item=""
  class={twMerge(
    "flex items-center gap-x-2",
    _class as string,
  )}
>
  <img
    {src}
    alt={`Channel avatar for ${name}`}
    class="rounded-full shrink-0 aspect-square size-(--avatar-size,--spacing(7)) bg-amber-600"
  />
  {#if !otherMeta}
    <span class="flex-1">{name}</span>
  {:else}
    <div class="flex-1">
      <span>{name}</span>
      <div>{@render otherMeta()}</div>
    </div>
    {@render actions?.()}
  {/if}
</div>
