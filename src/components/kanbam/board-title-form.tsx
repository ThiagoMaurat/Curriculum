"use client";
import { useToast } from "@/hooks/use-toast";
import { ElementRef, useRef, useState } from "react";
/* import { Board } from "@prisma/client"; */

import { Button } from "@/components/ui/button";
import { Board } from "./types";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { toast } = useToast();
  /* const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast({
        title: "Sucesso",
        description:
          typeof data === "string" ? data : "Sucesso em atualizar board.",
        duration: 4000,
      });
      setTitle(data.title);
      disableEditing();
    },
    onError: (error: unknown) => {
      toast({
        title: "Erro",
        description:
          typeof error === "string" ? error : "Erro ao atualizar board.",
        duration: 4000,
      });
    },
  }); */

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    /*  execute({
      title,
      id: data.id,
    }); */
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <input
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="ghost"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
