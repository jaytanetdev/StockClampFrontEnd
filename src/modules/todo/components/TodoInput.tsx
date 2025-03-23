"use client";
import { useState, useEffect, useMemo } from "react";
import { useTodoList } from "@/contexts/TodoContext";
import dayjs from "dayjs";
import { Form, FormProps, Skeleton } from "antd";
import apiClient from "@/api";
import ButtonCustom from "@/components/Button/ButtonCustom";
import InputCustom from "@/components/Input/InputCustom";
import RangePickerCustom from "@/components/Date/RangePickerCustom";
import { TodoFormFields } from "@/types/todolist";
import { useForm } from "antd/es/form/Form";
import { showNotification } from "@/utils/notification";
import { ApiError } from "@/api/generated";

const TodoInput = () => {
  const { addTodoList, pendingTodoList } = useTodoList();
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pendingTodoList) {
      setIsLoading(false);
    }
  }, [pendingTodoList]);

  const initialValues = useMemo<TodoFormFields>(
    () => ({
      dateTodo: [dayjs(), dayjs()],
      title: "",
    }),
    []
  );

  const onFinish: FormProps<TodoFormFields>["onFinish"] = async (values) => {
    const date = values.dateTodo;
    try {
      const result = await apiClient.todo.todoControllerCreateV1({
        dateTodoStart: date?.[0]
          ? date[0].toISOString()
          : new Date().toISOString(),
        dateTodoEnd: date?.[1]
          ? date[1].toISOString()
          : new Date().toISOString(),
        title: values.title,
      });

      if (result.success) {
        addTodoList(result.result);
        form.setFieldsValue({ title: "" });
        showNotification("success", "สำเร็จ", "บันทึกสำเร็จ");
      }
    } catch (e) {
      if (e instanceof ApiError) {
        showNotification("error", "ล้มเหลว", e.body?.message);
      }
    }
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="horizontal"
      autoComplete="off"
    >
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 w-full mx-auto">
        <div className="w-full md:w-2/5 ">
          <RangePickerCustom
            label="วันที่"
            name="dateTodo"
            className="w-full h-10"
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            formItemProps={{
              rules: [{ required: true, message: "กรุณาเลือก วันที่" }],
            }}
          />
        </div>

        <div className="w-full md:w-2/5">
          <InputCustom
            classLabel="text-white"
            name="title"
            label="รายการที่ต้องทำ"
            placeholder="กรุณากรอก รายการที่ต้องทำ"
            allowClear
            className="w-full h-10"
            formItemProps={{
              rules: [{ required: true, message: "กรุณากรอก รายการที่ต้องทำ" }],
            }}
          />
        </div>
        <div className="md:w-1/5">
          <ButtonCustom
            type="primary"
            htmlType="submit"
            className="w-full h-10"
          >
            {"บันทึกรายการ"}
          </ButtonCustom>
        </div>
      </div>
    </Form>
  );
};

export default TodoInput;
