import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";

export function formatBySequenceForms(data: CurriculumFormInput) {
  let sequence = 2;

  const academicEducation = data?.data?.filter((data) => {
    if (data.topic === "Formação Acadêmica")
      return data.description && data.initialYear ? data : undefined;
  });

  const bibliography = data?.data?.filter((data) => {
    if (data.topic === "Produções Bibliográficas") {
      return data.description ? data : undefined;
    }
  });

  const eventsCongress = data?.data?.filter((data) => {
    if (data.topic === "Congressos e Eventos Científicos")
      return data.description ? data : undefined;
  });

  const extracurricularActivities = data?.data?.filter((data) => {
    if (data.topic === "Atividades Extracurriculares")
      return data.description ? data : undefined;
  });

  const professionalExperience = data?.data?.filter((data) => {
    if (data.topic === "Atualidade Profissional") {
      return data.description ? data : undefined;
    }
  });

  const result = {
    academicEducation: academicEducation.length > 0 ? sequence++ : undefined,
    bibliography: bibliography.length > 0 ? sequence++ : undefined,
    eventsCongress: eventsCongress.length > 0 ? sequence++ : undefined,
    extracurricularActivities:
      extracurricularActivities.length > 0 ? sequence++ : undefined,
    professionalExperience:
      professionalExperience.length > 0 ? sequence++ : undefined,
    certificates: sequence++,
  };

  return result;
}
