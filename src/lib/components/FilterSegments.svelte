<script>
  import { ChevronDownIcon, HelpCircleIcon, RadioIcon } from "lucide-svelte"
  import Button from "./Button.svelte"

  import { isLiveFetchSegments } from "$lib/stores"
  import { cn } from "$lib/utils"
</script>

<div class="flex gap-x-2 mb-3">
  <span class="opacity-75 my-auto">Filter segments</span>
  <input
    type="text"
    name="Filter segments"
    placeholder="Filter username/userIDs, segments, etc..."
    id="filter-segments"
    class="py-1 px-3 rounded-md bg-neutral-900 border border-neutral-500 flex-1"
  />
  <Button iconOnly>
    <HelpCircleIcon size={18} />
  </Button>
  <div
    class={cn(
      "flex",
      $isLiveFetchSegments
        ? "[&_button]:bg-red-600 hover:[&_button]:bg-red-700"
        : ""
    )}
  >
    <Button
      clickEvent={isLiveFetchSegments.toggleState}
      class={cn(
        "flex gap-x-1.5 items-center rounded-tr-none rounded-br-none border-r border-r-neutral-500"
      )}
    >
      <RadioIcon
        size={18}
        class={cn(
          $isLiveFetchSegments && "animate-spin [animation-duration:3.5s]"
        )}
      />
      <span>Live changes</span>
    </Button>
    <Button class="rounded-tl-none rounded-bl-none" iconOnly>
      <ChevronDownIcon size={18} />
    </Button>
  </div>
</div>
