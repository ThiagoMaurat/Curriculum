import React from "react";
import { commonStyles } from "../common-style";
import { Page } from "@react-pdf/renderer";
import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import PersonalData from "./section/personal-data";
import AcademicEducation from "./section/academic-education";
import Bibliography from "./section/bibliography";
import Congress from "./section/congress";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface SecondPageProps {
  data: CurriculumFormInput;
  secondStepData: ListTodoCurriculumByCollaborator;
}

export default function SecondPage({ data, secondStepData }: SecondPageProps) {
  return (
    <Page
      size={"A4"}
      wrap
      style={[commonStyles.body, { display: "flex", gap: 12 }]}
    >
      <PersonalData data={secondStepData} />
      <AcademicEducation data={data} secondStepData={secondStepData} />
      <Bibliography data={data} />
      <Congress data={data} />
    </Page>
  );
}
