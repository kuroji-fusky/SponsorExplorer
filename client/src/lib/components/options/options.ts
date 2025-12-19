type OptionItem<C extends string, P extends Record<string, unknown>> = {
  title: string
  description: string
  settingId: string
  component: C
  props: P
}

type OptionsList = Array<
  | { heading?: string }
  | OptionItem<"button", { text: string; isDisabled?: boolean }>
  | OptionItem<"switchy", { defaultItem: boolean }>
  | OptionItem<"combobox", { items: string[]; defaultItem: string }>
>

const optionsList = [
  {
    heading: "Appearance",
  },
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
    heading: "Player",
  },
  {
    component: "switchy",
    settingId: "pref.disableIframeLoad",
    title: "Disable `<iframe>` loading",
    description:
      "Determines whether to load the `<iframe>` player from loading. Otherwise, a video's thumbnail is only shown.",
    props: {
      defaultItem: true,
    },
  },
  {
    component: "switchy",
    settingId: "pref.exposeYtControls",
    title: "Expose keyboard shortcuts",
    description:
      "Enable keyboard shortcuts as you would in regular YouTube, even if not focused by the player.",
    props: {
      defaultItem: true,
    },
  },

  // Behavior
  {
    heading: "Behavior",
  },
  {
    component: "switchy",
    settingId: "pref.keepHistory",
    title: "Retain recent history",
    description: "Whether to keep or prevent from visit history from channels and SB users.",
    props: {
      defaultItem: true,
    },
  },
  {
    component: "switchy",
    settingId: "pref.sidebarSpace",
    title: "Keep sidebar hidden",
    description:
      "Expands more space by keeping the sidebar open on top of the screen instead of sliding from the main content.",
    props: {
      defaultItem: false,
    },
  },

  // Danger Zone
  {
    heading: "Danger zone",
  },
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
] satisfies OptionsList

export default optionsList
