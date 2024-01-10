import React from "react";
import Image from "next/image";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="bg-[#E7E2FF] dark:bg-card">
      <Header />

      <div className=" h-[calc(100vh-72px)] flex flex-col items-center justify-center">
        <div className="container px-4 w-full min-h-[600px] h-auto flex sm:flex-row flex-col my-4">
          <main className="w-full min-h-[600px] p-4 h-auto flex items-center justify-center mx-auto rounded-s-xl bg-card dark:bg-zinc-950">
            {children}
          </main>

          <div className="w-full relative rounded-e-xl overflow-hidden items-center justify-center hidden md:flex">
            <div className="w-full h-full absolute bg-[url('/bg-auth.svg')] bg-cover bg-center" />

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
