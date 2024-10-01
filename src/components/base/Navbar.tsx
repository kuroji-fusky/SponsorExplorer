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
      <nav className="flex justify-between px-6 py-3">
        <div className="flex items-center gap-x-3">
          <Link
            href="/"
            className="no-underline font-extrabold text-xl"
            translate="no"
          >
            SponsorExplorer
          </Link>
          <button
            className="hidden md:flex px-2 py-1 w-60 gap-x-1.5 rounded-md border-2 border-red-200 items-center"
            onClick={toggleSearchDialog}
          >
            <LuSearch size={19} />
            <span className="opacity-50">Search</span>
          </button>
        </div>
        <div className="flex gap-x-1">
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
      <NavbarOptions open={optionsToggle} onClose={toggleOptionDialog} />
      <NavbarSearch open={searchToggle} onClose={toggleSearchDialog} />
    </>
  )
}
