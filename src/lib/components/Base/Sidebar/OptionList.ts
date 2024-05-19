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
    title: "Periodically fetch new segments",
    description:
      "Update new segments per if enabled. Only applicable if server is set to https://sponsor.ajay.app/.",
    slot: Toggle
  },
  {
    title: "Downvoted segments",
    description: "Configure how hidden or downvoted segments are displays",
    slot: Toggle
  },
  {
    title: "Length format",
    description: "Choose whether to display lengths in seconds or by timecode",
    slot: Toggle
  },
  {
    title: "Sticky inline player",
    description: "Makes the player stick to the top as you scroll",
    slot: Toggle
  }
]

export default options
