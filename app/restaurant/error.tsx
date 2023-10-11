"use client";

import Image from "next/image";

import errorMascot from "../../public/icons/error.png";

export default function Error({ error }: { error: Error }) {
  console.log(error);
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="Error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
        <p className="mt-6 text-reg font-bold">Error Message: {error.message}</p>
        <p className="text-sm font-light">Error Code: 400</p>
      </div>
    </div>
  );
}
