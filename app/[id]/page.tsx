import TemoPlayer from "@/components/TemoPlayer";
import { list } from "@vercel/blob";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

const fetchArticle = async (url: string) => {
  if (!url) {
    return "";
  }
  const response = await fetch(url);

  const text = await response.text();
  return text;
};

const fetchFilePaths = async (url: string) => {
  const { blobs } = await list({
    prefix: `temos/${decodeURIComponent(url)}`,
  });
  let temo: any = {
    id: url,
    eventsFileUrl: null,
    articles: [],
  };
  blobs
    ?.sort((a: any, b: any) => a.uploadedAt - b.uploadedAt)
    .forEach((blob: any) => {
      if (blob.pathname.endsWith("events.json")) {
        temo.eventsFileUrl = blob.url;
      }

      if (blob.pathname.endsWith(".md")) {
        let lang = blob.pathname.split("/").pop()?.split(".")[0];
        temo.articles.push({
          lang,
          url: blob.url,
        });
      }
    });
  return temo;
};

const extractHeadings = (markdown: string) => {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings: { text: string; id: string }[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children.map((child: any) => child.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    headings.push({ text, id });
  });

  return headings;
};

export default async function Temo({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  let temosWithPaths = await fetchFilePaths(params.id);
  let article = await fetchArticle(temosWithPaths?.articles[0]?.url);
  // const headings = extractHeadings(article);
  return (
    <Tabs
      orientation="vertical"
      defaultValue="article"
      className="w-full justify-center items-center pt-4 pr-4"
    >
      <TabsList className="">
        <TabsTrigger value="article">Article</TabsTrigger>
        <TabsTrigger value="player">Player</TabsTrigger>
      </TabsList>
      <TabsContent
        value="article"
        className="overflow-auto h-[calc(100vh-160px)]"
      >
        <ReactMarkdown className="w-full border border-gray-400/20 rounded-md p-8 shadow-sm mb-4 article ">
          {article}
        </ReactMarkdown>
      </TabsContent>
      <TabsContent value="player">
        <TemoPlayer
          key={temosWithPaths?.id}
          eventsPath={temosWithPaths?.eventsFileUrl}
        />
      </TabsContent>
    </Tabs>
  );
}
