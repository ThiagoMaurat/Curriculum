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
  if (!data.academicEducation || !data.academicEducation?.[0].description) {
    return null;
  }

  return (
    <React.Fragment>
      <View style={[commonStyles.commonCentralizedView, { marginTop: 32 }]}>
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
          <View
            key={`academic-education-${index}`}
            style={index > 0 ? { paddingTop: 30 } : undefined}
          >
            <Text style={[commonStyles.subtitle]}>
              {`2.${index + 1} ${item.subcategory}`}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 25,
              }}
            >
              <Text
                style={[
                  commonStyles.yearsText,
                  { alignSelf: "flex-start", paddingTop: 3 },
                ]}
              >
                {`${item.initialYear} ${
                  item.finalYear ? `- ${item.finalYear}` : ""
                }`}
              </Text>
              <Text
                style={[
                  commonStyles.yearsAdditionalText,
                  { textAlign: "justify", flex: 1 },
                ]}
              >
                {item.description}
              </Text>
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
