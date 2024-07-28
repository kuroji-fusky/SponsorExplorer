<script lang="ts">
  import Col from "./Col.svelte"

  const colData = [
    { id: "submitted-date", width: 12, label: "Date submitted" },
    { id: "votes", width: 5, label: "Votes" },
    { id: "views", width: 6, label: "Views" },
    { id: "segment", width: 15, label: "Category" },
    { id: "length", width: 15, label: "Length" },
    { id: "username-userid", width: 16, label: "Username/UserID" }
  ]
</script>

<table class="w-full text-base *:[&_tr]:py-2.5 *:[&_tr]:px-3">
  <colgroup>
    {#each colData as { id, width }}
      <Col {id} {width} />
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
