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
  class={twMerge("flex items-center gap-x-2 min-w-0", _class as string)}
>
  <img
    {src}
    alt={`Channel avatar for ${name}`}
    class="rounded-full shrink-0 aspect-square size-(--avatar-size,--spacing(7)) bg-amber-600"
  />
  {#if !otherMeta}
    <span data-channel-name="" class="min-w-0">{name}</span>
  {:else}
    <div class="min-w-0">
      <div data-channel-name="" class="min-w-0">{name}</div>
      <div class="inline-flex items-center" data-channel-meta="">
        {@render otherMeta()}
      </div>
    </div>
    {@render actions?.()}
  {/if}
</div>
