<script>
  import { EllipsisVerticalIcon } from "@lucide/svelte";
  import TableHeading from "./TableHeading.svelte";
  import ColumnItemFilter from "./ColumnItemFilter.svelte";
  import Button from "../Button.svelte";
  import Spinner from "../Spinner.svelte";
  import SegmentBadge from "../badges/SegmentBadge.svelte";

  let isLoadMoreSegments = $state(false);

  const loadSegments = async () => {
    isLoadMoreSegments = true;

    // mock API call to debug UI
    await new Promise((resolve) => setTimeout(resolve, 5e3));

    isLoadMoreSegments = false;
  };
</script>

<table class="@max-w-5xl:hidden block">
  <TableHeading
    headings={{
      multi_select: { text: "", size: 0.01 },
      date: { text: "Date submitted", size: 0.16, isSortable: true },
      votes: { text: "Votes", size: 0.055, isSortable: true },
      views: { text: "Views", size: 0.055, isSortable: true },
      category: { text: "Category", size: 0.22, isSortable: true },
      length: { text: "Length", size: 0.18, isSortable: true },
      uid: { text: "Username/UUID", size: 0.4, isSortable: true },
      actions: { text: "", size: 0.01 },
    }}
  />
  <tbody>
    {#each [...Array(1)] as _}
      <tr
        data-fragment="0"
        class="group kuro-hoverable border-b dark:border-b-neutral-200/20 border-b-neutral-400/50"
      >
        <td>
          <input class="mx-1.5" type="checkbox" />
        </td>
        <td><time class="px-2 py-2">Date</time></td>
        <td><div class="px-2 py-2">0</div></td>
        <td><div class="px-2 py-2">0</div></td>
        <td id="column-filter-hoverable">
          <ColumnItemFilter>
            <SegmentBadge segment="sponsor" />
          </ColumnItemFilter>
        </td>
        <td><div class="px-2 py-2">token</div></td>
        <td id="column-filter-hoverable">
          <ColumnItemFilter>username</ColumnItemFilter>
        </td>
        <td>
          <button class="p-2">
            <EllipsisVerticalIcon size={17} />
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<!-- Mobile segment table, WIP implementation -->
<table class="@max-w-5xl:block hidden"></table>

<div class="flex justify-center my-9">
  <Button
    class="w-60 inline-flex justify-center items-center"
    variant="secondary"
    onclick={loadSegments}
  >
    {#if isLoadMoreSegments}
      <Spinner size={15} />
    {/if}
    <span>Load more</span>
  </Button>
</div>

<style global>
  #column-filter-hoverable {
    @apply **:data-column-filter-actions:invisible **:group-hover:data-column-filter-actions:visible **:data-column-filter-actions:pointer-events-none **:group-hover:data-column-filter-actions:pointer-events-auto;
  }
</style>
