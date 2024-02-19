import React from "react";
import { Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { commonStyles } from "../common-style";
import { CurriculumFormInput } from "../../forms/create-curriculum-form-collaborator/type";

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
  const { fullName } = data;

  return (
    <Page size={"A4"} style={commonStyles.body}>
      <View style={firstPageStyles.view}>
        <Text
          style={{
            fontStyle: "italic",
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {fullName}
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
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            CURRICULUM VITAE
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
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
