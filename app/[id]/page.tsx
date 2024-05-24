import TemoPlayer from "@/components/TemoPlayer";
import { list } from "@vercel/blob";

import { Editor } from "novel";

const getArticle = async (url: string) => {
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
    events: null,
    articles: [],
  };
  blobs.forEach((blob) => {
    if (blob.pathname.endsWith(".json")) {
      temo.events = blob.url;
    }
    if (blob.pathname.endsWith(".md")) {
      let lang = blob.pathname.split("/")[-1]?.split(".")[0];
      temo.articles.push({
        lang,
        url: blob.url,
      });
    }
  });
  return temo;
};

export default async function Temo({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  let temosWithPaths = await fetchFilePaths(params.id);
  let article = await getArticle(temosWithPaths.articles[0].url);

  return (
    <div className="col-span-10 p-4 items-center w-full flex flex-col">
      <TemoPlayer key={temosWithPaths.id} eventsPath={temosWithPaths.events} />
      <div className="mt-10">
        <Editor completionApi="" defaultValue={article} />
      </div>
    </div>
  );
}
