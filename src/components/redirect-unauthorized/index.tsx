"use client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectUnauthorized() {
  const { toast } = useToast();
  const { push } = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user) {
      toast({
        title: "Erro",
        description: "Favor logar para acessar esta página",
        duration: 3000,
      });

      push("/signin");
    }
  }, [push, session.data?.user, toast]);

  return <></>;
}
