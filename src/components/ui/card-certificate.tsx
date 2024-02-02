import React, { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface CardCertificateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  href: string;
  onDelete: () => void;
}

export default function CardCertificate(props: CardCertificateProps) {
  const { title, href, onDelete, className } = props;
  const [onDeleteLoading, setOnDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setOnDeleteLoading(true);
    try {
      await onDelete();
    } finally {
      setOnDeleteLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full flex gap-4 flex-col md:flex-row items-center justify-between border border-slate-100 rounded-xl p-3",
        className
      )}
    >
      <div className="flex">
        <p className="text-sm text-primary font-medium line-clamp-1">{title}</p>
      </div>

      <div className="flex align-center justify-center gap-4">
        <Button className="w-full h-8" variant="link">
          <a
            className="text-lg text-main-primary font-medium truncate"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            Acessar
          </a>
        </Button>

        <Button
          isLoading={onDeleteLoading}
          onClick={handleDelete}
          className="w-full h-8"
          variant="destructive"
          type="button"
        >
          Excluir
        </Button>
      </div>
    </div>
  );
}
