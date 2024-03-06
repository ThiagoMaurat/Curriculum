import React from "react";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="bg-card">
      <Header />

      <main className="w-full container min-h-[600px] p-4 h-auto flex items-center justify-center mx-auto rounded-s-xl bg-card dark:bg-card">
        {children}
      </main>
    </div>
  );
}
