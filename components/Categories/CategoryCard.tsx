import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  active?: boolean;
};

export default function CategoryCard({ title, icon, active }: Props) {
  return (
    <div
      className={`group flex flex-col items-center justify-center w-40 h-32 border rounded-lg cursor-pointer transition
      ${active ? "bg-[#DB4444] text-white" : "bg-white hover:bg-[#DB4444]"}`}
    >
      {/* ICON */}
      <div
        className={`text-3xl mb-2 transition
        ${active ? "text-white" : "text-black group-hover:text-white"}`}
      >
        {icon}
      </div>

      {/* TITLE */}
      <p
        className={`text-sm font-medium transition
        ${active ? "text-white" : "text-black group-hover:text-white"}`}
      >
        {title}
      </p>
    </div>
  );
}
