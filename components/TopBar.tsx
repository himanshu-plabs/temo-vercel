import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="z-30 flex top-0 left-0 right-0 items-center justify-between border-b border-gray-100 h-16  bg-white px-4 sm:px-6 lg:px-8 ">
      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold hidden sm:block">Temo</p>
      </div>
      <div className="flex mt-0 lg:ml-4"></div>
    </div>
  );
};

export default TopBar;
