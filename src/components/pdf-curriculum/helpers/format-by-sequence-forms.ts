import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";

export function formatBySequenceForms(data: CurriculumFormInput) {
  let sequence = 2;

  const academicEducation = data.academicEducation.filter((data) =>
    data.description && data.initialYear ? data : undefined
  );

  const bibliography = data.bibliography.filter((data) =>
    data.description ? data : undefined
  );

  const congress = data.congress.filter((data) =>
    data.description ? data : undefined
  );

  const events = data.events.filter((data) =>
    data.description ? data : undefined
  );

  const extracurricularActivities = data.extracurricularActivities.filter(
    (data) => (data.description ? data : undefined)
  );

  const professionalExperience = data.professionalExperience.filter((data) =>
    data.description ? data : undefined
  );

  const result = {
    academicEducation: academicEducation.length > 0 ? sequence++ : undefined,
    bibliography: bibliography.length > 0 ? sequence++ : undefined,
    congress: congress.length > 0 ? sequence++ : undefined,
    events: events.length > 0 ? sequence++ : undefined,
    extracurricularActivities:
      extracurricularActivities.length > 0 ? sequence++ : undefined,
    professionalExperience:
      professionalExperience.length > 0 ? sequence++ : undefined,
  };

  return result;
}
