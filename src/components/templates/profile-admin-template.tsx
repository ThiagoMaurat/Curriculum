import { ListUsersByAdminUserCaseOutput } from "@/server/use-cases/list-user-by-admin";
import React, { useMemo } from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "../ui/table";

interface ProfileAdminTemplateProps {
  data: ListUsersByAdminUserCaseOutput;
}

export default function ProfileAdminTemplate(props: ProfileAdminTemplateProps) {
  const { data } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] line-clamp-1">Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead className="text-right">Permissão</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.user.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.product}</TableCell>
            <TableCell className="text-right">{user.roles[0].name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
