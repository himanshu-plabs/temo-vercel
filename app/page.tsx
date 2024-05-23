import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import TemoPlayer from "@/components/Temo";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

export default async function Page() {
  return (
    <main className="">
      <TopBar />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 p-4">
          <TemoPlayer />

          <div className="w-full h-full">himmanshu</div>
        </div>
      </div>
    </main>
  );
}
