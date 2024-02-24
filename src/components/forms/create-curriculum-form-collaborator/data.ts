import { CurriculumFormInput } from "./type";

export const DEFAULT_FORM: CurriculumFormInput = {
  academicEducation: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
  bibliography: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
  eventsCongress: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
  extracurricularActivities: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
  professionalExperience: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
};
