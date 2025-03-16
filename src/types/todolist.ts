import { Dayjs } from "dayjs";

export type TodoFormFields = {
  dateTodo?: [Dayjs, Dayjs];
  title: string;
};
