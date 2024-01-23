import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return <main className="w-full py-4 mx-auto rounded-s-xl">{children}</main>;
}
