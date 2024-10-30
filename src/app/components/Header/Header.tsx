"use client";
import Link from "next/link";
import { useHeaderContext } from "./HeaderProvider";
import HeaderLogoutButton from "../HeaderLogoutButton/HeaderLogoutButton";

export default function Header() {
  const { userLogined, setUserLogined } = useHeaderContext();

  return (
    <header className="bg-slate-900 text-white flex justify-center relative z-50">
      <div className="grid grid-cols-2 gap-4 items-center bg-slate-900 h-14 w-11/12">
        <div className=" w-full flex justify-between">
          <Link className="text-xl font-bold mr-4" href={"/"}>
            Junior Forum
          </Link>
          {userLogined ? <Link className="text-xl hidden sm:block" href={"/create"}>
            Create article
          </Link> : null}
          
        </div>
        <div className="flex justify-end items-center">
          {userLogined ? (
            <HeaderLogoutButton userName={userLogined} />
          ) : (
            <>
              <Link className="text-right mr-4" href={"/sign-in"}>
                Sign in
              </Link>
              <Link
                className="text-right bg-gray-500 rounded p-2"
                href={"/sign-up"}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
