"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

interface NoSSRWrapperProps {
  children: React.ReactNode;
}

export const NoSSRWrapper = ({ children }: NoSSRWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return <React.Fragment>{children}</React.Fragment>;
};

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
