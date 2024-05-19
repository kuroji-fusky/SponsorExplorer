<script>
  import { optionToggle } from "$lib/stores"
  import OptionItem from "./OptionItem.svelte"
  import PortalView from "../../PortalView.svelte"
  import Toggle from "$lib/components/Toggle.svelte"

  const options = [
    {
      title: "Server",
      description:
        "Choose what server to fetch segments from. Defaults to https://sponsor.ajay.app/",
      slot: Toggle
    },
    {
      title: "Play Indicator",
      description: "Highlight a segment while a video is playing",
      slot: Toggle
    },
    {
      title: "Downvoted segments",
      description: "Configure how hidden or downvoted segments are displays",
      slot: Toggle
    },
    {
      title: "Length format",
      description:
        "Choose whether to display lengths in seconds or by timecode",
      slot: Toggle
    },
    {
      title: "Sticky inline player",
      description: "Makes the player stick to the top as you scroll",
      slot: Toggle
    }
  ]
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
