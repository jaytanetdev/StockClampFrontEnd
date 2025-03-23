import type { Metadata } from "next";
import dynamic from "next/dynamic";
const TodoListPage = dynamic(() => import("@/modules/todo/TodoPage"), {
  ssr: true,
});

export const metadata: Metadata = {
  title:
    "To-Do List ออนไลน์ ใช้งานฟรี ไม่มีค่าใช้จ่าย จัดการงานง่ายๆ ได้ทุกวัน",
  description:
    "ใช้งาน To-Do List ออนไลน์ฟรี ไม่มีค่าใช้จ่าย จดบันทึกสิ่งที่ต้องทำ จัดลำดับความสำคัญ ใช้งานง่าย รองรับภาษาไทยทั้งมือถือและคอม",
};

export default function Todo() {
  return (
    <div className=" px-5 md:px-1 py-10">
      <TodoListPage />
    </div>
  );
}
