'use client'
import React from "react";
import { Spin } from "antd";
import { useGlobal } from "@/contexts/GlobalContext";

const LoadingCustom: React.FC = () => {
  const { isLoading } = useGlobal();

  if (!isLoading) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-gray-700 bg-opacity-50">
      <Spin size="large" />
    </div>
  );
};

export default LoadingCustom;
