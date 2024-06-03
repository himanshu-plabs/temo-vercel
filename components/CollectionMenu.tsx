import Link from "next/link";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function CollectionMenu({ collections, publishedTemos }: any) {
  return Object.entries(collections)?.map(([key, value], index) => (
    <AccordionItem value={`${key}`} key={key}>
      <AccordionTrigger className="w-full text-left font-semibold text-lg">
        {value as string}
      </AccordionTrigger>
      <AccordionContent>
        <nav className="space-y-4 w-full">
          {publishedTemos
            ?.filter((temo: any) => {
              return temo?.folderId == Number(key);
            })
            ?.map((temo: any) => (
              <div
                className="hover:bg-primary/20 w-full p-2 rounded-md"
                key={temo?.id}
              >
                <Link href={`/${temo?.sessionId}`} key={temo?.id}>
                  {temo?.title}
                </Link>
              </div>
            ))}
        </nav>
      </AccordionContent>
    </AccordionItem>
  ));
}
