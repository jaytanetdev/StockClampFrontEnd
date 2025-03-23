"use client";

import { useEffect, useState } from "react";
import { ApiError, UserResponseAutuDto } from "@/api/generated";
import apiClient from "@/api";
import { useRouter } from "next/navigation";
import { showNotification } from "@/utils/notification";
import { LogoutOutlined } from "@ant-design/icons";

const Navbar = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<
    UserResponseAutuDto | undefined
  >(undefined);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  const handlelogout = async () => {
    try {
      await apiClient.authentication.authControllerLogoutV1();
      router.replace("/login");
      localStorage.removeItem("userProfile");
    } catch (e) {
      if (e instanceof ApiError) {
        showNotification("error", "ล้มเหลว", e.body?.message);
      }
    }
  };
  return (
    <nav>
      <div className="flex items-center justify-end bg-blue-950 h-[60px]   text-white px-4 gap-2">
        <p>
          {userProfile?.firstName} {userProfile?.lastName}
        </p>
        <LogoutOutlined onClick={handlelogout} className="text-red-600" />
      </div>
    </nav>
  );
};

export default Navbar;
