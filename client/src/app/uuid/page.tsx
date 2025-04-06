import { IconWrapper, Notice } from "@/components"
import { ButtonMerge } from "@/components/Buttons"
import { Button } from "@/components/Buttons/Button"
import { UUIDFilterShelf } from "@/components/Shelf"
import type { DefineRouteParams } from "@/types"
import { padIterations } from "@/utils"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { LuChevronDown } from "react-icons/lu"

const SubmissionItem = dynamic(() =>
  import("@/components").then((m) => m.SubmissionItem),
)

type UUIDRoutes = DefineRouteParams<
  null,
  {
    items: string[]
  }
>

export const metadata: Metadata = {
  title: "UUID Inspector",
}

export default async function UUIDPage(props: UUIDRoutes) {
  return (
    <div className="max-w-screen-xl px-3 mx-auto space-y-3">
      <h2 className="my-8 text-3xl">UUID Inspector</h2>
      <noscript>
        <Notice heading="JavaScript required" intent="warn">
          Fetching segments require client-side JavaScript in order to function
          properly. Upgrade to a modern browser or whitelist/enable scripting
          from your content blocker/ad blocker.
        </Notice>
      </noscript>
      <UUIDFilterShelf />
      <section className="flex flex-col gap-y-1.5">
        {padIterations(6).map((_, i) => (
          <SubmissionItem key={i} uuid="segment id goes here" />
        ))}
      </section>
      <section className="sticky bottom-0 z-10 py-5 se-bg-w1">
        <span className="inline-block mb-2 opacity-75">
          Enter one or more valid UUIDs
        </span>
        <div className="flex gap-x-1.5">
          <input
            type="text"
            className="flex-1 px-2 py-1 transition-opacity bg-transparent border rounded-md border-neutral-600"
          />
          <ButtonMerge>
            <Button size="smol">Add</Button>
            <Button iconOnly size="smol">
              <IconWrapper icon={LuChevronDown} />
            </Button>
          </ButtonMerge>
        </div>
      </section>
    </div>
  )
}
