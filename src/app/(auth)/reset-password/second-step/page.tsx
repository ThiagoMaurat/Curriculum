import { type Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordFormSecondStep } from "@/components/forms/reset-password-second-step";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Resetar senha",
  description: "Resetar senha",
};

interface ResetPasswordProps {
  searchParams: {
    email: string;
  };
}

export default function ResetPassword({ searchParams }: ResetPasswordProps) {
  return (
    <Card className="max-w-[80%] w-full mx-auto md:mx-0">
      <CardHeader className="p-4 space-y-1 ">
        <CardTitle className="text-2xl">Resetar senha</CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <ResetPasswordFormSecondStep emailSearchParams={searchParams.email} />
      </CardContent>

      <CardFooter className="flex flex-wrap pb-4 px-4 items-center space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Não possui uma conta?{" "}
          <Link
            aria-label="Sign up"
            href="/signup"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Registre aqui
          </Link>
        </div>

        <Link
          aria-label="Reset password"
          href="/reset-password"
          className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
        >
          Resetar senha
        </Link>
      </CardFooter>
    </Card>
  );
}
