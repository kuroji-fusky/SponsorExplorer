<script lang="ts" module>
  import { Link as a } from "$lib/components";
  export { a };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  const { children }: Props = $props();
</script>

{@render children?.()}
