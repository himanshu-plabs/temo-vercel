import { list } from "@vercel/blob";
import { Accordion } from "@/components/ui/accordion";
import { allTemosAtom, allCollectionsAtom } from "@/lib/atoms";
import { useHydrateAtoms } from "jotai/utils";
import { CollectionMenu } from "./CollectionMenu";
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
    <nav className="h-full relative flex flex-col border-r border-gray-400/20 overflow-y-auto space-y-4 p-4">
      <Accordion
        type="multiple"
        defaultValue={Object.keys(collections)}
        className="w-full border-none"
      >
        <CollectionMenu
          collections={collections}
          publishedTemos={publishedTemos}
        />
      </Accordion>
    </nav>
  );
};

async function getTemos(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

export default Sidebar;
