"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const menu = [
    {
      label: (
        <div className="flex flex-col items-center ">
          <span> DASH </span> <span> BOARD</span>
        </div>
      ),
      href: "/dashboard",
      className: "w-[57px]",
    },
    {
      label: "PRODUCT",
      href: "/product",
      className: "w-[89px]",
    },
    {
      label: "ORDER",
      href: "/order",
      className: "w-[56px]",
    },
    {
      label: "REPORT",
      href: "/report",
      className: "w-[66px]",
    },
  ];

  return (
    <footer className="w-full block sm:hidden">
      <div className="bg-blue-950 flex justify-around items-center h-[104px] w-full">
        {menu.map((item, index) => {
          return (
            <div key={index}>
              <Link
                href={item.href}
                className={`flex  gap-3 text-lg font-medium ${
                  pathname === item.href
                    ? "text-[#16275E] bg-[#FFFFFFD6] p-[10px] rounded-xl "
                    : "hover:text-yellow-400 text-white"
                }`}
              >
                <span className={` font-bold text-lg `}>{item.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
