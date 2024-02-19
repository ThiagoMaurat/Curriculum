import React from "react";
import { commonStyles } from "../common-style";
import { Page } from "@react-pdf/renderer";
import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import PersonalData from "./section/personal-data";
import AcademicEducation from "./section/academic-education";
import Bibliography from "./section/bibliography";
import Congress from "./section/congress";

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
      <Congress data={data} />
    </Page>
  );
}
