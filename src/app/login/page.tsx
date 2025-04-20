"use client";

import ButtonCustom from "@/components/Button/ButtonCustom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@ant-design/v5-patch-for-react-19";

export default function LoginUI() {
  const routes = useRouter();

  const handleLoginLine = () => {
    const baseURL = process.env.NEXT_PUBLIC_API;
    routes.replace(`${baseURL}/api/v1/auth/google`);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
      <div className="bg-white flex  rounded-lg shadow-lg  ">
        <div className="flex flex-col justify-center  items-center p-10 px-16 space-y-6 space-x-4 ">
          <Image
            className="object-contain"
            src="/logo/logo2.png"
            alt="Logo"
            width={128}
            height={128}
          />
          <span className="text-2xl font-semibold text-black text-center">
            Login to JTL.Hydraulic
          </span>

          <ButtonCustom onClick={handleLoginLine} type="primary" className='h-10 bg-[#1A237E]'>
          <Image src='/icon/google.png' alt='icon-google' width={15} height={15} /> Login to Google
          </ButtonCustom>
        </div>

        <div className="relative">
          <Image
            className="w-[400px] h-full hidden md:block rounded-r-lg object-cover"
            src="/login/developer.jpg"
            alt="Developer Image"
            width={400}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
