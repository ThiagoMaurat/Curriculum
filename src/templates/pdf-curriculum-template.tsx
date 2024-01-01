import { CurriculumFormInput } from "@/components/forms/curriculum-form/type";
import FirstPage from "@/components/pdf-curriculum/first-page";
import Certifications from "@/components/pdf-curriculum/certifications";
import { Document, Font } from "@react-pdf/renderer";

interface PdfCurriculumTemplateProps {
  data: CurriculumFormInput;
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
  ],
});

export const PdfCurriculumTemplate = ({ data }: PdfCurriculumTemplateProps) => {
  return (
    <Document style={{ fontFamily: "Ubuntu" }}>
      <FirstPage data={data} />
      <Certifications data={data} />
    </Document>
  );
};
