'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Blog from './Blog';
import CreateBlog from './CreateBlog';

type BlogDTO = {
  _id: string;
  title: string;
  image: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

const Blogs = () => {
  const [Blogs, setBlogs] = useState<Array<BlogDTO> | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const get_blogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const blogs = await axios.get(
          'https://mcts-bn.cyclic.app/blogs',
          config,
        );
        setBlogs((prev) => blogs.data.blogs);
      } catch (error) {
        toast.error('Error occured while getting resources!');
        console.error('Error occured', error);
      }
    };
    get_blogs();
  }, [reload]);

  const filterDeleted = (id: string) => {
    setBlogs((prev) => (prev ? prev.filter((item) => item._id !== id) : prev));
  };

  return (
    <div className="flex flex-col gap-10 pt-10">
      <CreateBlog handleReload={handleReload} />
      {Blogs?.map((item, idx) => (
        <Blog
          {...item}
          filterDeleted={filterDeleted}
          handleReload={handleReload}
          key={idx}
        />
      ))}
    </div>
  );
};

export default Blogs;
