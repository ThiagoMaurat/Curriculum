"use client";
import React, { useState } from "react";
import { MenuToggle } from "./menu-toggle";
import { MenuLinks } from "./menu-link";

export default function Menus() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <MenuToggle toggle={toggle} isOpen={isOpen} />

      <MenuLinks isOpen={isOpen} />
    </React.Fragment>
  );
}
