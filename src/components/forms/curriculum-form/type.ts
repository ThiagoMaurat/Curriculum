type AcademicEducation = {
  year: number;
  type: string;
  description: string;
};

type Bibliography = {} & AcademicEducation;

type Congress = {} & AcademicEducation;

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
  bibliography: Bibliography[];
  congress: Congress[];
};
