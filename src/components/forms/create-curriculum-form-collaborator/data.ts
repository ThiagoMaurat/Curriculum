import { CurriculumFormInput } from "./type";

export const DEFAULT_FORM: CurriculumFormInput = {
  fullName: "",
  fathersName: "",
  mothersName: "",
  birthday: new Date(),
  identityDocument: "",
  CRM: "",
  CPF: "",
  phone: "",
  address: "",
  email: "",
  lattes: "",
  selfDescription: "",
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
  congress: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
  events: [
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
  certificateImages: [
    {
      link: "",
    },
  ],
};
