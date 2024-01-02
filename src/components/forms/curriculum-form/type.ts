type AcademicEducation = {
  year: number;
  type: string;
  description: string;
};

type Bibliography = {} & AcademicEducation;

type Congress = {} & AcademicEducation;

type Events = {} & AcademicEducation;

type ExtracurricularActivities = {} & AcademicEducation;

type ProfessionalExperience = {} & AcademicEducation;

type CertificateImages = {
  link: string;
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
  description: string;
  academicEducation: AcademicEducation[];
  bibliography: Bibliography[];
  congress: Congress[];
  events: Events[];
  extracurricularActivities: ExtracurricularActivities[];
  professionalExperience: ProfessionalExperience[];
  certificateImages: CertificateImages[];
};
