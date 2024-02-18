import React from "react";
import { List } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createCommentAction } from "@/server/action/create-comments";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Card } from "../types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface CommentsComponentProps {
  data: Card;
}

export default function CommentsComponent({ data }: CommentsComponentProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const commentsForm = useForm<{ message: string }>({
    resolver: zodResolver(
      z.object({
        message: z
          .string({
            required_error: "Mensagem obrigatória",
          })
          .min(10, {
            message: "Mensagem deve ter pelo menos 10 caracteres",
          }),
      })
    ),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (formData: { message: string }) => {
    startTransition(async () => {
      if (!formData.message || !session?.user?.id) return;

      const { serverError } = await createCommentAction({
        message: formData.message,
        curriculumId: data.id,
        userId: session.user.id,
      });

      if (serverError) {
        toast({
          title: "Erro",
          description: serverError || "Erro ao criar comentário.",
          duration: 4000,
        });

        return;
      }

      toast({
        title: "Sucesso",
        description: "Comentario criado com sucesso.",
        duration: 4000,
      });

      commentsForm.reset();
      router.refresh();
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <List className="w-4 h-4 text-primary" />
        <h3 className="text-xl font-bold text-primary">Comentários</h3>
      </div>

      {data.comments.length > 0 &&
        data.comments.map((comment) => (
          <CardComponent key={`comment-${comment.id}`}>
            <CardHeader className="p-3 flex flex-row gap-3">
              <div className="flex items-center gap-1">
                <Avatar className="w-7 h-7">
                  {comment?.users?.image && (
                    <AvatarImage src={comment.users.image} />
                  )}

                  {!comment?.users?.image && (
                    <AvatarFallback className="text-xs">
                      {`${comment?.users?.name?.substring(
                        0,
                        1
                      )} ${comment?.users?.name?.substring(1, 2)}`}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:gap-1">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold leading-none text-xs">
                    {comment?.users?.name}
                  </span>
                  <span className="text-xs leading-none ">
                    {format(comment?.createdAt, `dd/MM/yyyy HH:mm`, {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-3 px-3">
              <p className="text-sm break-all">{comment.message}</p>
            </CardContent>
          </CardComponent>
        ))}

      <Form {...commentsForm}>
        <form
          className="flex flex-col gap-4"
          onSubmit={commentsForm.handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <Avatar className="w-8 h-8">
              {session?.user?.image && (
                <AvatarImage src={session?.user?.image} />
              )}
              {!session?.user?.image && (
                <AvatarFallback className="text-xs">
                  {`${session?.user?.name?.substring(
                    0,
                    1
                  )} ${session?.user?.name?.substring(1, 2)}`}
                </AvatarFallback>
              )}
            </Avatar>

            <FormField
              control={commentsForm.control}
              name={"message"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <React.Fragment>
                      <Textarea
                        className="min-h-[90px] w-full"
                        maxLength={400}
                        placeholder="Insira aqui seu comentário"
                        {...field}
                      />
                    </React.Fragment>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            isLoading={isPending}
            disabled={isPending}
            className="min-w-40 self-end"
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </Form>
    </section>
  );
}
