import Link from "next/link";
import { list } from "@vercel/blob";

// Main component
const Sidebar: React.FC = async () => {
  const fetchTemos = async () => {
    const { blobs } = await list({ prefix: "temos/", mode: "folded" });
    console.log("blobs", blobs);
    const temoDetails = blobs
      ?.sort((a: any, b: any) => b?.uploadedAt - a?.uploadedAt)
      ?.find((blob: any) => blob.pathname.endsWith("temos.json"));
    console.log("temoDetails", temoDetails);
    if (!temoDetails?.url) {
      return [];
    }
    const allTemos = await getTemos(temoDetails?.url);
    const publishedTemos = allTemos?.filter((temo: any) => temo?.isPublished);
    console.log("publishedTemos", publishedTemos);
    return publishedTemos;
  };

  const publishedTemos = await fetchTemos();

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
};

export default Sidebar;

interface MenuSectionProps {
  title: string;
  isSelected?: boolean;
  items: { title: string; icon: string; description: string }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  isSelected = true,
}) => {
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
async function getTemos(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}
