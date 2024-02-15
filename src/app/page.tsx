import Header from "@/components/header";
import { BookOpenIcon, ComponentIcon, MergeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Home() {
  return (
    <React.Fragment>
      <Header />

      <div className="bg-gray-50 dark:bg-zinc-950 py-12 lg:py-24 container">
        <div className="container px-4 py-6 md:py-12 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl ">
              Geração de currículo facilitada
            </h1>
            <p className="max-w-[700px] text-center text-gray-500 md:text-xl dark:text-gray-400">
              Crie facilmente currículos com nossa intuitiva plataforma de
              geração de currículo. Economize tempo, colabore com colegas e
              aproveite os resultados
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-zinc-900 py-12">
        <div className="container px-4 py-6 md:py-12 space-y-6">
          <div className="grid max-w-4xl gap-6 mx-auto lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-5">
              <ComponentIcon className="w-20 h-20 p-4 rounded-full bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50" />
              <h2 className="text-2xl font-bold text-center">
                Personalize seu currículo
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Personalize seu currículo com nossa biblioteca de lindas modelos
                projetados.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-5">
              <MergeIcon className="w-20 h-20 p-4 rounded-full bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50" />
              <h2 className="text-2xl font-bold text-center">
                Colaboração entre equipe
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Envie os dados para nossa equipe e deixe por nossa parte a
                elaboração e geração do currículo.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-5">
              <BookOpenIcon className="w-20 h-20 p-4 rounded-full bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50" />
              <h2 className="text-2xl font-bold text-center">
                Conteúdo específico do assunto
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Acesse uma variedade de recursos adaptados às suas necessidades
                curriculares.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container px-4 py-6 md:py-12 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Pronto para começar?
            </h2>
            <p className="max-w-[600px] text-center text-gray-500 md:text-xl dark:text-gray-400">
              Desbloqueie o poder da nossa plataforma de geração de currículo.
              Entre em contato conosco se precisar de ajuda.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/signin"
              >
                Comece aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
