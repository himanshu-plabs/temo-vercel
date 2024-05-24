import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <TopBar />

      <div className="grid grid-cols-12 gap-4">
        <SideBar />
        {children}
      </div>
    </main>
  );
}
