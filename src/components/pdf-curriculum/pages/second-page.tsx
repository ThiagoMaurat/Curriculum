import React from "react";
import { commonStyles } from "../common-style";
import { Page } from "@react-pdf/renderer";
import { CurriculumFormInput } from "@/components/forms/curriculum-form/type";
import PersonalData from "./section/personal-data";
import AcademicEducation from "./section/academic-education";
import Bibliography from "./section/bibliography";

interface SecondPageProps {
  data: CurriculumFormInput;
}

export default function SecondPage({ data }: SecondPageProps) {
  return (
    <Page
      size={"A4"}
      wrap
      style={[commonStyles.body, { display: "flex", gap: 12 }]}
    >
      <PersonalData data={data} />
      <AcademicEducation data={data} />
      <Bibliography data={data} />
    </Page>
  );
}
