<script lang="ts">
  interface Crumb<Kind extends string> {
    kind: Kind | "default";
    href: string;
    text: string;
  }

  interface Props {
    crumb1: Crumb<"channel">;
    crumb2?: Crumb<"channel" | "video">;
  }

  const { crumb1, crumb2 }: Props = $props();
</script>

<ol data-breadcrumbs="">
  <li>
    <a href={crumb1.href}>
      <span>
        {crumb1.text}
      </span>
    </a>
  </li>
  {#if crumb2}
    <li>
      <a href={crumb2.href}>
        {crumb2.text}
      </a>
    </li>
  {/if}
</ol>
