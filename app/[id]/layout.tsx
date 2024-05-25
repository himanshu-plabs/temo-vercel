import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={inter.className}>
      <TopBar />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </body>
  );
}
