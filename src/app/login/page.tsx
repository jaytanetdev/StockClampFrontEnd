"use client";

import apiClient from "@/api";
import { ApiError, LoginRequestDto } from "@/api/generated";
import ButtonCustom from "@/components/Button/ButtonCustom";
import InputCustom from "@/components/Input/InputCustom";
import { useGlobal } from "@/contexts/GlobalContext";
import { showNotification } from "@/utils/notification";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginUI() {
  const { setIsLoading } = useGlobal();
  const routes = useRouter();
  const onFinish = async (dataForm: LoginRequestDto) => {
    setIsLoading(true);
    try {
      const res = await apiClient.authentication.authControllerLoginPasswordV1({
        email: dataForm.email,
        password: dataForm.password,
      });
      const userProfile = {
        email: res.result.user.email,
        firstName: res.result.user.firstName,
        lastName: res.result.user.lastName,
        id: res.result.user.id,
      };
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      routes.replace("/todo");
    } catch (e) {
      if (e instanceof ApiError) {
        showNotification("error", "ล้มเหลว", e.body.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white flex  rounded-lg shadow-lg  ">
        <div className="flex flex-col justify-center  items-center p-10 px-16 space-y-2 space-x-4 ">
          <Image
            className="object-contain"
            src="/logo/logo.png"
            alt="Logo"
            width={128}
            height={128}
          />
          <span className="text-3xl font-semibold text-black">
            Login to JTL.Shop
          </span>
          <span className="font-light text-sm text-gray-400">
            Please enter your Details
          </span>
          <Form layout="vertical" onFinish={onFinish} className="w-full">
            <InputCustom
              classLabel={"text-black"}
              label="Email"
              name="email"
              type="emil"
              formItemProps={{
                rules: [
                  { required: true, message: "Please input your username!" },
                ],
              }}
            />

            <InputCustom
              classLabel={"text-black"}
              label="Password"
              name="password"
              type="password"
              formItemProps={{
                rules: [
                  { required: true, message: "Please input your password!" },
                ],
              }}
            />

            <div className="py-4">
              <Link href="" className="font-bold text-sm hover:underline">
                {"Forgot Password"}
              </Link>
            </div>

            <div className="flex flex-col space-y-4 w-full ">
              <ButtonCustom
                htmlType="submit"
                type="primary"
                className="bg-black text-white w-full font-bold text-sm p-3 rounded-lg hover:bg-gray-700"
              >
                Login
              </ButtonCustom>
            </div>
          </Form>
          <div className="py-4 space-x-4">
            <span className="text-md text-gray-400 font-bold">
              <span>Don&apos;t have an account?</span>
            </span>
            <Link href="/signup" className="font-bold text-sm hover:underline text-black">
              {"Sign up"}
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            className="w-[400px] h-full hidden md:block rounded-r-lg object-cover"
            src="/login/developer.jpg"
            alt="Developer Image"
            width={400}
            height={600}
          />

          <div
            className="absolute hidden md:block bottom-0 right-0  p-6 bg-white bg-opacity-0 backdrop-blur-sm
          rounded-lg shadow-xl"
          >
            <span className="text-cyan-400 text-xl font-bold">
              Welcome to JTL.Shop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
