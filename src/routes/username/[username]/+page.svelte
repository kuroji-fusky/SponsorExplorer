<script lang="ts">
  import type { PageData } from "./$types"
  import { SEO } from "$lib/components"

  export let data: PageData
</script>

<SEO title={`Submissions from ${data.username}`} />
