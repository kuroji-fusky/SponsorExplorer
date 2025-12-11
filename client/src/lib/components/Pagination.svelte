<script lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";

  interface Props {
    current?: number;
    total?: number;

    basePath: string;
  }

  const { current: pgCurrent = 1, total: pgTotal = 1 }: Props = $props();
</script>

<div id="pagination-container" class="inline-flex items-center *:p-2">
  <a href={"IBOL"} aria-label="Go back to previous page">
    <ChevronLeftIcon />
  </a>
  {#each [...Array(4)] as _}
    <a href="IBOL" aria-label={`Go to page ${_}`}> 79 </a>
  {/each}
  <a href={"IBOL"} aria-label="Go to next page">
    <ChevronRightIcon />
  </a>
</div>
