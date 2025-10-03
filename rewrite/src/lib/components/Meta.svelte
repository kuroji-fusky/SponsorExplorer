<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    otherMeta?: Record<string, unknown>;
  }

  const { title, description, otherMeta }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta name="twitter:title" content={title} />

  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
  {/if}

  <!-- {#if otherMeta}
		{#each otherMeta as [key, val]}
			<meta name={key} content={val} />
		{/each}
	{/if} -->
</svelte:head>
