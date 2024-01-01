import React from "react";
import { Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { commonStyles } from "./common-style";
import { CurriculumFormInput } from "../forms/curriculum-form/type";

const firstPageStyles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

interface FirstPageProps {
  data: CurriculumFormInput;
}

export default function FirstPage({ data }: FirstPageProps) {
  const { name } = data;

  return (
    <Page size={"A4"} style={commonStyles.body}>
      <View style={firstPageStyles.view}>
        <Text style={[commonStyles.title, { fontStyle: "italic" }]}>
          {name}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              commonStyles.title,
              { textAlign: "center", fontStyle: "italic" },
            ]}
          >
            CURRICULUM VITAE
          </Text>
          <Text style={[commonStyles.subtitle, { textAlign: "center" }]}>
            Medicina
          </Text>
        </View>

        <Text>{new Date().getFullYear()}</Text>
      </View>

      <Text
        style={commonStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
}
