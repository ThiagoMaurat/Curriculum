type AcademicEducation = {
  year: number;
  type: string;
  description: string;
};

export type CurriculumFormInput = {
  name: string;
  presentationName: string;
  fathersName: string;
  mothersName: string;
  birthday: Date;
  identityDocument: string;
  CRM: string;
  CPF: string;
  phone: string;
  address: string;
  email: string;
  lattes: string;
  academicEducation: AcademicEducation[];
};
