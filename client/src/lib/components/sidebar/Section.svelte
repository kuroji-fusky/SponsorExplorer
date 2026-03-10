<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../Button.svelte";
  import { ChevronRightIcon } from "@lucide/svelte";
  import Expandable from "../Expandable.svelte";
  import type { WithChildrenSnippet } from "../shared_types";

  interface Props {
    isOpen?: boolean;
    name: string;
    isExpandable?: boolean;
    action?: Snippet;
  }

  const {
    isOpen,
    isExpandable = true,
    name,
    children,
    action,
  }: WithChildrenSnippet<Props> = $props();

  let open = $state(isOpen ?? false);
  const toggleState = () => (open = !open);
</script>

<section data-group-collapsible="" class="rounded-md bg-neutral-900">
  <div class="flex items-center sticky -top-0.5 bg-neutral-900 z-50 inset-x-0">
    {#if isExpandable}
      <Button
        variant="tritery"
        size="skinny"
        class="px-0"
        onclick={toggleState}
      >
        <span class="font-semibold text-base leading-none mx-1 py-1">
          {name}
        </span>
        {#snippet suffix()}
          <ChevronRightIcon
            size={17}
            class={["transition-transform", open ? "rotate-90" : ""]}
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
    <Expandable {open}>
      {@render children?.()}
    </Expandable>
  {:else}
    <div>
      {@render children?.()}
    </div>
  {/if}
</section>
