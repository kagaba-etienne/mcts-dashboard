import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import EditForm from './EditForm';
import { Button } from '@mui/material';

type BlogDTO = {
  _id: string;
  title: string;
  image: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  filterDeleted: (id: string) => void;
  handleReload: () => void;
};

const Blog = ({
  title,
  image,
  body,
  _id,
  filterDeleted,
  handleReload,
}: BlogDTO) => {
  const checkImgUrl = (img: string) => {
    const regex =
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
    if (regex.test(img)) {
      return img;
    } else {
      return '/example.com';
    }
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const id = event.currentTarget.id;
      const resp = await axios.delete(
        `https://mcts-bn.cyclic.app/blogs/${id}`,
        config,
      );
      if (resp.data.status == 200) {
        toast.success('Blog deleted successfully!');
        filterDeleted(id);
      }
    } catch (error) {
      toast.error('Error occured while  performing action!');
      console.error('Error occured', error);
    }
  };
  return (
    <div className="bg-tertiary p-5 rounded-md flex flex-col gap-3">
      <div className="title text-white">
        <b>Title:</b> <i>{title}</i>
      </div>
      <div className="image text-white">
        <b>Image:</b>
        <Image
          src={`${checkImgUrl(image)}`}
          alt="image"
          height={100}
          width={100}
        />
      </div>
      <div className="body text-white">
        <b>Body:</b>
        <p>
          <i>{body}</i>
        </p>
      </div>
      <div className="flex gap-10">
        <EditForm
          handleReload={handleReload}
          id={`${_id}`}
          className="flex-1"
        />
        <Button
          type="button"
          style={{backgroundColor: "#B02E0C", color: "#ffffff"}}
          className="bg-danger hover:bg-danger/50 flex-1 text-white bgred"
          id={_id}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Blog;
