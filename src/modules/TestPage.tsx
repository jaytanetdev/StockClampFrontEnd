"use client";

import { memo } from "react";

type TestPageProps = {
  name: string;
};
const TestPage =  ({ name }: TestPageProps) => {
  console.log(name);
  console.log("Render TestPage")
  return (
    <>
      <div className=" mx-auto min-h-scree w-full flex flex-col gap-10 my-10">
        {name}
      </div>
    </>
  );
};
export default memo(TestPage);
