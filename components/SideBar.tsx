import React from "react";

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
        <img
          alt="Demo Thumbnail"
          loading="lazy"
          width={34}
          height={34}
          decoding="async"
          data-nimg="1"
          className="w-full h-full object-cover"
          src={icon}
        />
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
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className={index === items.length - 1 ? "mb-6" : ""}>
            <MenuItem
              title={item.title}
              icon={item.icon}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const SideMenu: React.FC = () => {
  const menuSections = [
    {
      title: "INTRODUCTION",
      items: [
        {
          title: "Tips from the CEO",
          icon: "https://d2vsad3r6ug0tf.cloudfront.net/clf7r5s6900giyy0h6trezsck/rxE7emgfjJU5q9ZSd2.png",
          description: "Tips from the CEO",
        },
        {
          title: "Overview of Temo Dashboard",
          icon: "https://d2vsad3r6ug0tf.cloudfront.net/clf7r5s6900giyy0h6trezsck/A5Jexd7cSqO2ebLKWa.png",
          description: "Overview of Temo Dashboard",
        },
      ],
    },
    // ... (other menu sections)
    {
      title: "ADDITIONAL SECTION 1",
      items: [
        {
          title: "Item 1",
          icon: "https://via.placeholder.com/34",
          description: "This is item 1 in the additional section 1",
        },
        {
          title: "Item 2",
          icon: "https://via.placeholder.com/34",
          description: "This is item 2 in the additional section 1",
        },
      ],
    },
    {
      title: "ADDITIONAL SECTION 2",
      items: [
        {
          title: "Item 1",
          icon: "https://via.placeholder.com/34",
          description: "This is item 1 in the additional section 2",
        },
        {
          title: "Item 2",
          icon: "https://via.placeholder.com/34",
          description: "This is item 2 in the additional section 2",
        },
        {
          title: "Item 3",
          icon: "https://via.placeholder.com/34",
          description: "This is item 3 in the additional section 2",
        },
      ],
    },
  ];

  return (
    <nav className="h-full bg-white relative flex flex-col border-r border-gray-100 overflow-y-auto">
      <div className="overflow-y-auto flex-grow">
        <div className="flex w-full mx-auto px-3 pt-6 pb-8">
          <div className="flex flex-col w-full h-full text-gray-900 text-xl overflow-y-auto mb-24">
            {menuSections.map((section, index) => (
              <MenuSection
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
