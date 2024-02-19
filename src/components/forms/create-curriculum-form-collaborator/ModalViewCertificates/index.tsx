import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, View } from "lucide-react";
import React from "react";

interface ModalViewCertificatesProps {
  data: ListTodoCurriculumByCollaborator["certifications"];
}

export default function ModalViewCertificates({
  data,
}: ModalViewCertificatesProps) {
  const [index, setIndex] = React.useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <View className="w-5 h-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] min-h-[600px] overflow-auto space-y-2">
        {data?.[index]?.url && (
          <iframe
            style={{
              width: "100%",
              height: "500px",
              border: "none",
              paddingTop: "2rem",
            }}
            src={`${data?.[index]?.url}#&navpanes=0&scrollbar=0&view=FitH&embedded=true`}
          />
        )}

        {data?.[index]?.fileName && (
          <h3 className="text-2xl mx-auto font-bold">
            {data?.[index]?.fileName}
          </h3>
        )}

        <DialogFooter className="mx-auto space-x-2">
          <Button
            variant={"ghost"}
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <Button
            variant={"ghost"}
            disabled={index === data?.length - 1}
            onClick={() =>
              setIndex((i) => {
                if (i === data?.length - 1) {
                  return data?.length - 1;
                }
                return i + 1;
              })
            }
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
