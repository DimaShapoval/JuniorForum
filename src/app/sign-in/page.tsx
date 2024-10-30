"use client";

import dynamic from "next/dynamic";
import Loader from "../components/Loader/Loader";
import { useState } from "react";

export default function SignIn() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const SignInForm = dynamic(
    () => import("../components/SignInForm/SignInForm"),
    { loading: () => <Loader />, ssr: false }
  );
  const ForgotForm = dynamic(
    () => import("../components/ForgotForm/ForgotForm"),
    { loading: () => <Loader />, ssr: false }
  );
  const [forgotPasswordClicked, setForgotPasswordClicked] =
    useState<boolean>(false);

  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 mt-5 pb-8 mb-4">
      {forgotPasswordClicked ? (
        <>
          Enter your email
          <ForgotForm handleBack={setForgotPasswordClicked} apiUrl={url} />
        </>
      ) : (
        <>
          Sign in
          <SignInForm
            url={url}
            forgotButtonClicked={setForgotPasswordClicked}
          />
        </>
      )}
    </div>
  );
}
