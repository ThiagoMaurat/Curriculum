"use client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectUnauthorizedProps {
  message?: string;
}

export default function RedirectUnauthorized({
  message,
}: RedirectUnauthorizedProps) {
  const { toast } = useToast();
  const { push } = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user) {
      toast({
        title: "Erro",
        description: message || "Favor logar para acessar esta página",
        duration: 3000,
      });

      push("/signin");
    }
  }, [message, push, session.data?.user, toast]);

  return <></>;
}
