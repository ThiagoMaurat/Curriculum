import React from "react";
import { commonStyles } from "../common-style";
import { Page } from "@react-pdf/renderer";
import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import PersonalData from "./section/personal-data";
import AcademicEducation from "./section/academic-education";
import Bibliography from "./section/bibliography";
import CongressEvents from "./section/congress-events";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";
import ExtracurricularActivities from "./section/extracurricular-activities";
import ProfessionalExperience from "./section/professional-experience";
import Certificate from "./section/certificates";

interface SecondPageProps {
  data: CurriculumFormInput;
  userApiData: ListTodoCurriculumByCollaborator;
}

export default function SecondPage({ data, userApiData }: SecondPageProps) {
  return (
    <Page
      size={"A4"}
      wrap
      style={[commonStyles.body, { display: "flex", gap: 12 }]}
    >
      <PersonalData userApiData={userApiData} />
      <AcademicEducation data={data} />
      <Bibliography data={data} />
      <CongressEvents data={data} />
      <ExtracurricularActivities data={data} />
      <ProfessionalExperience data={data} />
      <Certificate data={data} userApiData={userApiData} />
    </Page>
  );
}
