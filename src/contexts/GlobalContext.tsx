"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { redirect, usePathname } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";
import apiClient from "@/api";
import { GetUserResultDto } from "@/api/generated";
type GlobalContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  userProfile: GetUserResultDto | undefined;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<GetUserResultDto | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const excludedPaths = ["/login", "/signup"];
    const fetchProfile = async () => {
      if (!excludedPaths.includes(pathname)) {
        if (!userProfile) {
          try {
            const resonse = await apiClient.user.userControllerGetProfileV1();
            setUserProfile(resonse.result);
          } catch (error) {
            redirect("/login");
          }
        }
      }
    };
    fetchProfile();
  }, [pathname]);
  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading, userProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
