<script lang="ts">
  import type { Snippet } from "svelte";
  import { CopyPlusIcon, FunnelIcon } from "@lucide/svelte";

  interface Props {
    children: Snippet;
    filterAction?: () => void;
    copyAction?: () => void;
  }

  const { children, filterAction, copyAction }: Props = $props();
</script>

<div class="px-2 py-1.5 flex">
  <div class="flex-1">
    {@render children()}
  </div>

  <div data-column-filter-actions="" class="shrink-0 inline-flex gap-x-1">
    <button class="p-1">
      <FunnelIcon size={17} />
    </button>
    <button class="p-1">
      <CopyPlusIcon size={17} />
    </button>
  </div>
</div>
