"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
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
import { SignIn, signInSchema } from "@/validators/signin";
import { useTransition } from "react";

export const SignInForm = ({}) => {
  const { toast } = useToast();
  const { push, prefetch } = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: SignIn) => {
    startTransition(async () => {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        if (response?.error.includes("Email não verificado")) {
          const email = response.error.split("Email não verificado ")[1];
          push(`/signup/verify-email/?email=${email}`);

          return;
        }

        toast({
          title: "Erro",
          description: response?.error || "Credenciais inválidas",
          duration: 3000,
        });

        return;
      }

      prefetch("/");
      return push("/");
    });
  };

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Insira a senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          isLoading={isPending}
          variant={"default"}
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
};
