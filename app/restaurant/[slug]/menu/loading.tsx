import React from "react";

export default function Loading() {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <nav className="flex text-reg border-b pb-2">
        <h4 className="mr-7">Overview</h4>
        <p className="mr-7">Menu</p>
      </nav>
      <div className="mt-4 pb-1 mb-1">
        <h1 className="font-bold text-4xl">Menu</h1>
      </div>
      <div className="mt-4 border-b pb-6 animate-pulse bg-slate-200 w-[400px] h-16 rounded"></div>

      <div className="flex items-end animate-pulse">
        <div className="ratings mt-2 flex items-center">
          <div className="flex items-center bg-slate-200 w-56"></div>
          <p className="text-reg ml-3"></p>
        </div>
        <div>
          <p className="text-reg ml-1 ml-4"></p>
        </div>
      </div>
    </div>
  );
}
