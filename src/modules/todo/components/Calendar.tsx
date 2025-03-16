"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // สำหรับ Time Grid View
import { useEffect, useMemo, useState } from "react";
import { useTodoList } from "@/contexts/TodoContext";

export function Calendar() {
  const { todosList, pendingTodoList } = useTodoList();

  const eventTodo = useMemo(() => {
    return todosList.map((item) => ({
      title: item.title,
      start: item.dateTodoStart,
      end: item.dateTodoEnd,
    }));
  }, [todosList]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"dayGridMonth"} // หรือ timeGridWeek, dayGridDay ตามที่ต้องการ
        events={eventTodo ?? undefined}
        dayCellClassNames={(args) => {
          // ตรวจสอบว่าเซลล์ที่กำลังจะถูก render คือวันที่ปัจจุบันหรือไม่
          const today = new Date();
          const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
          
          if (args.dateStr === currentDate) {
            return ['today-cell']; // เพิ่มคลาส 'today-cell' สำหรับเซลล์ที่ตรงกับวันที่ปัจจุบัน
          }
          return [];
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}
