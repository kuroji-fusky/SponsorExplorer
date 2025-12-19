<script>
  import { EllipsisVerticalIcon } from "@lucide/svelte";
  import TableHeading from "./TableHeading.svelte";
  import ColumnItemFilter from "./ColumnItemFilter.svelte";
</script>

<table>
  <TableHeading
    headings={{
      multi_select: { text: "", size: 0.01 },
      date: { text: "Date submitted", size: 0.16 },
      votes: { text: "Votes", size: 0.055 },
      views: { text: "Views", size: 0.055 },
      category: { text: "Category", size: 0.25 },
      length: { text: "Length", size: 0.16 },
      uid: { text: "Username/UUID", size: 0.9 },
      actions: { text: "", size: 0.01 },
    }}
  />
  <tbody>
    {#each [...Array(4)] as _}
      <tr
        data-fragment="0"
        class="hover:bg-neutral-600/30 border-b border-b-neutral-200/20"
      >
        <td>
          <input type="checkbox" />
        </td>
        <td><time class="px-2 py-1.5">Date</time></td>
        <td><div class="px-2 py-1.5">0</div></td>
        <td><div class="px-2 py-1.5">0</div></td>
        <td>
          <ColumnItemFilter>category</ColumnItemFilter>
        </td>
        <td><div class="px-2 py-1.5">token</div></td>
        <td> <ColumnItemFilter>username</ColumnItemFilter> </td>
        <td>
          <button class="p-1.5">
            <EllipsisVerticalIcon size={17} />
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<table></table>
