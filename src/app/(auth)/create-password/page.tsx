import { CreatePasswordForm } from "@/components/forms/create-password";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { db } from "@/server/db/drizzle";
import { users } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

interface CreatePasswordProps {
  searchParams: {
    token: string;
    email: string;
  };
}

noStore();
export const revalidate = 0;
export default async function CreatePasswordPage({
  searchParams,
}: CreatePasswordProps) {
  const { email, token } = searchParams;
  if (!token && !email) {
    return redirect("/");
  }

  const [canCreatePassword] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.createPasswordToken, token)));

  if (!canCreatePassword) {
    return redirect("/");
  }

  return (
    <Card className="max-w-[80%] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1">
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
            href="/reset-password"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Clique aqui
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
