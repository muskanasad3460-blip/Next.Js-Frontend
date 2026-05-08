import { FiChevronRight } from "react-icons/fi";

const categories = [
  { name: "Woman’s Fashion", hasArrow: true },
  { name: "Men’s Fashion", hasArrow: true },
  { name: "Electronics" },
  { name: "Home & Lifestyle" },
  { name: "Medicine" },
  { name: "Sports & Outdoor" },
  { name: "Baby’s & Toys" },
  { name: "Groceries & Pets" },
  { name: "Health & Beauty" },
];

export default function Sidebar() {
  return (
    <div className="py-6 px-4 space-y-1">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <span className="text-sm">{cat.name}</span>

          {cat.hasArrow && <FiChevronRight className="text-gray-500" />}
        </div>
      ))}
    </div>
  );
}
