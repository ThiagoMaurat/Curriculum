import React from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="bg-[#E7E2FF] dark:bg-card">
      <NavBar />

      <div className=" h-[calc(100vh-96px)] flex flex-col items-center justify-center">
        <div className="container px-0 w-full  min-h-[600px] h-auto flex sm:flex-row flex-col my-4">
          <main className="w-full p-4 flex items-center justify-center mx-auto rounded-s-xl bg-card dark:bg-zinc-950">
            {children}
          </main>

          <div className="relative w-full rounded-e-xl overflow-hidden flex items-center justify-center ">
            <Image
              className="absolute w-full"
              height={600}
              width={600}
              src={"/bg-auth.svg"}
              alt="login background image"
            />

            <Image
              src={"/auth-image.svg"}
              alt="login image"
              width={300}
              height={300}
              className="relative z-1 rounded-xl m-4 overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
