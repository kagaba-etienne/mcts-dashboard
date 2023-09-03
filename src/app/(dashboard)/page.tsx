'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [Blogs, setBlogs] = useState<number>(0);
  const [Queries, setQueries] = useState<number>(0);

  const get_resources = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const blogs = await axios.get('https://mcts-bn.cyclic.app/blogs', config);
      const queries = await axios.get(
        'https://mcts-bn.cyclic.app/contact',
        config,
      );
      setQueries(queries.data.queries.length);
      setBlogs(blogs.data.blogs.length);
    } catch (error) {
      toast.error('Error occured while getting resources!');
      console.error('Error occured', error);
      setQueries(-1);
      setBlogs(-1);
    }
  };

  useEffect(() => {
    get_resources();
  }, []);

  return (
    <main className=" text-white">
      <div className="welcome font-[700] text-[26px] pt-10">
        Welcome back, Kagaba!
      </div>
      <div className="statistics flex flex-wrap gap-10 mt-10">
        <Link href="/blogs">
          <div className="blogs bg-tertiary px-10 py-5 rounded-md flex flex-col items-center gap-4">
            <div className="title px-5 font-[400] text-[20px]">Blogs</div>
            <div className="count font-[600] text-[32px]">{Blogs}</div>
          </div>
        </Link>
        <Link href="/queries">
          <div className="blogs bg-tertiary px-10 py-5 rounded-md flex flex-col items-center gap-4">
            <div className="title px-5 font-[400] text-[20px]">Queries</div>
            <div className="count font-[600] text-[32px]">{Queries}</div>
          </div>
        </Link>
      </div>
    </main>
  );
}
