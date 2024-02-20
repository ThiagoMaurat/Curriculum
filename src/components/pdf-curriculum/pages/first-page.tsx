import React from "react";
import { Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { commonStyles } from "../common-style";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

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
  data: ListTodoCurriculumByCollaborator;
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
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Times New Roman",
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
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Times New Roman",
            }}
          >
            CURRICULUM VITAE
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Times New Roman",
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
