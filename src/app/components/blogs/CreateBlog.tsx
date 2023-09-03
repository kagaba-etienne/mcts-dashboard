'use client';
import { Button, Dialog } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type BlogDTO = {
  _id: string;
  title: string;
  image: string;
  body: string;
};

const CreateBlog = ({
  className,
  handleReload,
}: {
  className?: string;
  handleReload: () => void;
}) => {
  const BlogForm = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!BlogForm.current) {
      return {};
    }
    const blog = new FormData(BlogForm.current);
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.post(
        `https://mcts-bn.cyclic.app/blogs`,
        blog,
        config,
      );
      if (resp.data.status === 200) {
        toast.success('Blog created successfully!');
        handleClose();
        handleReload();
      }
    } catch (error) {
      console.error('Error creating blog!', error);
    }
  };

  return (
    <div className={`${className}`}>
      <Button
        style={{backgroundColor: "rgb(19 138 54 / 1)", color: "#ffffff"}}
        className="px-5 text-white bg-good hover:bg-good/50 bg-reen"
        onClick={handleClickOpen}
      >
        Create Blog
      </Button>
      <Dialog open={open} onClose={handleClose} className="">
        <form
          ref={BlogForm}
          className="bg-tertiary p-10 flex flex-col gap-3 h-min  md:w-[500px]"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className="text-white font-[700] leading-[30px] text-[20px] self-center">
            Edit Blog
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="p-2 rounded-md"
              placeholder="Title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-white">
              Image
            </label>
            <input
              type="link"
              name="image"
              className="p-2 rounded-md"
              placeholder="Image Link"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-white">
              Body
            </label>
            <textarea
              name="body"
              className="p-2 rounded-md"
              rows={10}
              placeholder="Body"
            />
          </div>
          <div className="flex gap-5">
            <Button
              type="submit"
              style={{backgroundColor: "rgb(4 150 255 / 1)", color: "#ffffff"}}
              className="bg-primary flex-1 text-white hover:bg-primary/50 bgblue"
            >
              Create
            </Button>
            <Button
              onClick={handleClose}
              style={{backgroundColor: "rgb(19 138 54 / 1)", color: "#ffffff"}}
              className="bg-good flex-1 text-white hover:bg-good/50 bggreen"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateBlog;
