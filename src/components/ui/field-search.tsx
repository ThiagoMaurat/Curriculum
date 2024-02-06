"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const params = useSearchParams();
    const debouncedSearch = useDebounce(search, 800);

    const handleSearch = useCallback(
      (value: string) => {
        const paramsQuery = new URLSearchParams(params.toString());

        if (!value) {
          paramsQuery.delete("search");
          router.push(`${pathname}?${paramsQuery.toString()}`);
          return;
        }

        paramsQuery.set("search", value);
        router.push(`${pathname}?${paramsQuery.toString()}`);
        return;
      },
      [params, pathname, router]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      setSearch(value);
    };

    useEffect(() => {
      handleSearch(debouncedSearch);
    }, [debouncedSearch, handleSearch]);

    return (
      <input
        type={type}
        name="search"
        onChange={handleChange}
        value={search}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
