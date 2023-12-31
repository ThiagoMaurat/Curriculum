import { CurriculumFormInput } from "@/components/forms/curriculum-form/type";
import FirstPage from "@/components/pdf-curriculum/first-page";
import { Document } from "@react-pdf/renderer";

interface PdfCurriculumTemplateProps {
  data: CurriculumFormInput;
}

export const PdfCurriculumTemplate = ({ data }: PdfCurriculumTemplateProps) => {
  return (
    <Document>
      <FirstPage data={data} />
    </Document>
  );
};
