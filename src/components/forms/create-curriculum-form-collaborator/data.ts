import { CurriculumFormInput } from "./type";

export const DEFAULT_FORM: CurriculumFormInput = {
  data: [
    {
      description: "",
      subcategory: "",
      finalYear: new Date().getFullYear(),
      initialYear: new Date().getFullYear(),
      certifications: "",
    },
  ],
};
