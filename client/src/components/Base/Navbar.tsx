"use client"

import { useState } from "react"
import {
  LuBookmark,
  LuMenu,
  LuMonitor,
  LuSearch,
  LuSettings,
} from "react-icons/lu"
import { _Link as Link } from "../Link"
import { NavbarOptionsModal, NavbarSearchModal } from "../Modals"

export function Navbar() {
  const [searchToggle, setSearchDialogToggle] = useState(false)
  const [optionsToggle, setOptionDialogToggle] = useState(false)

  const toggleOptionDialog = () => setOptionDialogToggle(!optionsToggle)
  const toggleSearchDialog = () => setSearchDialogToggle(!searchToggle)

  return (
    <>
      <div className="z-50 sticky top-0 backdrop-blur-md bg-opacity-75 dark:bg-opacity-75 bg-white dark:bg-neutral-950">
        <nav className="flex px-6 py-3 gap-x-3.5">
          {/* Menu navigation */}
          <button className="px-2 py-1">
            <LuMenu size={18} />
          </button>
          {/* Breadcrumbs: Mobile */}
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
          <div className="flex-1 lg:flex items-center gap-x-3 hidden text-sm"></div>
          {/* Right side */}
          <div className="flex gap-x-1">
            <button
              className="lg:px-2 lg:py-1 p-2 lg:w-60 gap-x-1.5 rounded-md lg:block lg:border-2 lg:border-red-200 lg:dark:border-red-900 lg:dark:hover:border-red-700"
              onClick={toggleSearchDialog}
              aria-labelledby="search-label"
            >
              <div className="flex">
                <LuSearch
                  size={20}
                  className="opacity-65 lg:hover:opacity-65 hover:opacity-100"
                />
                <span
                  id="search-label"
                  className="opacity-50  ml-1 lg:block hidden"
                >
                  Search
                </span>
              </div>
            </button>
            <button className="p-2 opacity-65 hover:opacity-100 hidden md:block">
              <LuMonitor size={20} />
            </button>
            <button
              className="p-2 opacity-65 hover:opacity-100"
              onClick={toggleOptionDialog}
            >
              <LuSettings size={20} />
            </button>
          </div>
        </nav>
      </div>
      {/* Modals */}
      <NavbarOptionsModal open={optionsToggle} onClose={toggleOptionDialog} />
      <NavbarSearchModal open={searchToggle} onClose={toggleSearchDialog} />
    </>
  )
}
