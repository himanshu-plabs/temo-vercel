import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
const TopBar = () => {
  return (
    <div className="z-30 flex top-0 left-0 right-0 items-center justify-between border-b border-gray-100 h-16  bg-white px-4 sm:px-6 lg:px-8 ">
      <Link href="/">
        <p className="text-lg font-semibold hidden sm:block">Temo</p>
      </Link>

      <div className="flex items-center space-x-2 border border-gray-200 rounded-md">
        <Search className="w-4 h-4 mr-2" />
        <Input placeholder="Search or ask a question" className="border-none" />
      </div>
      <div>
        <Button>EN</Button>
      </div>
    </div>
  );
};

export default TopBar;
