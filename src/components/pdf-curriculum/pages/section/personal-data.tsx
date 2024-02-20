import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Text, View, Tspan } from "@react-pdf/renderer";
import { commonStyles } from "../../common-style";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface PersonalDataProps {
  data: ListTodoCurriculumByCollaborator;
}

export default function PersonalData({ data }: PersonalDataProps) {
  return (
    <React.Fragment>
      <Text style={[commonStyles.title]}>Sumário</Text>

      <Text style={[commonStyles.title, { fontStyle: "italic" }]}>
        Curriculum Vitae
      </Text>

      {data?.fullName && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Times New Roman",
          }}
        >
          {data?.fullName}
        </Text>
      )}

      {/* {data.selfDescription && (
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
            {data.selfDescription}
          </Text>
        </View>
      )} */}

      <View style={[commonStyles.commonCentralizedView, { marginTop: 32 }]}>
        <Text style={[commonStyles.chapter]}>1. DADOS PESSOAIS</Text>
      </View>

      {data?.fullName && (
        <View>
          <Text style={commonStyles.fieldText}>
            Nome:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {data?.fullName}
            </Text>
          </Text>
        </View>
      )}

      {data?.fathersName && (
        <View>
          <Text style={commonStyles.fieldText}>
            Nome do Pai:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {data?.fathersName}
            </Text>
          </Text>
        </View>
      )}

      {data?.mothersName && (
        <View>
          <Text style={commonStyles.fieldText}>
            Nome da Mae:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {data?.mothersName}
            </Text>
          </Text>
        </View>
      )}

      {data?.birthday && (
        <View>
          <Text style={commonStyles.fieldText}>
            Data de Nascimento:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {format(data?.birthday, "dd/MM/yyyy", { locale: ptBR })}
            </Text>
          </Text>
        </View>
      )}

      {data?.identityDocument && (
        <View>
          <Text style={commonStyles.fieldText}>
            Documento de identidade:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {data?.identityDocument}
            </Text>
          </Text>
        </View>
      )}

      {data?.CRM && (
        <View>
          <Text style={commonStyles.fieldText}>
            CRM:{" "}
            <Text style={commonStyles.fieldAdditionalText}>{data?.CRM}</Text>
          </Text>
        </View>
      )}

      {data?.CPF && (
        <View>
          <Text style={commonStyles.fieldText}>
            CPF:{" "}
            <Text style={commonStyles.fieldAdditionalText}>{data?.CPF}</Text>
          </Text>
        </View>
      )}

      {data?.phone && (
        <View>
          <Text style={commonStyles.fieldText}>
            Telefone:{" "}
            <Text style={commonStyles.fieldAdditionalText}>{data?.phone}</Text>
          </Text>
        </View>
      )}

      {data?.address && (
        <View>
          <Text style={commonStyles.fieldText}>
            Endereço:{" "}
            <Text style={commonStyles.fieldAdditionalText}>
              {data?.address}
            </Text>
          </Text>
        </View>
      )}

      {data?.email && (
        <View>
          <Text style={commonStyles.fieldText}>
            E-mail:{" "}
            <Text style={commonStyles.fieldAdditionalText}>{data?.email}</Text>
          </Text>
        </View>
      )}

      {data?.lattes && (
        <View>
          <Text style={commonStyles.fieldText}>
            Lattes:{" "}
            <Text style={commonStyles.fieldAdditionalText}>{data?.lattes}</Text>
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
