<script lang="ts">
  import type { VideoItemProps as Props } from "./videoItem.type";

  // biome-ignore lint/style/useConst: assigned from the `button` element
  let segmentMore = $state(false);

  const { }: Partial<Props> = $props();
</script>
