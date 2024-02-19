/* eslint-disable jsx-a11y/alt-text */
import { Image, Page, View, Text } from "@react-pdf/renderer";
import React from "react";
import { CurriculumFormInput } from "../forms/create-curriculum-form-collaborator/type";
import { commonStyles } from "./common-style";

interface CertificationsProps {
  data: CurriculumFormInput;
}

export default function Certifications({ data }: CertificationsProps) {
  if (data.certificateImages?.length === 0 || !data.certificateImages) {
    return null;
  }

  return (
    <>
      {data.certificateImages.map((item, index) => (
        <Page key={`certification-image-${index}`} style={commonStyles.body}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={item.link}
              style={{
                objectFit: "contain",
              }}
            />
          </View>

          <Text
            style={commonStyles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
    </>
  );
}
