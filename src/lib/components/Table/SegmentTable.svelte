<script lang="ts">
  import Col from "./Col.svelte"
  import type { SBColDataConstants } from "$lib/types"

  export let colOrder: SBColDataConstants[] = [
    "submitted-date",
    "votes",
    "views",
    "segment",
    "length",
    "username-userid"
  ]

  const colData = [
    { id: "submitted-date", width: 15, label: "Submitted Date" },
    { id: "votes", width: 7, label: "Votes" },
    { id: "views", width: 7, label: "Views" },
    { id: "length", width: 18, label: "Length" },
    { id: "segment", width: 18, label: "Category" },
    { id: "username-userid", width: 7, label: "Username/UserID" }
  ]
</script>

<table class="w-full text-base *:[&_tr]:py-2.5 *:[&_tr]:px-3">
  <colgroup>
    <Col id="submitted-date" width={15} />
    <Col id="votes" width={7} />
    <Col id="views" width={7} />
    <Col id="length" width={18} />
    <Col id="segment" width={18} />
    <Col id="username-userid" width={15} />
  </colgroup>
  <thead>
    <tr class="border-b border-slate-500 *:text-left">
      <th id="submitted-date">Submitted Date</th>
      <th id="votes">Votes</th>
      <th id="views">Views</th>
      <th id="segment">Category</th>
      <th id="length">Length</th>
      <!-- TODO: Add uuid stuff in this column as copiable -->
      <th id="username-userid">Username/UserID</th>
    </tr>
  </thead>
  <tbody class="hover:[&_tr]:bg-gray-100">
    <slot />
  </tbody>
</table>
