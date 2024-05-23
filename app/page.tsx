import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import TemoPlayer from "@/components/Temo";
import path from "path";
import fs from "fs/promises";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

async function getData(): Promise<{
  recordedEvents: any[];
  mdxSource: MDXRemoteSerializeResult;
}> {
  const eventsData = await fetch(
    "https://raw.githubusercontent.com/himanshu-plabs/temo-guides/main/guides/103/events.json"
  );

  const eventsArray = await eventsData.json();

  const recordedEvents = eventsArray;

  // Fetch the article text
  // const articleText = await fs.readFile(articleFilePath);
  const articleText = `# How to Find Tim Cook on Apple.com
  This document describes how to find the profile of Apple CEO, Tim Cook, on the Apple website.
  
  ## Step 1: Access the Apple Website
  Open your web browser and navigate to the Apple website.
  
  ## Step 2: Navigate to the Site Map
  Click the **Support** tab in the menu bar. Then, click the **"Or see our site map"** link, which appears at the bottom of the "Page Not Found" page.
  
  ## Step 3: Access the Apple Leadership Page
  On the Site Map, find the "About Apple" section and click on the link that reads **"Apple Leadership"**.
  
  ## Step 4: View Tim Cook's Profile
  On the "Apple Leadership" page, scroll down until you see the Executive Profiles section. Tim Cook's profile is the first one listed.
  `;

  const mdxSource = await serialize(articleText);

  return {
    recordedEvents,
    mdxSource,
  };
}

export default async function Page() {
  const { recordedEvents, mdxSource } = await getData();
  return (
    <main className="">
      <TopBar />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 p-4">
          <TemoPlayer recordedEvents={recordedEvents} />

          <div className="w-full h-full">
            himmanshu
            <MDXRemote source={mdxSource} />
          </div>
        </div>
      </div>
    </main>
  );
}
