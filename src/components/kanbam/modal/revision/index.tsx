import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Card } from "../../types";
import { format } from "date-fns";
import CommentsComponent from "../../comments";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { AssociateUserByCoordinatorType, schema } from "../selection/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { associateUserByCoordinator } from "@/server/action/associate-user-by-coordinator";
import { useToast } from "@/hooks/use-toast";
import {
  ListCoordinatorUsers,
  listCoordinatorUsers,
} from "@/server/action/list-coordinator-users";

interface ModalRevisionProps {
  data: Card;
  children: React.ReactNode;
}

export default function ModalRevision(props: ModalRevisionProps) {
  const { data, children } = props;

  const { data: session } = useSession();

  const { toast } = useToast();

  const methods = useForm<AssociateUserByCoordinatorType>({
    resolver: zodResolver(schema),
  });

  const [coordinators, setCoordinators] = React.useState<
    ListCoordinatorUsers[] | null
  >(null);

  const submitAssociateUserByCoordinator = async (
    dataForm: AssociateUserByCoordinatorType
  ) => {
    if (!session?.user?.roleName || !data?.user?.id) return;

    const { serverError } = await associateUserByCoordinator({
      collaboratorId: dataForm.collaboratorId,
      studentId: data.user.id,
      userRole: session?.user.roleName,
    });

    if (serverError) {
      toast({
        title: "Erro",
        description: serverError || "Erro associar usuário.",
        duration: 4000,
      });

      return;
    }

    toast({
      title: "Sucesso",
      description: "Usuário associado com sucesso.",
      duration: 4000,
    });

    methods.reset();
  };

  useEffect(() => {
    const fetchCoordinators = async () => {
      const response = await listCoordinatorUsers();
      setCoordinators(response);
      return response;
    };

    fetchCoordinators();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[600px] overflow-auto space-y-2">
        <p className="text-muted-foreground text-lg font-bold">
          Nome:{" "}
          <span className="text-primary text-base">{data?.user?.name}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Conta criada em:{" "}
          <span className="text-primary text-base">
            {data?.user?.createdAt &&
              format(data?.user?.createdAt, "dd/MM/yyyy HH:mm")}
          </span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Email:{" "}
          <span className="text-primary text-base">{data?.user?.email}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Produto:{" "}
          <span className="text-primary text-base">{data?.user?.product}</span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Certificados:{" "}
          <span className="text-primary text-base ">
            {data?.certifications && data?.certifications?.length > 0
              ? data.certifications.map((certification, index) => (
                  <React.Fragment key={certification.fileName}>
                    <a
                      href={`${certification.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certification.fileName}
                    </a>
                    {data?.certifications?.length &&
                    index !== data?.certifications?.length - 1
                      ? ", "
                      : ""}
                  </React.Fragment>
                ))
              : "-"}
          </span>
        </p>

        <p className="text-muted-foreground text-lg font-bold">
          Colaborador associado:{" "}
          {data?.collaborators?.name ? (
            <span className="text-primary text-base ">
              {data?.collaborators?.name && (
                <span>{data?.collaborators?.name}</span>
              )}
            </span>
          ) : (
            <span>Não há colaborador associado</span>
          )}
        </p>

        {data?.generatedPDFUrl && (
          <p className="text-muted-foreground text-lg font-bold">
            Link do PDF:{" "}
            <Link
              href={data?.generatedPDFUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-primary text-base">
                {data?.generatedPDFUrl}
              </span>
            </Link>
          </p>
        )}

        {data?.generatedPDFUploadedAt && (
          <p className="text-muted-foreground text-lg font-bold">
            PDF final gerado em:{" "}
            <span className="text-primary text-base">
              {data?.generatedPDFUploadedAt &&
                format(data?.generatedPDFUploadedAt, "dd/MM/yyyy HH:mm")}
            </span>
          </p>
        )}

        {data?.certifications?.map((item) => {
          if (item.isInsertedAfterCurriculumDone) {
            return (
              <p
                key={item.fileName}
                className="text-muted-foreground text-lg font-bold"
              >
                Certificados inseridos após o currículo ser concluído:{" "}
                <a
                  href={`${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-primary text-base">
                    {item.fileName}
                  </span>
                </a>
              </p>
            );
          }
        })}

        {session?.user?.roleName === "coordinator" && (
          <CardComponent className="w-full mx-auto md:mx-0">
            <CardHeader className="space-y-1 py-4">
              <CardTitle className="text-base">
                Associar usuário ao Colaborador
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...methods}>
                <form
                  onSubmit={(...args) =>
                    void methods.handleSubmit(submitAssociateUserByCoordinator)(
                      ...args
                    )
                  }
                  className="space-y-3"
                >
                  <FormField
                    control={methods.control}
                    name={"collaboratorId"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Colaborador</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            name={field.name}
                            value={field.value ?? ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder="Insira o colaborador"
                                onChange={field.onChange}
                              />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {coordinators?.map((field) => (
                                  <SelectItem
                                    key={`${field.name}-${field.id}`}
                                    value={String(field.id)}
                                  >
                                    {field.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full"
                    type="submit"
                    disabled={methods.formState.isSubmitting}
                    isLoading={methods.formState.isSubmitting}
                  >
                    Associar usuário
                  </Button>
                </form>
              </Form>
            </CardContent>
          </CardComponent>
        )}

        <CommentsComponent data={data} />
      </DialogContent>
    </Dialog>
  );
}
