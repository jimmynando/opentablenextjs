import React from "react";
import Header from "./components/Header";
import SearchSideBarLoading from "./components/SearchSideBarLoading";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBarLoading />
        <div className="w-5/6">
          <div className="animate-pulse bg-slate-200 w-21 h-3 overflow-hidden border cursor-pointer"></div>
        </div>
      </div>
    </>
  );
}
