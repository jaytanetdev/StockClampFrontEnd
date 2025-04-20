"use client";

import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Image from "next/image";
import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import apiClient from "@/api";
import { ApiError } from "@/api/generated";
import { showNotification } from "@/utils/notification";

const Navbar = () => {
  const router = useRouter();
  const { userProfile } = useGlobalContext();

  const handlelogout = async () => {
    try {
      await apiClient.auth.authControllerLogoutV1();
      router.replace("/login");
      localStorage.removeItem("userProfile");
    } catch (e) {
      if (e instanceof ApiError) {
        showNotification("error", "ล้มเหลว", e.body?.message);
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={handlelogout}>Logout </span>,
    },
  ];

  return (
    <nav className="w-full">
      <div className="flex items-end pb-[9px] sm:pb-0 sm:items-center justify-center  border-b-2 border-blue-950 h-[88px] sm:bg-white bg-blue-950 sm:text-blue-950 text-white px-4 gap-2 relative">
        <p className="font-bold text-xl ">
          {/* {userProfile?.firstName} {userProfile?.lastName} */}
          {" JTL.Hydraulic"}
        </p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Image
                  src={userProfile?.picture ?? "/icon/profile-user.png"}
                  className=" rounded-full"
                  width={40}
                  height={40}
                  alt="User profile picture"
                />
              </Space>
            </a>
          </Dropdown>
        </div>
        {/*  */}
      </div>
    </nav>
  );
};

export default Navbar;
