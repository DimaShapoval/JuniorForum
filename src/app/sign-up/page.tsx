"use client";

import { useState } from "react";
import { UserInfo } from "@/type";
import Loader from "../components/Loader/Loader";
import dynamic from "next/dynamic";

export default function SignUp() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const SignUpFrom = dynamic(() => import("../components/SignUpFrom/SignUpFrom"), {loading: () => <Loader/>, ssr: false})
  const VerifyForm = dynamic(() => import('../components/VerifyForm/VerifyForm'), {loading: () => <Loader/>, ssr: false})
  const [formAnswer, setFromAnswer] = useState<{
    response: boolean;
    allUserInfo: UserInfo;
  }>({ response: false, allUserInfo: { email: "", password: "", name: "" } });

  const formSuccess = (formResponse: boolean, allUserInfo: UserInfo) => {
    return setFromAnswer({ response: formResponse, allUserInfo: allUserInfo });
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 mt-5 pb-8 mb-4">
      {!formAnswer.response ? (
        <div>
          Sign Up
          <SignUpFrom callback={formSuccess} url={url} />
        </div>
      ) : (
        <VerifyForm allUserInfo={formAnswer.allUserInfo} url={url} />
      )}
    </div>
  );
}
