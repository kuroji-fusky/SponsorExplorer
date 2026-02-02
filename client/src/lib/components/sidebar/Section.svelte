<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../Button.svelte";
  import { ChevronRightIcon } from "@lucide/svelte";
  import Expandable from "../Expandable.svelte";

  interface Props {
    isOpen?: boolean;
    name: string;
    children?: Snippet;
    action?: Snippet;
  }

  const { isOpen, name, children, action }: Props = $props();

  let isItCumming = $state(isOpen ?? false);
  const toggleState = () => (isItCumming = !isItCumming);
</script>

<section data-group-collapsible="">
  <div class="flex items-center">
    <Button icon class="border-none p-1" onclick={toggleState}>
      <span class="font-semibold text-base leading-none mx-1">
        {name}
      </span>
      {#snippet suffix()}
        <ChevronRightIcon size={17} />
      {/snippet}
    </Button>
    <span class="flex-1"></span>
    {#if action}
      <div id="actions" class="flex gap-x-0.5">
        {@render action()}
      </div>
    {/if}
  </div>
  <Expandable open={isItCumming}>
    {@render children?.()}
  </Expandable>
</section>
