"use client";

import apiClient from "@/api";
import { CreateTodoResultDto } from "@/api/generated";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useTransition,
} from "react";

interface TodoListContextType {
  todosList: CreateTodoResultDto[];
  fetchTodos?: () => void;
  addTodoList: ({ id,title, dateTodoStart, dateTodoEnd }: CreateTodoResultDto) => void;
  removeTodoList: (id: string) => void;
  pendingTodoList:boolean
}

const TodoListContext = createContext<TodoListContextType | undefined>(
  undefined
);
export const TodoListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todosList, setTodosList] = useState<CreateTodoResultDto[]>([]);
  const [pendingTodoList, fectPendingTodoList] = useTransition();
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.todo.todoControllerFindOneV1(
          "cffab042-49ed-43dc-80fa-7ed78c79eacd"
        );
        if (response.success) {
          setTodosList(response.result);
        }
      } catch (error) {
        console.error("Failed to load todos:", error);
      }
    };
    fectPendingTodoList(fetchTodos);
  }, []);

  const addTodoList = (todoItem: CreateTodoResultDto): void => {
    setTodosList([...todosList, todoItem]);
  };

  const removeTodoList = (id: string) => {
    setTodosList(todosList.filter((todosList) => todosList.id !== id));
  };

  return (
    <TodoListContext.Provider
      value={{ todosList, addTodoList, removeTodoList ,pendingTodoList}}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = (): TodoListContextType => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("useTodoList must be used within a TodoListProvider");
  }
  return context;
};
