"use client";

import { GlobalProvider } from "@/contexts/GlobalContext";
import Navbar from "@/components/Navbar/Navbar";
import LoadingCustom from "@/components/LoadingCustom";
import SideBar from "@/components/SideBar/SideBar";
import "@ant-design/v5-patch-for-react-19";
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalProvider>
      <div className="flex ">
        <SideBar />
        <div className="flex flex-col w-full ">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
      <LoadingCustom />
    </GlobalProvider>
  );
};

export default ClientLayout;
