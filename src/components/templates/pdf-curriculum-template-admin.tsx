import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import FirstPage from "@/components/pdf-curriculum/pages/first-page";
import Certifications from "@/components/pdf-curriculum/certifications";
import { Document, Font } from "@react-pdf/renderer";
import SecondPage from "@/components/pdf-curriculum/pages/second-page";
import { ListTodoCurriculumByCollaborator } from "./forms-collaborator-create-curriculum";

interface PdfCurriculumTemplateProps {
  data: CurriculumFormInput;
  formsFilledByStudent: ListTodoCurriculumByCollaborator;
}

Font.register({
  family: "Ubuntu",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Times-Roman",
  fonts: [
    {
      src: "/Times-Roman.ttf",
    },
    {
      src: "/Times-Roman-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/Times-Roman-Italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "/Times-Roman-Bold-Italic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

export const PdfCurriculumTemplate = ({
  data,
  formsFilledByStudent,
}: PdfCurriculumTemplateProps) => {
  return (
    <Document style={{ fontFamily: "Ubuntu" }}>
      <FirstPage data={formsFilledByStudent} />
      <SecondPage secondStepData={formsFilledByStudent} data={data} />
      {/* <Certifications data={data} /> */}
    </Document>
  );
};
