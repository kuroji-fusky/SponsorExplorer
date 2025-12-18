<script>
  import TableHeading from "./TableHeading.svelte";
</script>

<table class="w-full">
  <TableHeading
    headings={{
      multi_select: { text: "", size: 0.01 },
      date: { text: "Date submitted", size: 0.17 },
      votes: { text: "Votes", size: 0.08 },
      views: { text: "Views", size: 0.08 },
      category: { text: "Category", size: 0.25 },
      length: { text: "Length", size: 0.19 },
      uid: { text: "Username/UUID", size: 0.9 },
      actions: { text: "", size: 0.01 },
    }}
  />
</table>
