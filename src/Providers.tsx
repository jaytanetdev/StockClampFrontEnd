"use client";

import React from "react";
import { GlobalProvider } from "./contexts/GlobalContext";
import { UserProvider } from "./contexts/UserContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <UserProvider>
       {children}
      </UserProvider>
    </GlobalProvider>
  );
}

