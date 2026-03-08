import {LayoutDashboard, List, Coins, Wallet, FunnelPlus} from "lucide-react";

export const SIDEBAR_DATA = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard"
  },
  {
    id: 2,
    title: "Categories",
    icon: List,
    link: "/category"
  },
  {
    id: 3,
    title: "Expenses",
    icon: Coins,
    link: "/expense"
  },
  {
    id: 4,
    title: "Incomes",
    icon: Wallet,
    link: "/income"
  },
  {
    id: 5,
    title: "Filters",
    icon: FunnelPlus,
    link: "/filter"
  }
];
