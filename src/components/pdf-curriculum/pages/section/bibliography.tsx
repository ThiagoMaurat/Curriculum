import { CurriculumFormInput } from "@/components/forms/curriculum-form-admin/type";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { commonStyles } from "../../common-style";

interface BibliographyProps {
  data: CurriculumFormInput;
}

export default function Bibliography({ data }: BibliographyProps) {
  if (!data.bibliography || data.bibliography.length === 0) {
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
        <Text style={commonStyles.chapter}>4. BIBLIOGRAFIA</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          textAlign: "justify",
        }}
      >
        {data.bibliography.map((item, index) => (
          <View key={`academic-education-${index}`}>
            <Text style={[commonStyles.subChapter]}>
              {`2.${index + 1} ${item.type}`}
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
              <Text style={commonStyles.descriptionTitle}>{item.year}</Text>
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
