<script lang="ts">
  import Col from "./Col.svelte"

  export let data: object[] = [{}]
</script>

<table class="w-full text-base *:[&_tr]:py-2.5 *:[&_tr]:px-3">
  <colgroup>
    <Col id="submitted-date" width={15} />
    <Col id="username-userid" width={20} />
    <Col id="length" width={15} />
    <Col id="segment" width={15} />
    <Col id="votes" width={8} />
    <Col id="views" width={8} />
    <Col id="is-hidden" width={8} />
  </colgroup>
  <thead>
    <tr class="border-b border-slate-500 *:text-left">
      <th id="submitted-date">Submitted Date</th>
      <th id="username-userid">Username/UserID</th>
      <th id="length">Length</th>
      <!-- TODO: Add uuid stuff in this column as copiable -->
      <th id="segment">Segment</th>
      <th id="votes">Votes</th>
      <th id="views">Views</th>
      <th id="is-hidden">Hidden?</th>
    </tr>
  </thead>
  <tbody>
    <slot />
  </tbody>
</table>
