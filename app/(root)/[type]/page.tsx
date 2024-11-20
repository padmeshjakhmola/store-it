import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";
import {
  convertFileSize,
  getFileTypesParams,
  getUsageSummary,
} from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import { Models } from "node-appwrite";
import React from "react";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  const [totalSpace] = await Promise.all([getTotalSpaceUsed()]);
  const usageSummary = getUsageSummary(totalSpace);

  const totalSpaceForTypes =
    usageSummary.find((item) => item.title.toLowerCase() === type.toLowerCase())
      ?.size || 0;

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total:{" "}
            <span className="h5">{convertFileSize(totalSpaceForTypes)}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort By:</p>

            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploded</p>
      )}
    </div>
  );
};

export default Page;
