"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Switch } from "../../ui/switch";
import { LogOut, Moon, Sun } from "lucide-react";

export default function SwitchTheme() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex justify-center gap-3">
      <Switch
        className="self-center"
        checked={resolvedTheme === "dark"}
        onClick={() =>
          resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
        }
      />
      {resolvedTheme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
    </div>
  );
}
