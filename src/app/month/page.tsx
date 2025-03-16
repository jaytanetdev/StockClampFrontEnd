"use client";

import { memo, useState } from "react";

// 🔹 คอมโพเนนต์ที่ใช้ React.memo
type TestPageProps = {
  name: string;
};


export default function Todo() {
  const [name, setName] = useState("");
  const [testv, setTest] = useState<string>("");

  function handleUpdate() {
    console.log("🔄 Updating testv:", name);
    setTest(name); // เปลี่ยนค่า testv
  }


  return (
    <div className="p-5">
      {/* 🔹 คอมโพเนนต์ที่ใช้ React.memo */}
      <MemoizedTestPage name={testv} />

      {/* 🔹 Input และปุ่ม */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleUpdate}
        className="mt-3 p-2 bg-blue-500 text-white border rounded"
      >
        Update Name
      </button>
    </div>
  );
}


const TestPage = ({ name }: TestPageProps) => {
    console.log("✅ Render TestPage"); // ดูว่า render กี่ครั้ง
  
    return (
      <div className="mx-auto min-h-screen w-full flex flex-col gap-10 my-10">
        <h1 className="text-xl font-bold">Test Component</h1>
        <p className="text-lg">Name: {name}</p>
      </div>
    );
  };
  
  // 🔹 ใช้ memo เพื่อป้องกันการเรนเดอร์ซ้ำ
  const MemoizedTestPage = memo(TestPage);
  
