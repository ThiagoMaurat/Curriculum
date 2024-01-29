import Link from "next/link";
import Header from "@/components/header";
import { getServerAuthSession } from "../../auth";

export default async function Home() {
  const data = await getServerAuthSession();
  return (
    <>
      <Header />
      {JSON.stringify(data?.user)}
      <Link href="/forms" className="underline">
        Página formulário
      </Link>
    </>
  );
}
