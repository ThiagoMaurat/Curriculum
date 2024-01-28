import Link from "next/link";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";
import Header from "@/components/header";

export default async function Home() {
  const serverSession = await getServerSession(authOptions);

  return (
    <>
      <Header />
      {JSON.stringify(serverSession?.user)}
      <Link href="/forms" className="underline">
        Página formulário
      </Link>
    </>
  );
}
