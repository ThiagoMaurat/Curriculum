import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Text, View } from "@react-pdf/renderer";
import { commonStyles } from "../../common-style";
import { ListTodoCurriculumByCollaborator } from "@/components/templates/forms-collaborator-create-curriculum";

interface PersonalDataProps {
  data: ListTodoCurriculumByCollaborator;
}

export default function PersonalData({ data }: PersonalDataProps) {
  return (
    <React.Fragment>
      <Text style={[commonStyles.title, { fontStyle: "italic" }]}>
        Curriculum Vitae
      </Text>

      {data?.fullName && (
        <Text style={[commonStyles.title, { fontStyle: "italic" }]}>
          {data?.fullName}
        </Text>
      )}

      {data.selfDescription && (
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
      )}

      <View style={[commonStyles.commonCentralizedView, { marginVertical: 8 }]}>
        <Text style={commonStyles.chapter}>1. DADOS PESSOAIS</Text>
      </View>

      {data?.fullName && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Nome: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.fullName}</Text>
          </>
        </View>
      )}

      {data?.fathersName && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Nome do Pai: </Text>
            <Text style={commonStyles.descriptionTitle}>
              {data?.fathersName}
            </Text>
          </>
        </View>
      )}

      {data?.mothersName && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Nome da Mae: </Text>
            <Text style={commonStyles.descriptionTitle}>
              {data?.mothersName}
            </Text>
          </>
        </View>
      )}

      {data?.birthday && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Data de Nascimento: </Text>
            <Text style={commonStyles.descriptionTitle}>
              {format(data?.birthday, "dd/MM/yyyy", { locale: ptBR })}
            </Text>
          </>
        </View>
      )}

      {data?.identityDocument && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Documento de identidade: </Text>
            <Text style={commonStyles.descriptionTitle}>
              {data?.identityDocument}
            </Text>
          </>
        </View>
      )}

      {data?.CRM && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>CRM: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.CRM}</Text>
          </>
        </View>
      )}

      {data?.CPF && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>CPF: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.CPF}</Text>
          </>
        </View>
      )}

      {data?.phone && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Telefone: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.phone}</Text>
          </>
        </View>
      )}

      {data?.address && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Endereço: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.address}</Text>
          </>
        </View>
      )}

      {data?.email && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>E-mail: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.email}</Text>
          </>
        </View>
      )}

      {data?.lattes && (
        <View style={commonStyles.commonCentralizedView}>
          <>
            <Text style={commonStyles.title}>Lattes: </Text>
            <Text style={commonStyles.descriptionTitle}>{data?.lattes}</Text>
          </>
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
