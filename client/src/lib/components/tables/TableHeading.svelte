<script lang="ts">
  interface Props {
    headings: Record<string, { text: string; size?: number }>;
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
<thead>
  <tr>
    {#each Object.entries(headings) as [entry, { text }], index}
      <th id={`${entry}-${index}`} class="text-left">
        <div class="whitespace-nowrap px-2 py-1">
          {text}
        </div>
      </th>
    {/each}
  </tr>
</thead>
