import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="h-screen bg-[#E7E2FF] flex items-center justify-center">
      <div className="w-full container max-h-[600px] h-auto flex sm:flex-row flex-col my-4">
        <main className="w-full p-4 flex items-center justify-center mx-auto rounded-s-xl bg-white">
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
  );
}
