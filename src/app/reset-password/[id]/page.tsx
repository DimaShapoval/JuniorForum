"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ResetPassword() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{ password: string; confirm_password: string }>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm_password: boolean;
  }>({ password: false, confirm_password: false });
  const params = useParams();
  const router = useRouter()
 
  const formSubmit: SubmitHandler<{
    password: string;
    confirm_password: string;
  }> = async (data: { password: string }) => {
    const { id } = params;
    const dataForRequest = { id: id, newPassword: data.password };
    try {
      await axios.post(`${apiUrl}/resetPassword`, dataForRequest);
      router.replace('/sign-in');
    } catch (err: any) {
      const { message } = err.response.data;
      setErrorMessage(message);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 mt-5 pb-8 mb-4">
      Reset Password
      <form className="pt-6" onSubmit={handleSubmit(formSubmit)}>
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
            htmlFor="password"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword.password ? "text" : "password"}
            placeholder="Enter new password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
                message: 'The password can only contain Latin (English) letters, numbers, and special characters.'
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <span
            onClick={() =>
              setShowPassword({
                ...showPassword,
                password: !showPassword.password,
              })
            }
            className="absolute"
          >
            {showPassword.password ? (
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
        </div>
        {errors.password?.message ? (
          <p className="text-red-600">{errors.password.message}</p>
        ) : null}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm_password"
            type={showPassword.confirm_password ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: "This field is required",
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Passwords do not match";
              },
            })}
          />
          <span
            onClick={() =>
              setShowPassword({
                ...showPassword,
                confirm_password: !showPassword.confirm_password,
              })
            }
            className="absolute"
          >
            {showPassword.confirm_password ? (
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
          {errors.confirm_password?.message ? (
            <p className="text-red-600">{errors.confirm_password.message}</p>
          ) : null}
        </div>
        <div className="text-white font-bold mt-4 flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
