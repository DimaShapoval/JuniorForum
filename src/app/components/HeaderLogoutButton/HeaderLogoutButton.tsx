"use client";
import { useState } from "react";
import { useHeaderContext } from "../Header/HeaderProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderLogoutButton({ userName }: any) {
  const [nameClicked, setNameClicked] = useState<boolean>(false);
  const [bugerClicked, setBurgerClicked] = useState<boolean>(false);
  const { setUserLogined } = useHeaderContext();
  const router = useRouter();

  const logoutUser = () => {
    setUserLogined("");
    localStorage.clear();
  };
  return (
    <>
      <div className="w-full hidden sm:flex items-end flex-col">
        <div
          onClick={() => setNameClicked(!nameClicked)}
          className="px-7 cursor-pointer md:hover:text-gray-400"
        >
          {userName ? (
            <p className="text-balance max-w-30">{userName}</p>
          ) : null}
        </div>

        <button
          className={
            `absolute bg-neutral-700 -z-10 flex gap-2 delay-300 rounded px-3 py-2 transition-all ` +
            (nameClicked ? `translate-y-10` : `translate-y-0`)
          }
          onClick={logoutUser}
        >
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M10 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-3h-2v3H3V5h7v3h2V5c0-1.1-.9-2-2-2zm12 9-4-4v3h-7v2h7v3l4-4z" />
          </svg>
        </button>
      </div>

      <div className="flex sm:hidden w-full justify-end">
        <button
          onClick={() => setBurgerClicked(!bugerClicked)}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      {bugerClicked ? (
        <div
          className="w-full sm:hidden fixed top-10 left-0"
          id="navbar-hamburger"
        >
          <ul className="flex flex-col font-medium my-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <p className="py-2 px-3">{userName}</p>
            <li>
              <button
                className="block py-2 px-3 text-gray-400 hover:text-white hover:bg-gray-700"
                aria-current="page"
                onClick={() => {setBurgerClicked(false); router.replace('/create')}}
              >
                Create article
              </button>
            </li>
            <li>
              <button
                onClick={logoutUser}
                className="mb-3 w-full text-start block py-2 px-3 text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
