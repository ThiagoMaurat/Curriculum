import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import SwitchTheme from "./switch-theme";
import LogoutButton from "./logout-button";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth";
import { Button } from "@/components/ui/button";

export default async function PopoverNavBar() {
  const data = await getServerSession(authOptions);

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
            <DropdownMenuContent className="p-2" align="end">
              <div className="w-full h-full flex flex-col gap-4">
                <p className=" font-medium truncate">{data?.user?.name}</p>
                <p className=" truncate">{data?.user?.email}</p>

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
