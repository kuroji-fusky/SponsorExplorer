<script lang="ts">
  import BaseTable from "./BaseTable.svelte"

  const colData = [
    { id: "submitted-date", width: 9, label: "Date submitted" },
    { id: "video", width: 20, label: "Video" },
    { id: "votes", width: 6, label: "Votes" },
    { id: "views", width: 6, label: "Views" },
    { id: "length", width: 13, label: "Length" },
    { id: "segment", width: 15, label: "Category" },
    { id: "userid", width: 8, label: "UserID" }
  ]
</script>

<BaseTable {colData}>
  <slot />
</BaseTable>
