interface OptionItemSchema<Control extends string, Props extends Record<string, unknown>> {
  readonly component: Control
  title: string
  description: string
  settingId: string
  props: Props
}

interface OptionSection {
  heading?: string
  items: (
    | OptionItemSchema<"button", { text: string; isDisabled?: boolean }>
    | OptionItemSchema<"switch", { defaultItem: boolean }>
    | OptionItemSchema<"combobox", { items: string[]; defaultItem: string }>
  )[]
}

const optionsList: OptionSection[] = [
  {
    heading: "Appearance",
    items: [
      {
        component: "combobox",
        settingId: "pref.theme",
        title: "Display theme",
        description: "Default is set to 'System'.",
        props: {
          items: ["system", "dark", "light"],
          defaultItem: "system",
        },
      },
      {
        component: "switch",
        settingId: "pref.expand",
        title: "Expand details",
        description: "Expand contents relative to the screen",
        props: {
          defaultItem: false
        },
      },
    ],
  },

  {
    heading: "Player",
    items: [
      {
        component: "switch",
        settingId: "pref.disableIframeLoad",
        title: "Disable `<iframe>` loading",
        description:
          "Determines whether to load the `<iframe>` player from loading. Otherwise, a video's thumbnail is only shown.",
        props: {
          defaultItem: true,
        },
      },
      {
        component: "switch",
        settingId: "pref.exposeYtControls",
        title: "Expose keyboard shortcuts",
        description:
          "Enable keyboard shortcuts as you would in regular YouTube, even if not focused by the player.",
        props: {
          defaultItem: true,
        },
      },
    ],
  },

  // Behavior
  {
    heading: "Behavior",
    items: [
      {
        component: "switch",
        settingId: "pref.keepHistory",
        title: "Retain recent history",
        description: "Whether to keep or prevent from visit history from channels and SB users.",
        props: {
          defaultItem: true,
        },
      },
      {
        component: "switch",
        settingId: "pref.sidebarSpace",
        title: "Keep sidebar hidden",
        description:
          "Expands more space by keeping the sidebar open on top of the screen instead of sliding from the main content.",
        props: {
          defaultItem: false,
        },
      },
    ],
  },

  // Danger Zone
  {
    heading: "Danger zone",
    items: [
      {
        component: "button",
        title: "Clear cache",
        settingId: "clearCache",
        description: "Clears stored segment cache from this browser",
        props: {
          text: "Clear cache",
        },
      },
      {
        component: "button",
        title: "Reset to defaults",
        settingId: "resetDefaults",
        description: "Clears cache, watchlist, and settings in this browser.",
        props: {
          text: "Reset ALL",
        },
      },
    ],
  },
]

export default optionsList
