"use client";

import Loader from "@/app/components/Loader/Loader";
import dynamic from "next/dynamic";

export default function ArticlePage() {
  const ArticleCard = dynamic(
    () => import("../../components/ArticleCard/ArticleCard"),
    { loading: () => <Loader color="white" />, ssr: false }
  );
  return (
    <div className="bg-slate-900 container m-4 sm:my-4 rounded p-5">
      <ArticleCard />
    </div>
  );
}
