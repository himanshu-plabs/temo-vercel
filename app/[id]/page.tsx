import TemoPlayer from "@/components/TemoPlayer";
import { list } from "@vercel/blob";

import { Editor } from "novel";

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
    events: null,
    articles: [],
  };
  blobs
    ?.sort((a: any, b: any) => a.uploadedAt - b.uploadedAt)
    .forEach((blob: any) => {
      console.log({
        pathname: blob.pathname,
        url: blob.url,
      });
      if (blob.pathname.endsWith("events.json")) {
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
  let article = await fetchArticle(temosWithPaths?.articles[0]?.url);

  return (
    <div className="col-span-10 p-4 items-center w-full flex flex-col">
      <TemoPlayer
        key={temosWithPaths?.id}
        eventsPath={temosWithPaths?.events}
      />
      <div className="mt-10">
        <Editor completionApi="" defaultValue={article} />
      </div>
    </div>
  );
}
