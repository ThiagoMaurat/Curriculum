import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { commonStyles } from "../../common-style";
import { formatBySequenceForms } from "../../helpers/format-by-sequence-forms";

interface CongressProps {
  data: CurriculumFormInput;
}

export default function Congress({ data }: CongressProps) {
  if (!data.congress || !data.congress?.[0].description) {
    return null;
  }

  return (
    <React.Fragment>
      <View style={[commonStyles.commonCentralizedView, { marginTop: 32 }]}>
        <Text style={commonStyles.chapter}>
          {`${
            formatBySequenceForms(data).congress
          }. CONGRESSOS E EVENTOS CIENTÍFICOS`}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          textAlign: "justify",
        }}
      >
        {data.congress.map((item, index) => (
          <View
            key={`academic-education-${index}`}
            style={index > 0 ? { paddingTop: 30 } : undefined}
          >
            <Text style={[commonStyles.subtitle]}>
              {`${formatBySequenceForms(data).congress}. ${index + 1} ${
                item.subcategory
              }`}
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
