export type fieldArray = {
  topic: string;
  initialYear: number;
  finalYear: number;
  subcategory: string;
  certifications: string;
  description: string;
};

export type CurriculumFormInput = {
  data: fieldArray[];
};
