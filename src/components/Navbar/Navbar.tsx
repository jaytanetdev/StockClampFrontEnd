"use client";

import { useEffect, useState } from "react";
import { ApiError, GetUserResultDto } from "@/api/generated";
import apiClient from "@/api";
import { useRouter } from "next/navigation";
import { showNotification } from "@/utils/notification";
import { LogoutOutlined } from "@ant-design/icons";
import { useGlobalContext } from "@/contexts/GlobalContext";

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
  return (
    <nav className="w-full">
      <div className="flex items-center justify-end  border-b-2 border-blue-950 h-[80px]   text-blue-950 px-4 gap-2">
        <p className="font-semibold">
          {userProfile?.firstName} {userProfile?.lastName}
        </p>
        <LogoutOutlined onClick={handlelogout} className="text-red-600" />
      </div>
    </nav>
  );
};

export default Navbar;
