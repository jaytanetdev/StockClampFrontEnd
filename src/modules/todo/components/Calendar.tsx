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
        initialView={"dayGridMonth"} 
        events={eventTodo ?? undefined}
        dayCellClassNames={(args) => {
          const today = new Date();
          const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
          
          if (args.dateStr === currentDate) {
            return ['today-cell']; 
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
