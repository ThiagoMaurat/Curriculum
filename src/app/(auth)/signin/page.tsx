import { type Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/components/forms/signin-form";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_PUBLIC_APP_URL ?? ""),
  title: "Entrar",
  description: "Entrar na plataforma Curriculum",
};

export default function SignInPage() {
  return (
    <Card className="max-w-[80%] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Entrar</CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <SignInForm />
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
