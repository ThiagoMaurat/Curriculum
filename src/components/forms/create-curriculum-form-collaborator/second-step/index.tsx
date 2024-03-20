import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface FifthStepProps {
  children?: React.ReactNode;
}

export default function FourthStep({ children }: FifthStepProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Preview</CardTitle>
        <CardDescription>Analise o preview do pdf gerado.</CardDescription>
      </CardHeader>

      <CardContent className="grid">{children}</CardContent>
    </Card>
  );
}
