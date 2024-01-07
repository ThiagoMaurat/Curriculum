"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex justify-center gap-2 cursor-pointer"
    >
      <span>Sair</span>
      <LogOut size={24} cursor={"pointer"} />
    </div>
  );
}
