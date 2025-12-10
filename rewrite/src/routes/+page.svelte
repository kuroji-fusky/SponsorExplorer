<script>
  import InputFilter from "$lib/components/InputFilter.svelte";
  import Meta from "$lib/components/Meta.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
</script>

<Meta title="Simple rite" />

<header>
  <h1>SponsorExplorer</h1>
  <InputFilter />

  <Pagination basePath="/" />
</header>
