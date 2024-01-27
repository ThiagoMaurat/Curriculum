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
import {
  ResetPassword,
  resetPasswordFirstStepSchema,
} from "@/validators/reset-password-first-step";
import { resetPasswordFirstStepAction } from "@/server/action/reset-password-first-step";

export function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordFirstStepSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ResetPassword) {
    startTransition(async () => {
      const { serverError } = await resetPasswordFirstStepAction({
        email: data.email,
      });

      if (serverError) {
        toast({
          title: "Erro",
          description: serverError,
          duration: 4000,
        });
        return;
      }

      toast({
        title: "Sucesso.",
        description:
          "Email com o código enviado com sucesso. Favor digitar o código enviado.",
        duration: 4000,
      });

      router.push(`/reset-password/second-step/?email=${data.email}`);
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
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={isPending} disabled={isPending}>
          Continuar
          <span className="sr-only">
            Continue to reset password verification
          </span>
        </Button>
      </form>
    </Form>
  );
}
