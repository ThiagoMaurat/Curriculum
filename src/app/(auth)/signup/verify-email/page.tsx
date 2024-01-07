import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/../env.mjs";
import Link from "next/link";
import { VerifyEmailForm } from "@/components/forms/verify-email-form";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXTAUTH_URL),
  title: "Verificação de e-mail",
  description: "Verifique seu e-mail para ter acesso à plataforma",
};

interface VerifyEmailPageProps {
  searchParams: {
    email: string;
  };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  return (
    <Card className="max-w-[80%] w-full mx-auto md:mx-0">
      <CardHeader className="p-4 space-y-1 ">
        <CardTitle className="text-2xl">Verificação de e-mail</CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <VerifyEmailForm email={searchParams.email} />
      </CardContent>

      <CardFooter className="grid gap-4 pb-4 px-4">
        <div className="text-sm text-muted-foreground">
          Já possui uma conta?{" "}
          <Link
            aria-label="Sign in"
            href="/signin"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Entre aqui
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
