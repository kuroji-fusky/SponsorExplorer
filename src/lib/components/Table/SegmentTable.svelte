<script lang="ts">
  import BaseTable from "./BaseTable.svelte"

  const colData = [
    { id: "submitted-date", width: 12, label: "Date submitted" },
    { id: "votes", width: 5, label: "Votes" },
    { id: "views", width: 6, label: "Views" },
    { id: "segment", width: 15, label: "Category" },
    { id: "length", width: 15, label: "Length" },
    { id: "username-userid", width: 16, label: "Username/UserID" }
  ]
</script>

<BaseTable {colData}>
  <slot />
</BaseTable>
