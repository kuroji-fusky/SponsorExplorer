<script lang="ts">
  import type { PageData } from "./$types"
  import { SEO } from "$lib/components"
  import { SubmissionTable } from "$lib/components/Table"
  import { SegmentBadge } from "$lib/components/Badges"

  export let data: PageData

  const { userid, sbAjayData, sbbData } = data
</script>

<SEO title={`Submissions from User ID: ${userid}`} />

<SubmissionTable>
  {#each sbbData.segments as fam}
    <tr>
      <td>{fam.date}</td>
      <td>
        <div class="flex">
          <img
            src={`https://i.ytimg.com/vi/${fam.id}/hqdefault.jpg`}
            class="aspect-video w-32 object-cover"
            alt=""
          />
          <a href={`/video/${fam.id}`}>{fam.id}</a>
        </div>
      </td>
      <td>{fam.votes}</td>
      <td>{fam.views}</td>
      <td>
        <span>{fam.action}</span>
        <span>{fam["length"]}</span>
      </td>
      <td>
        <SegmentBadge segment={fam.category} />
      </td>
      <td>N/A</td>
    </tr>
  {/each}
</SubmissionTable>
