import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import SideBar from "@/components/SideBar";
import { Inter as FontSans } from "next/font/google";
import { myStore } from "@/lib/atoms";
import { Provider } from "jotai";
import CommandMenu from "@/components/CommandMenu";

import { list } from "@vercel/blob";

export const metadata: Metadata = {
  title: "Temo",
  description: "Temo",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { publishedTemos, collections } = await fetchTemos();
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider store={myStore}>
            <CommandMenu
              publishedTemos={publishedTemos}
              collections={collections}
            />
            <TopBar />
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-64px)]">
              <div className="col-span-2 h-full">
                <SideBar
                  publishedTemos={publishedTemos}
                  collections={collections}
                />
              </div>
              <div className="col-span-10 h-full overflow-auto">{children}</div>
            </div>
          </Provider>
        </body>
      </ThemeProvider>
    </html>
  );
}

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

async function getTemos(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}
