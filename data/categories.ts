import {
  FaCamera,
  FaDesktop,
  FaGamepad,
  FaHeadphones,
  FaMobileAlt,
} from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { Categories } from "@/src/types/categories";

export const categories: Categories[] = [
  {
    title: "Phones",
    icon: FaMobileAlt,
  },
  {
    title: "Computers",
    icon: FaDesktop,
  },
  {
    title: "SmartWatch",
    icon: MdWatch,
  },
  {
    title: "Camera",
    icon: FaCamera,
  },
  {
    title: "HeadPhones",
    icon: FaHeadphones,
  },
  {
    title: "Gaming",
    icon: FaGamepad,
  },
];
