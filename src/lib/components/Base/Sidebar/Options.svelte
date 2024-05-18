<script>
  import { optionToggle } from "$lib/stores"
  import OptionItem from "./OptionItem.svelte"
  import PortalView from "../../PortalView.svelte"

  const options = [
    {
      title: "Server",
      description:
        "Choose what server to fetch segments from. Defaults to https://sponsor.ajay.app/"
    },
    {
      title: "Play Indicator",
      description: "Highlight a segment if it's passed"
    },
    {
      title: "Downvoted segments",
      description: "Configure how hidden or downvoted segments are displays"
    },
    {
      title: "Length format",
      description: "Choose whether to display lengths in seconds or by timecode"
    },
    {
      title: "Sticky inline player",
      description: "Makes the player stick to the top as you scroll"
    }
  ]
</script>

<PortalView
  heading="Options"
  sidebarState={$optionToggle}
  eventToggler={optionToggle.toggleState}
>
  <div class="flex flex-col gap-y-2 mt-1">
    {#each options as { title, description }}
      <OptionItem {title} {description}>Filler</OptionItem>
    {/each}
  </div>
</PortalView>
