<script>
  import { optionToggle } from "$lib/stores"
  import OptionItem from "./OptionItem.svelte"
  import PortalView from "../../PortalView.svelte"
  import options from "./OptionList"
</script>

<PortalView
  heading="Options"
  sidebarState={$optionToggle}
  eventToggler={optionToggle.toggleState}
>
  <div class="flex flex-col gap-y-2 mt-1">
    {#each options as { title, description, slot }}
      <OptionItem {title} {description}>
        <svelte:component this={slot} />
      </OptionItem>
    {/each}
  </div>
</PortalView>
