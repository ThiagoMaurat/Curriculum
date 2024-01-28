import { CurriculumFormInput } from "./type";

export const DEFAULT_FORM: CurriculumFormInput = {
  name: "",
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
      type: "",
      year: new Date().getFullYear(),
    },
  ],
  bibliography: [
    {
      description: "",
      type: "",
      year: new Date().getFullYear(),
    },
  ],
  congress: [
    {
      description: "",
      type: "",
      year: new Date().getFullYear(),
    },
  ],
  events: [
    {
      description: "",
      type: "",
      year: new Date().getFullYear(),
    },
  ],
  extracurricularActivities: [
    {
      description: "",
      type: "",
      year: new Date().getFullYear(),
    },
  ],
  professionalExperience: [
    {
      description: "",
      type: "",
      year: new Date().getFullYear(),
    },
  ],
  certificateImages: [
    {
      link: "",
    },
  ],
};
