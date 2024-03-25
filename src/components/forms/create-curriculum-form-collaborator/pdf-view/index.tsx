import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useMemo } from "react";
import { CurriculumFormInput, fieldArray } from "../type";

interface PDFViewProps {
  data: ListTodoCurriculumByCollaborator["certifications"];
  formSelectedCertifications: fieldArray[];
  firstStepIteration: number;
}

export default function PDFView({
  data,
  formSelectedCertifications,
  firstStepIteration,
}: PDFViewProps) {
  const [index, setIndex] = React.useState(0);

  const possiblePdfToShow = useMemo(() => {
    return data?.filter((certification) => {
      return !formSelectedCertifications.some(
        (dataItem, index) =>
          dataItem.certifications === certification.url &&
          firstStepIteration !== index
      );
    });
  }, [data, firstStepIteration, formSelectedCertifications]);

  return (
    <div className="w-full min-h-[600px] overflow-auto space-y-2">
      {possiblePdfToShow?.[index]?.url && (
        <iframe
          style={{
            width: "100%",
            height: "500px",
            border: "none",
            paddingTop: "2rem",
          }}
          src={`${possiblePdfToShow?.[index]?.url}#&navpanes=0&scrollbar=0&view=FitH&embedded=true`}
        />
      )}

      {possiblePdfToShow?.[index]?.fileName && (
        <span className="text-2xl block w-full font-bold text-center">
          {possiblePdfToShow?.[index]?.fileName}
        </span>
      )}

      <div className="mx-auto space-x-2 w-full flex justify-center">
        <Button
          variant={"ghost"}
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <Button
          variant={"ghost"}
          disabled={index === possiblePdfToShow?.length - 1}
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
      </div>
    </div>
  );
}
