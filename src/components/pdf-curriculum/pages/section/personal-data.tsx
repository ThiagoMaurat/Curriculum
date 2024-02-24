import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Text, View } from "@react-pdf/renderer";
import { commonStyles } from "../../common-style";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface PersonalDataProps {
  userApiData: ListTodoCurriculumByCollaborator;
}

export default function PersonalData({ userApiData }: PersonalDataProps) {
  return (
    <React.Fragment>
      <Text style={[commonStyles.title]}>Sumário</Text>

      <Text style={[commonStyles.title, { fontStyle: "italic" }]}>
        Curriculum Vitae
      </Text>

      {userApiData?.fullName && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Times New Roman",
          }}
        >
          {userApiData?.fullName}
        </Text>
      )}

      {/* {userApiData.selfDescription && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 8,
            textAlign: "justify",
          }}
        >
          <Text
            style={[
              commonStyles.subtitle,
              {
                marginVertical: 10,
              },
            ]}
          >
            {userApiData.selfDescription}
          </Text>
        </View>
      )} */}

      <View style={[commonStyles.commonCentralizedView, { marginTop: 32 }]}>
        <Text style={[commonStyles.chapter]}>1. DADOS PESSOAIS</Text>
      </View>

      {userApiData?.fullName && (
        <View>
          <Text style={commonStyles.fieldText}>
            Nome:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.fullName}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.fathersName && (
        <View>
          <Text style={commonStyles.fieldText}>
            Nome do Pai:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.fathersName}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.mothersName && (
        <View>
          <Text style={commonStyles.fieldText}>
            Nome da Mae:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.mothersName}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.birthday && (
        <View>
          <Text style={commonStyles.fieldText}>
            Data de Nascimento:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {format(userApiData?.birthday, "dd/MM/yyyy", { locale: ptBR })}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.identityDocument && (
        <View>
          <Text style={commonStyles.fieldText}>
            Documento de identidade:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.identityDocument}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.CRM && (
        <View>
          <Text style={commonStyles.fieldText}>
            CRM:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.CRM}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.CPF && (
        <View>
          <Text style={commonStyles.fieldText}>
            CPF:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.CPF}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.phone && (
        <View>
          <Text style={commonStyles.fieldText}>
            Telefone:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.phone}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.address && (
        <View>
          <Text style={commonStyles.fieldText}>
            Endereço:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.address}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.email && (
        <View>
          <Text style={commonStyles.fieldText}>
            E-mail:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.email}
            </Text>
          </Text>
        </View>
      )}

      {userApiData?.lattes && (
        <View>
          <Text style={commonStyles.fieldText}>
            Lattes:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {userApiData?.lattes}
            </Text>
          </Text>
        </View>
      )}

      <Text
        style={commonStyles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </React.Fragment>
  );
}
