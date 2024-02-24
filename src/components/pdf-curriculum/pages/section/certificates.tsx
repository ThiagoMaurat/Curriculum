import { CurriculumFormInput } from "@/components/forms/create-curriculum-form-collaborator/type";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { commonStyles } from "../../common-style";
import { formatBySequenceForms } from "../../helpers/format-chapters-by-sequence-forms";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface CertificateProps {
  data: CurriculumFormInput;
  userApiData: ListTodoCurriculumByCollaborator;
}

export default function Certificate({ data, userApiData }: CertificateProps) {
  let hasCertifications = false;

  for (const [_, value] of Object.entries(data)) {
    for (const [_, value2] of Object.entries(value)) {
      if (value2.certifications) {
        hasCertifications = true;
        break;
      }
    }
  }

  if (!hasCertifications) {
    return null;
  }

  return (
    <React.Fragment>
      <View style={[commonStyles.commonCentralizedView, { marginTop: 32 }]}>
        <Text style={commonStyles.chapter}>{`${
          formatBySequenceForms(data).certificates
        }.  CERTIFICADOS COMPROBATÓRIOS`}</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
          textAlign: "justify",
        }}
      >
        <Text style={[commonStyles.yearsText]}>
          DECLARAÇÃO DE APRESENTAÇÃO DE CURRÍCULO
        </Text>

        <Text style={[commonStyles.yearsAdditionalText]}>
          Eu, <Text>{userApiData.fullName}</Text>, portador(a), do Documento de
          Identificação Oficial nº <Text>{userApiData.identityDocument}</Text>,
          inscrito no CPF sob o nº
          <Text>{userApiData.CPF}</Text>, candidato(a) ao Processo de Residência
          Médica Acesso Direto, DECLARO que apresento, neste momento, os
          documentos necessários para concorrer à 2ª etapa – análise curricular
          do processo seletivo acima mencionado. DECLARO, para fins de prova
          junto à Comissão de Seleção, que as informações aqui prestadas e os
          documentos apresentados são verdadeiros. DECLARO ciência que a
          comprovação da autenticidade poderá ser averiguada pela Banca nos
          documentos a seguir. Diante do exposto, apresento conjuntamente a esta
          declaração os documentos comprobatórios:
        </Text>
      </View>

      <Text
        style={commonStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </React.Fragment>
  );
}
