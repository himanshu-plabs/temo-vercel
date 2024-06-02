import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import SideBar from "@/components/SideBar";
import { Inter as FontSans } from "next/font/google";

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
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <TopBar />
        <div className="grid grid-cols-12 gap-4 h-screen">
          <div className="col-span-2 h-full">
            <SideBar />
          </div>
          <div className="col-span-10 h-full overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
