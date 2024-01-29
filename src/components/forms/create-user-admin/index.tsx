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
import { Input } from "@/components/ui/input";
import { registerUserByAdmin } from "@/server/action/register-user-by-admin";
import { useSession } from "next-auth/react";
import {
  createUserAdminForm,
  CreateUserAdminForm,
} from "@/validators/create-user-admin";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsConst } from "@/const/products";
import { RolesConstSelect } from "@/const/roles";

export function CreateUserAdminForm() {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<CreateUserAdminForm>({
    resolver: zodResolver(createUserAdminForm),
    shouldFocusError: false,
    shouldUnregister: true,
    defaultValues: {
      name: "",
      email: "",
      product: null,
    },
  });

  function onSubmit(data: CreateUserAdminForm) {
    startTransition(async () => {
      if (!session?.user.roleName) {
        return;
      }

      const { serverError } = await registerUserByAdmin({
        email: data.email,
        name: data.name,
        product: data.product,
        userRole: session?.user.roleName,
        role: data.role,
      });

      if (serverError) {
        toast({
          title: "Erro",
          description: serverError || "Erro ao criar conta.",
          duration: 4000,
        });

        return;
      }

      toast({
        title: "Sucesso",
        description: "Conta criada com sucesso.",
        duration: 4000,
      });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Insira um nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name={"role"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Permissão</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  name={field.name}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Insira a permissão associada"
                      onChange={field.onChange}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {RolesConstSelect?.map((roles) => (
                        <SelectItem
                          key={`${field.name}-${roles.value}`}
                          value={String(roles.value)}
                        >
                          {roles.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("role") === "user" && (
          <FormField
            control={form.control}
            name={"product"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    name={field.name}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Insira o tema associado"
                        onChange={field.onChange}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {ProductsConst?.map((products) => (
                          <SelectItem
                            key={`${field.name}-${products}`}
                            value={String(products)}
                          >
                            {products}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isPending} isLoading={isPending}>
          Criar Conta
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
