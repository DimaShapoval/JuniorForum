"use client";

import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../Loader/Loader";

export default function ForgotForm({ handleBack, apiUrl }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successSend, setSuccessSend] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formSubmit: SubmitHandler<{ email: string }> = async (data: {
    email: string;
  }) => {
    const dataForRequest = { ...data, origin: window.location.origin };
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/forgot-password`, dataForRequest);
      setSuccessSend("Reset link send to your email");
    } catch (err: any) {
      const { message } = err.response.data;
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="pt-6" onSubmit={handleSubmit(formSubmit)}>
      {loading ? (
        <div className="mb-4">
          <Loader />
        </div>
      ) : null}
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
      {successSend ? (
        <div className="w-full flex justify-center items-center text-lg text-green-600">
          {successSend}
          <span
            onClick={() => setSuccessSend("")}
            className="font-bold text-2xl cursor-pointer"
          >
            &times;
          </span>
        </div>
      ) : null}
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
      <div className="text-white font-bold mt-4 flex justify-between">
        <button
          onClick={() => handleBack(false)}
          type="button"
          className="text-right bg-gray-500 hover:bg-gray-700 rounded py-2 px-3 focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
