import Link from "next/link";

import { list } from "@vercel/blob";

// Reusable components

const MenuSection = ({ title, isSelected = true, items }: any) => {
  return (
    <div
      className={`flex items-center justify-between group font-semibold text-sm outline-none w-full text-gray-700 p-2 ${
        isSelected ? "bg-gray-50 border-l-4 border-l-blue-500" : ""
      }`}
    >
      {title}
    </div>
  );
};

// Main component
async function Sidebar() {
  const { blobs } = await list({ prefix: "temos/", mode: "folded" });
  console.log("blobs", blobs);
  const temoDetails = blobs
    ?.sort((a: any, b: any) => {
      return b?.uploadedAt - a?.uploadedAt;
    })
    ?.find((blob: any) => {
      blob.pathname.endsWith("temos.json");
      return blob.url;
    });
  console.log("temoDetails", temoDetails);
  const allTemos = temoDetails?.url
    ? await fetch(temoDetails?.url).then((res) => res.json())
    : [];

  const publishedTemos = allTemos?.filter((temo: any) => temo?.isPublished);
  console.log("publishedTemos", publishedTemos);

  return (
    <nav className="h-full bg-white relative flex flex-col border-r border-gray-100 overflow-y-auto space-y-2">
      {publishedTemos?.map((temo: any) => (
        <Link href={`/${temo?.sessionId}`} key={temo?.id}>
          <MenuSection
            title={temo?.title}
            items={[{ title: temo?.title, icon: "", description: "" }]}
          />
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
