"use client";

import Loader from "@/app/components/Loader/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHeaderContext } from "../Header/HeaderProvider";

export default function VerifyForm({ allUserInfo, url }: any) {
  const { email } = allUserInfo;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>();
  const [errorRequest, setErrorRequest] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserLogined } = useHeaderContext();

  const formSubmit = async (values: any) => {
    try { //checking code that user send
      setLoading(true);
      await axios.post(`${url}/verifyCode`, {
        email: email,
        code: values.code,
        user: allUserInfo,
      });
      localStorage.setItem("userName", allUserInfo.name);
      localStorage.setItem('userEmail', email)
      setUserLogined(allUserInfo.name)
      router.replace("/");
    } catch (err) {
      setErrorRequest(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="pt-6">
      {errorRequest ? (
        <div className="w-full flex justify-center items-center text-lg text-red-600">
          Please enter correct code{" "}
          <span
            onClick={() => setErrorRequest(false)}
            className="font-bold text-2xl cursor-pointer"
          >
            &times;
          </span>
        </div>
      ) : null}
      <div className="flex justify-center text-lg font-bold">
        Verify your emal
      </div>
      {loading ? <Loader /> : null}
      <input
        className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Enter your code"
        {...register("code", { required: "This field is required" })}
      />
      {errors.code?.message ? (
        <p className="text-red-600">{errors.code?.message}</p>
      ) : null}
      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Verify
      </button>
    </form>
  );
}
