<script lang="ts">
  import InfoIcon from "lucide-svelte/icons/info"
  import WarningIcon from "lucide-svelte/icons/triangle-alert"
  import AlertIcon from "lucide-svelte/icons/circle-x"
  import type { IconProps } from "lucide-svelte"

  import { cva, type VariantProps } from "class-variance-authority"

  const noticeEl = cva("flex items-center gap-x-2.5 rounded-md px-3.5 py-2.5", {
    variants: {
      intent: {
        info: "bg-blue-950",
        warn: "bg-yellow-950",
        alert: "bg-red-950"
      }
    },
    compoundVariants: [
      {
        intent: "info"
      }
    ]
  })

  interface $$Props extends VariantProps<typeof noticeEl> {
    heading: string
  }

  type NoticeIntent = NonNullable<$$Props["intent"]>

  const fallbackHeadingLabel = {
    info: "Info",
    alert: "Alert",
    warn: "Warning"
  }

  const iconProps: IconProps = {
    size: 24,
    class: "flex-shrink-0"
  }

  export let intent: $$Props["intent"] = "info"
  export let heading: string = fallbackHeadingLabel[intent as NoticeIntent]
</script>

<div
  class={noticeEl({
    intent
  })}
>
  {#if intent === "info"}
    <InfoIcon {...iconProps} />
  {:else if intent === "warn"}
    <WarningIcon {...iconProps} />
  {:else}
    <AlertIcon {...iconProps} />
  {/if}
  <div>
    <div class="font-bold text-lg pb-0.5">{heading}</div>
    <span>
      <slot />
    </span>
  </div>
</div>
