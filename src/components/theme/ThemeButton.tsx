"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, Dropdown, Menu } from "antd";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  // กำหนด label ตามค่าปัจจุบัน
  const getLabel = (theme: string | undefined) => {
    switch (theme) {
      case "light":
        return "☀️ Light";
      case "dark":
        return "🌙 Dark";
      default:
        return "🖥 System";
    }
  };

  const menu = (
    <Menu
      items={[
        { key: "light", label: "☀️ Light", onClick: () => setTheme("light") },
        { key: "dark", label: "🌙 Dark", onClick: () => setTheme("dark") },
        { key: "system", label: "🖥 System", onClick: () => setTheme("system") },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} >
      <Button>
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="ml-2">{getLabel(theme)}</span>
      </Button>
    </Dropdown>
  );
}
