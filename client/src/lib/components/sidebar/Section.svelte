<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../Button.svelte";
  import { ChevronRightIcon } from "@lucide/svelte";
  import Expandable from "../Expandable.svelte";

  interface Props {
    isOpen?: boolean;
    name: string;
    children?: Snippet;
    isExpandable?: boolean;
    action?: Snippet;
  }

  const {
    isOpen,
    isExpandable = true,
    name,
    children,
    action,
  }: Props = $props();

  let isItCumming = $state(isOpen ?? false);
  const toggleState = () => (isItCumming = !isItCumming);
</script>

<section data-group-collapsible="">
  <div class="flex items-center">
    {#if isExpandable}
      <Button variant="tritery" size="skinny" class="px-0" onclick={toggleState}>
        <span class="font-semibold text-base leading-none mx-1">
          {name}
        </span>
        {#snippet suffix()}
          <ChevronRightIcon
            size={17}
            class={["transition-transform", isItCumming ? "rotate-90" : ""]}
          />
        {/snippet}
      </Button>
    {:else}
      <span class="font-semibold text-base leading-none mx-1">
        {name}
      </span>
    {/if}

    <span class="flex-1"></span>
    {#if action}
      <div id="actions" class="flex gap-x-0.5">
        {@render action()}
      </div>
    {/if}
  </div>
  {#if isExpandable}
    <Expandable open={isItCumming}>
      {@render children?.()}
    </Expandable>
  {:else}
    <div>
      {@render children?.()}
    </div>
  {/if}
</section>
