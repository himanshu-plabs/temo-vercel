export default async function Page({}) {
  return (
    <main className="">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to Temo</h1>
            <p className="text-md">
              Temo is a platform that allows you to create and manage your
              content in a simple and intuitive way.
            </p>
            <p className="text-md">
              Select a Temo from the sidebar to get started.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
