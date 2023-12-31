"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import SwitchTheme from "./switch-theme";
import LogoutButton from "./logout-button";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function PopoverNavBar() {
  const { data } = useSession();

  if (data?.user) {
    return (
      <>
        {data?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="self-center">
              <Avatar>
                {data?.user?.image && <AvatarImage src={data?.user?.image} />}
                {!data?.user?.image && (
                  <AvatarFallback>
                    {`${data?.user.name?.substring(
                      0,
                      1
                    )} ${data?.user.name?.substring(1, 2)}`}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-5" align="end">
              <div className="w-full h-full flex flex-col gap-4">
                <p className="font-medium truncate">{data?.user?.name}</p>
                <p className="truncate">{data?.user?.email}</p>

                <div className="border-b" />

                <SwitchTheme />

                <LogoutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </>
    );
  }

  return (
    <>
      {!data?.user && (
        <Link href={"/signin"} prefetch={false} className="self-center">
          <Button className="text-md">Entrar</Button>
        </Link>
      )}
    </>
  );
}
