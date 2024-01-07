import React, { DetailedHTMLProps } from "react";
import PopoverNavBar from "./popover";
import Menus from "./menus";
import Logo from "./logo";
import { cn } from "@/lib/utils";

interface NavBarProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function NavBar(props: NavBarProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "w-full sticky h-auto top-0 left-0 container bg-card dark:bg-zinc-950 rounded-b-xl",
        className
      )}
      {...rest}
    >
      <nav className="md:max-w-full mx-auto w-full py-4 flex align-center justify-between flex-wrap">
        <Logo />

        <Menus />

        <div className="md:flex hidden items-center self-center">
          <PopoverNavBar />
        </div>
      </nav>
    </div>
  );
}
