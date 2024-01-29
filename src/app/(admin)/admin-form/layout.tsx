import React from "react";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div>
      <Header />

      <div className="container pt-2 w-full min-h-[600px] h-auto flex sm:flex-row flex-col">
        <main className="w-full p-4 flex items-center justify-center mx-auto rounded-s-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
