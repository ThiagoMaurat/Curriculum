type AcademicEducation = {
  initialYear: number;
  finalYear: number;
  subcategory: string;
  certifications: string;
  description: string;
};

type Bibliography = {} & AcademicEducation;

type Congress = {} & AcademicEducation;

type Events = {} & AcademicEducation;

type ExtracurricularActivities = {} & AcademicEducation;

type ProfessionalExperience = {} & AcademicEducation;

export type CurriculumFormInput = {
  academicEducation: AcademicEducation[];
  bibliography: Bibliography[];
  congress: Congress[];
  events: Events[];
  extracurricularActivities: ExtracurricularActivities[];
  professionalExperience: ProfessionalExperience[];
};
