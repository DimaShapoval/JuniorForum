"use client";

import { SignInUser } from "@/type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHeaderContext } from "../Header/HeaderProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function SignInForm({ url, forgotButtonClicked }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserLogined } = useHeaderContext();
  const router = useRouter();

  const formSubmit: SubmitHandler<SignInUser> = async (values: SignInUser) => {
    try {
      setLoading(true); //show loading
      const { data } = await axios.post(`${url}/sign-in`, values);
      localStorage.setItem("userName", data.name); // after success request add in storage userName
      localStorage.setItem('userEmail', values.email);      
      setUserLogined(data.name); // add userName in context
      router.replace("/");
    } catch (error: any) {
      const { message } = error.response.data;
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="pt-6">
      {loading ? <Loader /> : null}
      {errorMessage ? (
        <div className="w-full flex justify-center items-center text-lg text-red-600">
          {errorMessage}
          <span
            onClick={() => setErrorMessage("")}
            className="font-bold text-2xl cursor-pointer"
          >
            &times;
          </span>
        </div>
      ) : null}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email?.message ? (
          <p className="text-red-600">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 select-none  cursor-pointer h-6 absolute top-2 right-2"
            >
              <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
            >
              <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
            </svg>
          )}
        </span>
        {errors.password?.message ? (
          <p className="text-red-600">{errors.password.message}</p>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <button
        onClick={() => forgotButtonClicked(true)}
          type="button"
          className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-blue-800"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}
