import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import { View, Text } from "@react-pdf/renderer";
import React, { useEffect } from "react";
import { commonStyles } from "../../common-style";

interface CongressProps {
  data: CurriculumFormInput;
}

export default function Congress({ data }: CongressProps) {
  return (
    <React.Fragment>
      <View
        style={[
          commonStyles.commonCentralizedView,
          { marginTop: 4, marginBottom: 4 },
        ]}
      >
        <Text style={commonStyles.chapter}>{`${3}. Congresso Acadêmico`}</Text>
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
          <View key={`academic-education-${index}`}>
            <Text style={[commonStyles.subChapter]}>
              {`${3}.${index + 1} ${item.subcategory}`}
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
