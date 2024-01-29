import { CreatePasswordForm } from "@/components/forms/create-password";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DrizzleUsersRepository } from "@/server/repositories/drizzle/user-drizzle-repository";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

interface CreatePasswordProps {
  searchParams: {
    token: string;
    email: string;
  };
}

export default async function CreatePasswordPage({
  searchParams,
}: CreatePasswordProps) {
  if (!searchParams.token && !searchParams.email) {
    return redirect("/");
  }

  noStore();
  const drizzleRepository = new DrizzleUsersRepository();
  const canCreatePassword =
    await drizzleRepository.checkIfUserCanCreatePassword(
      searchParams.email,
      searchParams.token
    );

  if (!canCreatePassword) {
    return redirect("/");
  }

  return (
    <Card className="max-w-[80%] w-full mx-auto md:mx-0">
      <CardHeader className="p-4 space-y-1 ">
        <CardTitle className="text-2xl">Criar Senha</CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <CreatePasswordForm />
      </CardContent>

      <CardFooter className="flex flex-wrap pb-4 px-4 items-center space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Deseja resetar senha?{" "}
          <Link
            aria-label="Sign up"
            href="/signup"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Clique aqui
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
