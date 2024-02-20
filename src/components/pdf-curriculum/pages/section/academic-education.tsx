import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { commonStyles } from "../../common-style";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface AcademicEducationProps {
  data: CurriculumFormInput;
  secondStepData: ListTodoCurriculumByCollaborator;
}

export default function AcademicEducation({
  data,
  secondStepData,
}: AcademicEducationProps) {
  if (!data.academicEducation || data.academicEducation.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <View
        style={[
          commonStyles.commonCentralizedView,
          { marginTop: 4, marginBottom: 4 },
        ]}
      >
        <Text style={commonStyles.chapter}>2. FORMAÇÃO ACADÊMICA</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          textAlign: "justify",
        }}
      >
        {data.academicEducation.map((item, index) => (
          <View key={`academic-education-${index}`}>
            <Text style={[commonStyles.subChapter]}>
              {`2.${index + 1} ${item.subcategory}`}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "justify",
                gap: 10,
                marginTop: 10,
              }}
            >
              <Text style={commonStyles.descriptionTitle}>
                {item.initialYear}
              </Text>
              <Text style={commonStyles.subtitle}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text
        style={commonStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </React.Fragment>
  );
}
