import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { commonStyles } from "../../common-style";
import { formatBySequenceForms } from "../../helpers/format-chapters-by-sequence-forms";
import { orderBy } from "lodash";

interface CongressEventsProps {
  data: CurriculumFormInput;
}

export default function CongressEvents({ data }: CongressEventsProps) {
  if (!data?.eventsCongress || !data?.eventsCongress?.[0]?.description) {
    return null;
  }

  return (
    <React.Fragment>
      <View style={[commonStyles.commonCentralizedView, { marginTop: 32 }]}>
        <Text style={commonStyles.chapter}>
          {`${
            formatBySequenceForms(data).eventsCongress
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
        {orderBy(
          data.eventsCongress,
          [(item) => item.finalYear || item.initialYear, "initialYear"],
          ["desc", "desc"]
        ).map((item, index) => (
          <View
            key={`academic-education-${index}`}
            style={index > 0 ? { paddingTop: 30 } : undefined}
          >
            <Text style={[commonStyles.subtitle]}>
              {`${formatBySequenceForms(data).eventsCongress}.${index + 1} ${
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
