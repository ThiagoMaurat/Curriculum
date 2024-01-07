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

      <div className="container px-0 w-full min-h-[600px] h-auto flex sm:flex-row flex-col">
        <main className="w-full p-4 flex items-center justify-center mx-auto rounded-s-xl bg-card dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
