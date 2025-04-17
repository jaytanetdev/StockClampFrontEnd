"use client";

import {
  BarChartOutlined,
  BellOutlined,
  ContainerOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <BarChartOutlined />,
  },
  {
    label: "Product",
    href: "/product",
    icon: <ProductOutlined />,
  },
  {
    label: "Order",
    href: "/order",
    icon: <BellOutlined />,
  },
  {
    label: "Report",
    href: "/report",
    icon: <ContainerOutlined />,
  },
];

const SideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  return (
    
    <aside className="bg-blue-950  min-h-screen overflow-hidden  w-[300px] text-white px-4  flex-col gap-6 duration-300 hidden sm:flex">
      <div className="flex justify-center mt-3">
        <Image
          className="object-contain"
          src="/logo/logo2.png"
          alt="Logo"
          width={90}
          height={90}
        />
      </div>
      {menu.map((item, index) => {
        return (
          <div key={index} className="px-4">
            <Link
              href={item.href}
              className={`flex gap-3 text-lg font-medium ${
                pathname === item.href
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
              }`}
            >
              <span className="flex gap-3 font-medium">
                {item.icon} {item.label}
              </span>
            </Link>
          </div>
        );
      })}
    </aside>
  );
};

export default SideBar;
