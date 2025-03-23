"use client";
import apiClient from "@/api";
import { ApiError } from "@/api/generated";
import ButtonCustom from "@/components/Button/ButtonCustom";
import InputCustom from "@/components/Input/InputCustom";
import { useGlobal } from "@/contexts/GlobalContext";
import { RegisterFormFields } from "@/types/register";
import { showNotification } from "@/utils/notification";
import { Form } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { setIsLoading } = useGlobal();
  const routes = useRouter();
  const onFinish = async (dataForm: RegisterFormFields) => {
    setIsLoading(true);
    try {
      const res =
        await apiClient.authentication.authControllerRegisterPasswordV1({
          firstName: dataForm.firstName,
          lastName: dataForm.lastName,
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
    <div className="flex items-center justify-center min-h-screen bg-black shadow-lg font-thai">
      <div className="bg-white flex  rounded-lg shadow-lg  relative">
        <div className="relative">
          <img
            className="w-[400px] h-full hidden md:block rounded-l-md object-cover"
            src="https://cdn.pixabay.com/photo/2024/05/15/20/57/developer-8764523_1280.jpg"
            alt=""
          />
          <div
            className="absolute hidden md:block bottom-0 left-0 p-6 bg-white bg-opacity-0 backdrop-blur-sm
          rounded-lg shadow-xl"
          >
            <span className="text-cyan-400 text-xl font-bold">
              Welcome to JTL.Shop
            </span>
          </div>
        </div>
        <div className="flex flex-col w-96 sm:w-[500px] justify-center items-center p-12  space-y-2 ">
          <Image
            className="object-contain"
            src="/logo/logo.png"
            alt="Logo"
            width={128}
            height={128}
          />
          <span className="text-3xl font-semibold text-black "> Sign up</span>
          <span className="font-light text-sm text-gray-400">
            Please enter your Details
          </span>
          <Form layout="vertical" onFinish={onFinish} className="w-full">
            <InputCustom
              classLabel={"text-black"}
              label="First name"
              name="firstName"
              formItemProps={{
                rules: [
                  { required: true, message: "Please input your first name!" },
                ],
              }}
            />
            <InputCustom
              classLabel={"text-black"}
              label="Last name"
              name="lastName"
              formItemProps={{
                rules: [
                  { required: true, message: "Please input your last name!" },
                ],
              }}
            />
            <InputCustom
              classLabel={"text-black"}
              label="Emal"
              name="email"
              type="email"
              formItemProps={{
                rules: [
                  { required: true, message: "Please input your email!" },
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

            <ButtonCustom
              htmlType="submit"
              type="primary"
              className="bg-black text-white w-full font-bold text-sm p-3 rounded-lg hover:bg-gray-700"
            >
              Sign up
            </ButtonCustom>
          </Form>

          <div className="py-4 space-x-1">
            <span className="text-md text-gray-400 font-bold">
              Already have an account?
            </span>
            <a href="/login" className="font-bold text-md hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
