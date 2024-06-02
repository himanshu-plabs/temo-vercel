import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import SideBar from "@/components/SideBar";
import { Inter as FontSans } from "next/font/google";
import CommandMenu from "@/components/CommandMenu";
import { myStore } from "@/lib/atoms";
import { Provider } from "jotai";

export const metadata: Metadata = {
  title: "Temo",
  description: "Temo",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <CommandMenu />
            <TopBar />
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-64px)]">
              <div className="col-span-2 h-full">
                <SideBar />
              </div>
              <div className="col-span-10 h-full overflow-auto">{children}</div>
            </div>
          </Provider>
        </body>
      </ThemeProvider>
    </html>
  );
}
