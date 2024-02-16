import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Card as CardType } from "../../types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssociateUserByCoordinatorType, schema } from "./schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  ListCoordinatorUsers,
  listCoordinatorUsers,
} from "@/server/action/list-coordinator-users";
import { associateUserByCoordinator } from "@/server/action/associate-user-by-coordinator";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ModalSelectionProps {
  onOpenChange: () => void;
  open: boolean;
  data: CardType;
}

export default function ModalSelection(props: ModalSelectionProps) {
  const { onOpenChange, open, data } = props;
  const { data: session } = useSession();
  const { toast } = useToast();
  const [coordinators, setCoordinators] = React.useState<
    ListCoordinatorUsers[] | null
  >(null);
  const methods = useForm<AssociateUserByCoordinatorType>({
    resolver: zodResolver(schema),
  });

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[600px] overflow-auto">
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

        {session?.user?.roleName === "coordinator" && (
          <Card className="w-full mx-auto md:mx-0">
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
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
