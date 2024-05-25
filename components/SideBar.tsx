import Link from "next/link";

import { list } from "@vercel/blob";

// Reusable components
interface MenuItemProps {
  title: string;
  icon: string;
  description: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, description }) => {
  return (
    <div className="border border-gray-300 border-opacity-80 bg-white hover:bg-gray-50 text-gray-600 cursor-pointer group flex items-center gap-2 w-full pl-2 pr-3 py-2 rounded-md ">
      <div
        className="w-9 h-9 rounded-md overflow-hidden border bg-gray-100"
        style={{ flexShrink: 0 }}
      >
        {/* <img
          alt="Demo Thumbnail"
          loading="lazy"
          width={34}
          height={34}
          decoding="async"
          data-nimg="1"
          className="w-full h-full object-cover"
          src={icon}
        /> */}
      </div>
      <div className="text-sm line-clamp-2">{description}</div>
    </div>
  );
};

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  return (
    <div className="flex flex-col gap-3 mb-2">
      <div className="flex items-center justify-between group">
        <div className="flex gap-2 items-center w-full">
          <p className="font-semibold text-sm outline-none w-full text-gray-700">
            {title}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className={index === items.length - 1 ? "mb-6" : ""}>
            <MenuItem
              title={item.title}
              icon={item.icon}
              description={item.description}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

// Main component
async function Sidebar() {
  const { blobs, folders } = await list({ prefix: "temos/", mode: "folded" });

  const temos = folders.map((folder) => ({
    id: folder,
    name: folder?.split("/")[1],
  }));

  return (
    <nav className="h-full bg-white relative flex flex-col border-r border-gray-100 overflow-y-auto">
      <div className="overflow-y-auto flex-grow">
        <div className="flex w-full mx-auto px-3 pt-6 pb-8">
          <div className="flex flex-col w-full h-full text-gray-900 text-xl overflow-y-auto mb-24">
            {temos?.map((temo) => (
              <Link href={`/${temo?.name}`} key={temo?.id}>
                <MenuSection
                  title={temo?.name}
                  items={[{ title: temo?.name, icon: "", description: "" }]}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
