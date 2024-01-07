import { DoorClosed, Menu } from "lucide-react";

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <div className="block md:hidden items-center self-center" onClick={toggle}>
      {isOpen ? (
        <DoorClosed fontSize={"1.5rem"} cursor={"pointer"} color={"#333456"} />
      ) : (
        <Menu color={"#333456"} fontSize={"1.5rem"} cursor={"pointer"} />
      )}
    </div>
  );
};
