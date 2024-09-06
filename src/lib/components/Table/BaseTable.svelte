<script lang="ts">
  interface ColumnData {
    id: string
    width: number
    label: string
  }

  export let colData: ColumnData[]
</script>

<table class="w-full text-base *:[&_tr]:py-2.5 *:[&_tr]:px-3">
  <colgroup>
    {#each colData as { id, width }}
      <col {id} style={`width:${width}%;`} />
    {/each}
  </colgroup>
  <thead>
    <tr class="border-b border-slate-500 *:text-left">
      {#each colData as { id, label }}
        <th {id}>{label}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="hover:[&_tr]:bg-neutral-800 hover:[&_tr]:bg-opacity-70">
    <slot />
  </tbody>
</table>
