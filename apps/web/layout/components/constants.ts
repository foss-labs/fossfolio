import { FiHome, FiUser, FiSettings, FiBarChart } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";

export const ROUTES = [
  {
    name: "Event",
    icon: FiHome,
  },
  {
    name: "Participants",
    icon: FiUser,
  },
  {
    name: "Form",
    icon: FaWpforms,
  },
  {
    name: "Tasks",
    icon: BsPeople,
  },
  {
    name: "Revenue",
    icon: FiBarChart,
  },
  {
    name: "Settings",
    icon: FiSettings,
  },
];

export const FORM_BUILDER_ROUTES = [
  {
    name: "Builder",
    icon: FiHome,
  },
  {
    name: "Responses",
    icon: FiUser,
  },
  {
    name: "Analytics",
    icon: FaWpforms,
  },
];
