import Toggle from "$lib/components/Toggle.svelte"

const options = [
  {
    title: "Server",
    description:
      "Choose what server to fetch segments from. Defaults to https://sponsor.ajay.app/"
  },
  {
    title: "Play Indicator",
    description: "Highlight a segment while the video is currently playing",
    choiceItems: [
      "Highlight all segments",
      "Only on non-hidden segments",
      "Off"
    ]
  },
  {
    title: "Group segments",
    description:
      "Separate between full video labels and skip/mute segments by grouping them respectively",
    slot: Toggle
  },
  {
    title: "Hidden segments",
    description: "Configure how hidden or downvoted segments are displayed",
    choiceItems: [
      "Show all",
      "Hide hidden segments",
      "Hide hidden and downvoted segments"
    ]
  },
  {
    title: "Length format",
    description: "Choose whether to display lengths in seconds or by timecode",
    choiceItems: ["Numeric (123.45)", "Timecode (1:23.45)"]
  },
  {
    title: "Sticky inline player",
    description: "Makes the player stick to the top as you scroll",
    slot: Toggle
  }
]

export default options
