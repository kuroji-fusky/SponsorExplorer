"use client"

import { CloseButton, DialogPanel } from "@headlessui/react"
import Link from "next/link"
import { LuMenu } from "react-icons/lu"

export function SidebarContainer() {
  return (
    <div className="fixed inset-0 z-50">
      <DialogPanel
        transition
        className="transition-transform duration-200 ease-out h-full w-[300px] dark:bg-neutral-950 data-[closed]:-translate-x-full"
      >
        <nav className="flex px-6 py-3 gap-x-3.5">
          <CloseButton className="px-2 py-1">
            <LuMenu size={18} />
          </CloseButton>
          <div className="select-none">
            <Link
              href="/"
              className="text-xl font-extrabold no-underline"
              translate="no"
            >
              SponsorExplorer
            </Link>
          </div>
        </nav>
      </DialogPanel>
    </div>
  )
}
