"use client";

import { ApiError } from "@/api/generated";
import apiClient from "@/api";
import { useRouter } from "next/navigation";
import { showNotification } from "@/utils/notification";
import { LogoutOutlined } from "@ant-design/icons";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Image from "next/image";

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
      <div className="flex items-end pb-[9px] sm:pb-0 sm:items-center justify-center  border-b-2 border-blue-950 h-[88px] sm:bg-white bg-blue-950 sm:text-blue-950 text-white px-4 gap-2 relative">
        <p className="font-bold text-xl ">
          {/* {userProfile?.firstName} {userProfile?.lastName} */}
          {" JTL.Hydraulic"}
        </p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Image
            src={userProfile?.picture ?? "/default-avatar.png"}
            className=" rounded-full"
            width={40}
            height={40}
            alt="User profile picture"
          />
        </div>
        {/* <LogoutOutlined onClick={handlelogout} className="text-red-600" /> */}
      </div>
    </nav>
  );
};

export default Navbar;
