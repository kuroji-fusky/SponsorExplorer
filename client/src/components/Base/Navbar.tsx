"use client"

import { useState } from "react"
import { LuMenu, LuMonitor, LuSearch, LuSettings } from "react-icons/lu"
import { _Link as Link } from "../Link"
import { NavbarOptionsModal, NavbarSearchModal } from "../Modals"
import { useSidebarContext } from "./SidebarStateProvider"

export function Navbar() {
  const [searchToggle, setSearchDialogToggle] = useState(false)
  const [optionsToggle, setOptionDialogToggle] = useState(false)

  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext()!

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleOptionDialog = () => setOptionDialogToggle(!optionsToggle)
  const toggleSearchDialog = () => setSearchDialogToggle(!searchToggle)

  return (
    <>
      <div className="sticky top-0 z-50 se-bg-w1">
        <nav className="flex px-6 py-3 gap-x-3.5">
          {/* Menu navigation */}
          <button className="px-2 py-1" onClick={toggleSidebar}>
            <LuMenu size={18} />
          </button>
          {/* Logo */}
          <div className="flex items-center select-none">
            <Link
              href="/"
              className="text-xl font-extrabold no-underline"
              translate="no"
            >
              SponsorExplorer
            </Link>
            <span
              className="px-2 py-0.5 rounded-md bg-red-600 ml-1.5 text-neutral-50 text-[0.8rem]"
              translate="no"
            >
              ALPHA
            </span>
          </div>
          <div id="breadcrumb-container" className="contents">
            {/* Breadcrumbs: Mobile */}
            <div
              data-breadcrumb-mobile=""
              className="flex-1 block lg:hidden"
            ></div>
            {/* Breadcrumbs: Desktop */}
            <div
              data-breadcrumb-desktop=""
              className="items-center flex-1 hidden text-sm lg:flex gap-x-3"
            ></div>
          </div>
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
                  className="hidden ml-1 opacity-50 lg:block"
                >
                  Search
                </span>
              </div>
            </button>
            <button className="hidden p-2 opacity-65 hover:opacity-100 md:block">
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
      {/* Sidebar */}
      {/* <Dialog onClose={toggleSidebar} open={isSidebarOpen}>
        <SidebarRoot />
        <DialogBackdrop
          transition
          className="fixed  bg-black/50 inset-0 flex w-screen items-center justify-center p-4 duration-200 ease-out data-[closed]:opacity-0"
          onClick={toggleSidebar}
          aria-hidden
        />
      </Dialog> */}
      {/* Modals */}
      <NavbarOptionsModal open={optionsToggle} onClose={toggleOptionDialog} />
      <NavbarSearchModal open={searchToggle} onClose={toggleSearchDialog} />
    </>
  )
}
