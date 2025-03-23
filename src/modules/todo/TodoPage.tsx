import dynamic from "next/dynamic";
import { Calendar } from "./components/Calendar";
const TodoInput = dynamic(() => import("./components/TodoInput"), {
  ssr: true,
});



const TodoPage = () => {
  return (
    <>
      <div className=" mx-auto min-h-scree w-full flex flex-col gap-10 my-10">
        <div>
          <TodoInput />
        </div>
        <div>
          <Calendar/>
        </div>
      </div>
    </>
  );
};
export default TodoPage;
