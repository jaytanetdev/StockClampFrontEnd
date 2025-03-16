"use client";

import React from "react";
import { TodoListProvider } from "@/contexts/TodoContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TodoListProvider>{children}</TodoListProvider>;
}
