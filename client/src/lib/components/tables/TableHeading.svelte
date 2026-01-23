<script lang="ts">
  import { ChevronsUpDownIcon } from "@lucide/svelte";

  interface Props {
    headings: Record<
      "multi_select" | "actions" | string,
      {
        text: string;
        size?: number;
        isSortable?: boolean;
      }
    >;
  }

  const { headings }: Props = $props();
</script>

<colgroup>
  {#each Object.entries(headings) as [entry, { size }], index}
    <col
      data-colfor={`${entry}-${index}`}
      style={`width: ${size ? `${size * 100}%` : "auto"}`}
    />
  {/each}
</colgroup>
<thead class="kuro-bg sticky top-28">
  <tr>
    {#each Object.entries(headings) as [entry, { text, isSortable }], index}
      {@const dynEl = isSortable ? "button" : "div"}
      <th id={`${entry}-${index}`} class="text-left py-2">
        <svelte:element
          this={dynEl}
          data-sortable-inline-heading=""
          class="whitespace-nowrap px-2 py-1 inline-flex items-center gap-x-1.5"
        >
          {#if entry === "multi_select"}
            <input type="checkbox" />
          {:else}
            <span>{text}</span>
            {#if isSortable}
              <ChevronsUpDownIcon size={15} class="opacity-50" />
            {/if}
          {/if}
        </svelte:element>
      </th>
    {/each}
  </tr>
</thead>
