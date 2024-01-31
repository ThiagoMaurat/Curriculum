"use client";
import { ListUsersByAdminUserCaseOutput } from "@/server/use-cases/list-user-by-admin";
import React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationButton } from "../ui/pagination-component";

interface ProfileAdminTemplateProps {
  data: ListUsersByAdminUserCaseOutput;
}

export default function ProfileAdminTemplate(props: ProfileAdminTemplateProps) {
  const { data } = props;
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "1";
  const limit = searchParams?.get("limit") ?? "10";
  const sort = searchParams?.get("sort") ?? "asc";
  const router = useRouter();

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  return (
    <React.Fragment>
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
            <TableRow
              key={user.id}
              className="cursor-pointer"
              onClick={() => {
                router.refresh();
                router.push(`/student/${user.id}`);
              }}
            >
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.product ? user.product : "-"}</TableCell>
              <TableCell className="text-right">
                {user.roles.length > 0 ? user.roles[0].name : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="w-full mx-auto mt-4">
        <PaginationButton
          pageCount={Math.ceil(data.metadata.total / Number(limit))}
          createQueryString={createQueryString}
          page={page || "1"}
          sort={sort}
          limit={limit}
          className="w-full flex justify-center"
        />
      </div>
    </React.Fragment>
  );
}
