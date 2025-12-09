<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    otherMeta?: Record<string, unknown>;
  }

  const props: Props = $props();
</script>

<svelte:head>
  <title>{props.title}</title>
  <meta property="og:title" content={props.title} />
  <meta name="twitter:title" content={props.title} />

  {#if props.description}
    <meta name="description" content={props.description} />
    <meta property="og:description" content={props.description} />
    <meta name="twitter:description" content={props.description} />
  {/if}

  <meta property="og:site_name" content="SponsorExplorer" />

  {#if props.otherMeta}
    {#each Object.entries(props.otherMeta) as [key, val]}
      <meta name={key} content={String(val)} />
    {/each}
  {/if}
</svelte:head>
