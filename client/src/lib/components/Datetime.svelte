<script lang="ts">
  import { parsedDate } from "$lib/utils/parsedDate";

  interface Props {
    date: string;
    class?: string;
  }

  const { date, class: className }: Props = $props();
  const { readable } = parsedDate((() => date)());
</script>

<time data-dt-parsed="" datetime={date} class={className}>{readable}</time>
