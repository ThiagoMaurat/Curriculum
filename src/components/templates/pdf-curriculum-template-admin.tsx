"use client";
import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import FirstPage from "@/components/pdf-curriculum/pages/first-page";
import { Document, Font } from "@react-pdf/renderer";
import SecondPage from "@/components/pdf-curriculum/pages/second-page";
import { ListTodoCurriculumByCollaborator } from "./forms-collaborator-create-curriculum";
import { env } from "../../../env.mjs";

interface PdfCurriculumTemplateProps {
  data: CurriculumFormInput;
  formsFilledByStudent: ListTodoCurriculumByCollaborator;
}

Font.register({
  family: "Times New Roman",
  fonts: [
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/times-new-roman/times.woff`,
      fontWeight: "normal",
    },
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/times-new-roman/7cc3599da04831aa8782e23d61cb18bb.ttf`,
      fontWeight: "bold",
    },
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/times-new-roman/97fe1ef2f9f6cdac38897d731b88a774.ttf`,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/times-new-roman/de248931529da8d04cc09ee92cfb2a56.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Cambria",
  fonts: [
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/cambria/758d40d7ca52e3a9bff2655c7ab5703c.ttf`,
      fontWeight: "normal",
    },
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/cambria/2db80501ab27169c9b8395ce6f749be1.ttf`,
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Calibri",
  fonts: [
    {
      src: `${env.NEXT_PUBLIC_APP_URL}/font/calibri/a78cfad3beb089a6ce86d4e280fa270b.ttf`,
      fontWeight: "normal",
    },
  ],
});

export const PdfCurriculumTemplate = ({
  data,
  formsFilledByStudent,
}: PdfCurriculumTemplateProps) => {
  return (
    <Document>
      <FirstPage data={formsFilledByStudent} />
      <SecondPage userApiData={formsFilledByStudent} data={data} />
    </Document>
  );
};
