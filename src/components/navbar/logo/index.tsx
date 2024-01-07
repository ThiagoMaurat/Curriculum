import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <h2 className="font-bold text-3xl self-center cursor-pointer gray-900">
        Curriculum 📘
      </h2>
    </Link>
  );
}
