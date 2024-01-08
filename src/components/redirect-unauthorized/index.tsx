"use client";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export default function RedirectUnauthorized() {
  const { toast } = useToast();

  toast({
    title: "Erro",
    description: "Favor logar para acessar esta página",
    duration: 3000,
  });

  return redirect("/signin");
}
