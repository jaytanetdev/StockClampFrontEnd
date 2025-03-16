"use client";
import { useTodoList } from "@/contexts/TodoContext";
import dayjs from "dayjs";
import React from "react";

const TodoList = () => {
  const { todosList } = useTodoList();

  return (
    <div className="flex flex-col items-center justify-center px-4 container  mx-auto">
      <table className="boder w-full h-full text-center ">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">ลำดับ</th>
            <th className="border border-gray-400 p-2">รายการที่ต้องทำ</th>
            <th className="border border-gray-400 p-2">เวลา</th>
          </tr>
        </thead>
        <tbody className="border border-gray-400 p-2">
          {todosList.map((item, index) => {
            console.log(item)
            return(
            <tr key={item.id}>
              <td className="border border-gray-400 p-2">{index + 1}</td>
              <td className="border border-gray-400 p-2">{item.todo}</td>
              <td className="border border-gray-400 p-2">
                {dayjs(item.timeTodo, "HH:mm").format("HH:mm")}
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};
export default TodoList;
