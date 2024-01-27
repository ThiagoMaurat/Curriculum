"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VerifyEmail, verifyEmailSchema } from "@/validators/verify-email";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmailCodeAction } from "@/server/action/verify-email";

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<VerifyEmail>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
      email: email || "",
    },
  });

  const { toast } = useToast();

  function onSubmit(data: VerifyEmail) {
    startTransition(async () => {
      try {
        await validateEmailCodeAction({
          ...data,
        });

        toast({
          title: "Sucesso",
          description: "Email verificado com sucesso. Favor logar.",
          duration: 4000,
        });

        router.push("/signin");
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error?.message || "Erro ao verificar o email.",
          duration: 4000,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        {...form}
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Insira o endereço de email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o código de verificação"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} isLoading={isPending}>
          Validar Conta
        </Button>
      </form>
    </Form>
  );
}
