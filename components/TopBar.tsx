import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="z-30 flex top-0 left-0 right-0 items-center justify-between border-b border-gray-100 h-16  bg-white px-4 sm:px-6 lg:px-8 ">
      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold hidden sm:block">
          Interactive Temo Onboarding
        </p>
      </div>
      <div className="flex mt-0 lg:ml-4">
        <span className="sm:ml-3">
          <Link href="/showcases">
            <div className="inline-flex items-center px-4 py-1.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create showcase
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
