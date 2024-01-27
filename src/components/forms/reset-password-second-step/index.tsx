"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";
import {
  ResetPasswordSecondStepType,
  resetPasswordSecondStepSchema,
} from "@/validators/reset-password-second-step";
import { resetPasswordSecondStepAction } from "@/server/action/reset-password-second-step";

interface ResetPasswordFormSecondStepProps {
  emailSearchParams?: string;
}

export function ResetPasswordFormSecondStep(
  props: ResetPasswordFormSecondStepProps
) {
  const { emailSearchParams } = props;
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<ResetPasswordSecondStepType>({
    resolver: zodResolver(resetPasswordSecondStepSchema),
    defaultValues: {
      email: "",
      code: "",
      confirmPassword: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (emailSearchParams) {
      form.setValue("email", emailSearchParams);
    }
  }, [emailSearchParams, form]);

  function onSubmit(data: ResetPasswordSecondStepType) {
    startTransition(async () => {
      const { serverError } = await resetPasswordSecondStepAction(data);

      if (serverError) {
        toast({
          title: "Erro",
          description: serverError || "Erro ao resetar senha.",
          duration: 4000,
        });

        return;
      }

      toast({
        title: "Sucesso.",
        description: "Senha modificado com sucesso.",
        duration: 4000,
      });

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Insira seu e-mail"
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
                <Input placeholder="Insira seu código" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
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
              <FormLabel>Confirme sua senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} isLoading={isPending} type="submit">
          Containuar
          <span className="sr-only">
            Continue to reset password verification
          </span>
        </Button>
      </form>
    </Form>
  );
}
