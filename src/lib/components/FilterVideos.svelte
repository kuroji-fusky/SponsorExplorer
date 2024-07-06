<script>
  import PanelRightOpenIcon from "lucide-svelte/icons/panel-right-open"

  import Button from "./Button.svelte"
</script>

<div class="flex gap-x-2 mb-3">
  <input
    type="text"
    name="Filter segments"
    placeholder="Filter videos"
    id="filter-segments"
    class="py-1 px-3 rounded-md bg-neutral-900 border border-neutral-500 flex-1"
  />
  <Button iconOnly>
    <PanelRightOpenIcon size={18} />
  </Button>
</div>
