<script>
  import { EllipsisVerticalIcon } from "@lucide/svelte";
  import TableHeading from "./TableHeading.svelte";
  import ColumnItemFilter from "./ColumnItemFilter.svelte";
  import Button from "../Button.svelte";
  import Spinner from "../Spinner.svelte";
</script>

<table>
  <TableHeading
    headings={{
      multi_select: { text: "", size: 0.01 },
      date: { text: "Date submitted", size: 0.16, isSortable: true },
      votes: { text: "Votes", size: 0.055, isSortable: true },
      views: { text: "Views", size: 0.055, isSortable: true },
      category: { text: "Category", size: 0.22, isSortable: true },
      length: { text: "Length", size: 0.18, isSortable: true },
      uid: { text: "Username/UUID", size: 0.9, isSortable: true },
      actions: { text: "", size: 0.01 },
    }}
  />
  <tbody>
    {#each [...Array(36)] as _}
      <tr
        data-fragment="0"
        class="group kuro-hoverable border-b dark:border-b-neutral-200/20 border-b-neutral-400/50"
      >
        <td>
          <input class="mx-1.5" type="checkbox" />
        </td>
        <td><time class="px-2 py-1.5">Date</time></td>
        <td><div class="px-2 py-1.5">0</div></td>
        <td><div class="px-2 py-1.5">0</div></td>
        <td id="column-filter-hoverable">
          <ColumnItemFilter>category</ColumnItemFilter>
        </td>
        <td><div class="px-2 py-1.5">token</div></td>
        <td id="column-filter-hoverable">
          <ColumnItemFilter>username</ColumnItemFilter>
        </td>
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

<div class="flex justify-center my-9">
  <Button class="w-60 *:inline-block">
    <Spinner size={17} />
    <span>Load moar</span>
  </Button>
</div>

<style>
  #column-filter-hoverable {
    @apply **:data-column-filter-actions:invisible **:group-hover:data-column-filter-actions:visible **:data-column-filter-actions:pointer-events-none **:group-hover:data-column-filter-actions:pointer-events-auto;
  }
</style>
