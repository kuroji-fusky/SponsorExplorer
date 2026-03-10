<script lang="ts">
  import { CopyPlusIcon, FunnelIcon } from "@lucide/svelte";
  import type { WithChildrenSnippet } from "../shared_types";

  interface Props {
    filterAction?: () => void;
    copyAction?: () => void;
  }

  const { children, filterAction, copyAction }: WithChildrenSnippet<Props> = $props();
</script>

<div class="px-2 py-1.5 flex">
  <div class="flex-1">
    {@render children?.()}
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
