import Link from "next/link";
import { list } from "@vercel/blob";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Main component
const Sidebar: React.FC = async () => {
  const fetchTemos = async (): Promise<any> => {
    const { blobs } = await list({ prefix: "temos/", mode: "folded" });
    const temoDetails = blobs
      ?.sort((a: any, b: any) => b?.uploadedAt - a?.uploadedAt)
      ?.find((blob: any) => blob.pathname.endsWith("temos.json"));
    if (!temoDetails?.url) {
      return [];
    }
    const allTemos = await getTemos(temoDetails?.url);
    const publishedTemos = allTemos?.filter((temo: any) => temo?.isPublished);
    let collections = {};
    publishedTemos?.forEach((temo: any) => {
      // @ts-ignore
      if (temo?.folderId && !collections[temo?.folderId]) {
        // @ts-ignore
        collections[temo?.folderId] = temo?.folderName;
      }
    });

    return { publishedTemos, collections };
  };

  const { publishedTemos, collections } = await fetchTemos();

  return (
    <nav className="h-full bg-white relative flex flex-col border-r border-gray-100 overflow-y-auto space-y-4 p-4">
      {Object.entries(collections).map(([key, value], index) => (
        <Collapsible
          key={key}
          defaultOpen={true}
          className={`${index === 0 ? "" : "border-t border-gray-100"} pt-4`}
        >
          <CollapsibleTrigger className="w-full text-left font-semibold text-lg">
            {value as string}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="space-y-4 w-full ">
              {publishedTemos
                ?.filter((temo: any) => {
                  return temo?.folderId == Number(key);
                })
                ?.map((temo: any) => (
                  <div
                    className="hover:bg-gray-100 rounded-md w-full p-2"
                    key={temo?.id}
                  >
                    <Link href={`/${temo?.sessionId}`} key={temo?.id}>
                      {temo?.title}
                    </Link>
                  </div>
                ))}
            </nav>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  );
};

export default Sidebar;

async function getTemos(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}
