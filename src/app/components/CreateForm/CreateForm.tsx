"use client";

import { CreateFormType } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../Loader/Loader";

export default function CreateForm() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormType>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const createSubmit: SubmitHandler<CreateFormType> = async (
    values: CreateFormType
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/createArticle`, {
        userEmail: localStorage.userEmail,
        articleTitle: values.title,
        articleText: values.text,
        articleDescription: values.description
      });
      router.replace("/");
    } catch {
      setLoading(false);
      alert("Something went wrong... Please try later");
    }
  };
  return (
    <form onSubmit={handleSubmit(createSubmit)} className="w-11/12 mt-4 h-auto">
      {loading ? <Loader /> : null}
      <div className="mb-4">
        <label className="block text-xl font-bold mb-2" htmlFor="title">
          Title of article*
        </label>
        <input
          {...register("title", {
            required: "Title is required field",
            minLength: {
              value: 3,
              message: "Minimum 3 letter in field",
            },
          })}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter title"
        />
        {errors.title?.message ? (
          <p className="text-red-300">{errors.title.message}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="block text-xl font-bold mb-2" htmlFor="title">
          Description*
        </label>
        <input
          {...register("description", {
            required: "Description is required field",
            minLength: {
              value: 3,
              message: "Minimum 3 letter in field",
            },
          })}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter description"
        />
        {errors.description?.message ? (
          <p className="text-red-300">{errors.description.message}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="block text-xl font-bold mb-2" htmlFor="article">
          Text of article*
        </label>
        <textarea
          {...register("text", { required: "This is required field" })}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 h-80 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter text of article"
        />
        {errors.text?.message ? (
          <p className="text-red-300">{errors.text.message}</p>
        ) : null}
      </div>
      <button
        className="mb-4 bg-slate-400 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}
