"use client";
import Link from "next/link";
import { useRouter } from "next/compat/router";
import PopoverNavBar from "../popover";
import { useSession } from "next-auth/react";

type MenuLinksProps = {
  isOpen: boolean;
};

export function MenuLinks({ isOpen }: MenuLinksProps) {
  const router = useRouter();

  const { data } = useSession();

  const CheckRouterMatchesLabel = (label: string) => {
    if (router?.asPath.includes(label.toLowerCase())) {
      return true;
    } else if (router?.asPath === "/" && label === "Home") {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } md:block w-auto basis-full md:basis-auto`}
    >
      <div className="flex h-full md:items-center gap-6 justify-between flex-col md:flex-row pt-8 md:pt-0">
        <div className="h-full flex gap-8 items-center flex-col md:flex-row">
          <Link href={"/"} prefetch={false}>
            <p
              className={`${
                CheckRouterMatchesLabel("Home")
                  ? "bottom-1 font-bold border-b-2 text-gray-300"
                  : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
              }`}
            >
              Home
            </p>
          </Link>

          {data?.user.roleName === "user" && (
            <Link prefetch={false} href={"/forms"}>
              <p
                className={`${
                  CheckRouterMatchesLabel("Home")
                    ? "bottom-1 font-bold border-b-2 text-gray-300"
                    : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
                }`}
              >
                Formulário
              </p>
            </Link>
          )}

          {(data?.user?.roleName === "coordinator" ||
            data?.user?.roleName === "supervisor") && (
            <Link prefetch={false} href="/create-user">
              <p
                className={`${
                  CheckRouterMatchesLabel("Home")
                    ? "bottom-1 font-bold border-b-2 text-gray-300"
                    : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
                }`}
              >
                Criar Usuário
              </p>
            </Link>
          )}

          {data?.user && data?.user?.roleName !== "user" && (
            <Link
              prefetch={false}
              href="/user-profile?page=1&limit=10&sort=desc"
            >
              <p
                className={`${
                  CheckRouterMatchesLabel("Home")
                    ? "bottom-1 font-bold border-b-2 text-gray-300"
                    : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
                }`}
              >
                Perfil
              </p>
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center self-center">
          <PopoverNavBar />
        </div>
      </div>
    </div>
  );
}
