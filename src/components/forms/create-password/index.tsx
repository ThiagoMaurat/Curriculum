"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormMessage,
  Form,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  CreatePassword,
  createPasswordSchema,
} from "@/validators/create-password";
import { PasswordInput } from "@/components/ui/password-input";
import { registerPasswordAction } from "@/server/action/create-password";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export function CreatePasswordForm() {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<CreatePassword>({
    resolver: zodResolver(createPasswordSchema),
    shouldFocusError: false,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: CreatePassword) {
    startTransition(async () => {
      if (!email) return;

      const { serverError } = await registerPasswordAction({
        password: data.password,
        confirmPassword: data.confirmPassword,
        email,
      });

      if (serverError) {
        toast({
          title: "Erro",
          description: serverError || "Erro ao criar senha.",
          duration: 4000,
        });

        return;
      }

      toast({
        title: "Sucesso",
        description: "Senha criada com sucesso.",
        duration: 4000,
      });

      form.reset();
      router.refresh();
      router.push("/signin");
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} isLoading={isPending}>
          Criar Conta
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
