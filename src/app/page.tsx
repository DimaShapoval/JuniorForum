"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import HomeCard from "./components/HomeCard/HomeCard";
import Loader from "./components/Loader/Loader";

export default function Home() {
  const [homeCard, setHomeCard] = useState<any>(null);
  const [deleteClick, setDeleteClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function getarticles() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${apiUrl}/getArticles`);
        setHomeCard(
          data.data.map((item: any, index: number) => {
            return (
              <HomeCard
                key={index}
                description={item.description}
                title={item.title}
                id={item._id}
                creator={item.creatorEmail}
                setDeleteClick={setDeleteClick}
                deleteClick={deleteClick}
              />
            );
          })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getarticles();
  }, [deleteClick]);
  return (
    <div className="w-full flex flex-col items-center my-3" >
      {loading ? <Loader /> : null}
      <div className="grid mt-2 gap-8 sm:m-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {homeCard ? homeCard : null}{" "}
      </div>
    </div>
  );
}
