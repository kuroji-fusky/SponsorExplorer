"use client"

import type { NavbarDialogTypes } from "./Navbar.types"
import { Modal } from "../Modal"

interface NavbarOptionsProps extends NavbarDialogTypes {}

export function NavbarOptions(props: NavbarOptionsProps) {
  return (
    <Modal open={props.open} onClose={props.onClose} title="Options">
      <div>
        <strong>Server</strong>
      </div>
    </Modal>
  )
}
