"use client"

import { LuBookmark, LuSearch, LuSettings } from "react-icons/lu"

import { _Link as Link } from "../Link"
import { NavbarOptions } from "./NavbarOptions"
import { useState } from "react"
import { NavbarSearch } from "./NavbarSearch"

export function Navbar() {
  const [searchToggle, setSearchDialogToggle] = useState(false)
  const [optionsToggle, setOptionDialogToggle] = useState(false)

  const toggleOptionDialog = () => setOptionDialogToggle(!optionsToggle)
  const toggleSearchDialog = () => setSearchDialogToggle(!searchToggle)

  return (
    <>
      <div className="z-50 sticky top-0 backdrop-blur-md bg-opacity-75 bg-white">
        <nav className="flex px-6 py-3 gap-x-3.5">
          <div className="flex items-center select-none">
            <Link
              href="/"
              className="no-underline font-extrabold text-xl"
              translate="no"
            >
              SponsorExplorer
            </Link>
          </div>
          {/* Breadcrumbs: Mobile */}
          <div className="flex-1 block lg:hidden"></div>
          {/* Breadcrumbs: Desktop */}
          <div className="flex-1 lg:flex items-center gap-x-3 text-base hidden">
            <div className="inline-flex items-center gap-x-1.5">
              <div className="size-6 rounded-full bg-red-600" />
              <span>base-dir</span>
            </div>
            <span className="h-4 border-l border-l-black rotate-[18deg]" />
            <div>video-route</div>
          </div>
          <div className="flex gap-x-1">
            <button
              className="px-2 py-1 w-60 gap-x-1.5 rounded-md border-2 border-red-200"
              onClick={toggleSearchDialog}
            >
              <div className="hidden lg:flex">
                <LuSearch size={19} />
                <span className="opacity-50 ml-1">Search</span>
              </div>
            </button>
            <button
              className="p-2 rounded-md bg-red-200 hover:bg-red-300 block md:hidden"
              onClick={toggleSearchDialog}
            >
              <LuSearch size={20} />
            </button>
            <button className="p-2 rounded-md bg-red-200 hover:bg-red-300 hidden md:block">
              <LuBookmark size={20} />
            </button>
            <button
              className="p-2 rounded-md bg-red-200 hover:bg-red-300"
              onClick={toggleOptionDialog}
            >
              <LuSettings size={20} />
            </button>
          </div>
        </nav>
      </div>
      {/* Modals */}
      <NavbarOptions open={optionsToggle} onClose={toggleOptionDialog} />
      <NavbarSearch open={searchToggle} onClose={toggleSearchDialog} />
    </>
  )
}
