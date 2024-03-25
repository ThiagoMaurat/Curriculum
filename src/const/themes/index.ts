import { map } from "lodash";
import { AcademicEducationConst } from "./academic-education-category";
import { BibliographyConst } from "./bibliography";
import { CongressConst } from "./congress";
import { ExtracurricularActivitiesConst } from "./extracurricular-activities";
import { ITopic } from "./topic";

export const AcademicEducationPatternMatching: Record<
  ITopic,
  Array<{ label: string; value: string }>
> = {
  "Formação Acadêmica": map(AcademicEducationConst, (item) => ({
    label: item,
    value: item,
  })),
  "Produções Bibliográficas": map(BibliographyConst, (item) => ({
    label: item,
    value: item,
  })),
  "Congressos e Eventos Científicos": map(CongressConst, (item) => ({
    label: item,
    value: item,
  })),
  "Atividades Extracurriculares": map(
    ExtracurricularActivitiesConst,
    (item) => ({
      label: item,
      value: item,
    })
  ),
  /*   "Atuação Profissional": map(["Atuação Profissional"], (item) => ({
    label: item,
    value: item,
  })), */
};
