import Link from "next/link";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";
import Header from "@/components/header";
import { getPresentationName } from "@/helpers/extract-presentation-name";

export default async function Home() {
  const serverSession = await getServerSession(authOptions);
  console.log(getPresentationName("Thiago Pereira"));

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
