"use client";
import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import FirstPage from "@/components/pdf-curriculum/pages/first-page";
import { Document, Font } from "@react-pdf/renderer";
import SecondPage from "@/components/pdf-curriculum/pages/second-page";
import { ListTodoCurriculumByCollaborator } from "./forms-collaborator-create-curriculum";

interface PdfCurriculumTemplateProps {
  data: CurriculumFormInput;
  formsFilledByStudent: ListTodoCurriculumByCollaborator;
}

Font.register({
  family: "Times New Roman",
  fonts: [
    {
      src: "https://fonts.cdnfonts.com/s/57197/times.woff",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/7cc3599da04831aa8782e23d61cb18bb.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://db.onlinewebfonts.com/t/97fe1ef2f9f6cdac38897d731b88a774.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "https://db.onlinewebfonts.com/t/de248931529da8d04cc09ee92cfb2a56.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Cambria",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/758d40d7ca52e3a9bff2655c7ab5703c.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/2db80501ab27169c9b8395ce6f749be1.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Calibri",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/a78cfad3beb089a6ce86d4e280fa270b.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/527c5ab608cab860a6aae8ce02e14b0e.ttf",
      fontWeight: "bold",
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
