import TopBar from "@/components/TopBar";

import SideBar from "@/components/SideBar";

export default async function Page() {
  return (
    <main className="">
      <TopBar />

      <div className="grid grid-cols-12 gap-4">
        <SideBar />

        {/* <Temos temos={temos} /> */}
      </div>
    </main>
  );
}
