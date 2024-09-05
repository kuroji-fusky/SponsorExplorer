<script lang="ts">
  import type { PageData } from "./$types"
  import { SEO } from "$lib/components"

  export let data: PageData
</script>

<SEO title={`Submissions from User ID: ${data.userid}`} />
<div>{JSON.stringify(data)}</div>
