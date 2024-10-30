'use client'

import { ArticleCardType } from "@/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const initialState: ArticleCardType = {
    title: '',
    description: '',
    creator: '',
    text: '',
    _id: ''

}

export default function ArticleCard() {
    const [articleData, setArticleData] = useState<ArticleCardType>(initialState);
    const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle() {
    try{
        setLoading(true)
        const { data } = await axios.get(`${apiUrl}/getArticle/${id}`);
        setArticleData(data);
    }
    catch(err){
        console.error(err);
    }
    finally{
        setLoading(false)
    }
    
  }
    return (
        <>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white text-balance break-words " >{articleData.title}</h1>
          <p className="text-white my-2 text-balance" ><strong>Author:</strong> {articleData.creator}</p>
          <p className="text-white my-2 text-balance break-words "><strong>Description:</strong> {articleData.description}</p>
          <pre className="font-sans text-white mt-5 bg-slate-800 p-4 rounded w-full text-balance break-words " >{articleData.text}</pre>
        </>
    )
}