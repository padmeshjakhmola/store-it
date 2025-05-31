"use client";

import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import Card from "./Card";
import { Models } from "node-appwrite";
import {
  AllFilesResponseType,
  AllFilesType,
  TotalSpaceUsedType,
} from "@/types";
import { sortTypes } from "@/constants";

const AllFiles = ({ searchText, types, type }: AllFilesType) => {
  const [loding, setLoding] = useState(true);

  const [totalSpace, setTotalSpace] = useState<TotalSpaceUsedType | null>(null);
  const [allFiles, setAllFiles] = useState<AllFilesResponseType | null>(null);

  const [sortState, setSortState] = useState(sortTypes[0].value);

  useEffect(() => {
    const fetchData = async () => {
      setLoding(true);
      const files = await getFiles({ types, searchText, sort: sortState });
      const totalSpaceUsed = await getTotalSpaceUsed();
      setAllFiles(files);
      setTotalSpace(totalSpaceUsed);
      setLoding(false);
    };

    fetchData();
  }, [searchText, sortState, types]);

  const usageSummary = getUsageSummary(totalSpace);

  const totalSpaceForTypes =
    usageSummary.find((item) => item.title.toLowerCase() === type.toLowerCase())
      ?.size || 0;

  return (
    <>
      {loding ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center">
          <div
            className="size-10 animate-spin rounded-full border-4 border-t-transparent"
            style={{
              borderColor: "rgba(250, 114, 117, 0.3)",
              borderTopColor: "#FA7275",
            }}
            aria-label="Loading spinner"
          ></div>
          <p className="mt-4 text-lg font-medium text-[#FA7275]">Loading...</p>
        </div>
      ) : (
        <>
          <section className="w-full">
            <h1 className="h1 capitalize">{type}</h1>

            <div className="total-size-section">
              <p className="body-1">
                Total:{" "}
                <span className="h5">
                  {convertFileSize(totalSpaceForTypes)}
                </span>
              </p>

              <div className="sort-container">
                <p className="body-1 hidden text-light-200 sm:block">
                  Sort By:
                </p>
                <Sort sort={sortState} setSort={setSortState} />
              </div>
            </div>
          </section>

          {allFiles && allFiles.total > 0 ? (
            <section className="file-list">
              {allFiles.documents.map((file: Models.Document) => (
                <Card key={file.$id} file={file} />
              ))}
            </section>
          ) : (
            <p className="empty-list">No files uploaded</p>
          )}
        </>
      )}
    </>
  );
};

export default AllFiles;
