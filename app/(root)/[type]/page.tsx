import AllFiles from "@/components/AllFiles";
import { getFileTypesParams } from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import React from "react";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  // const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  return (
    <div className="page-container">
      {/* sort={sort} */}
      <AllFiles searchText={searchText}  types={types} type={type} />
    </div>
  );
};

export default Page;
