import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

type QueryDto = {
  _id: string;
  name: string;
  email: string;
  message: string;
  phone: string;
  filterDeleted: (id: string) => void;
};

const Query = ({
  _id,
  name,
  email,
  phone,
  message,
  filterDeleted,
}: QueryDto) => {
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
        `https://mcts-bn.cyclic.app/contact/${id}`,
        config,
      );
      if (resp.data.status == 200) {
        toast.success('Query deleted successfully!');
        filterDeleted(id);
      }
    } catch (error) {
      toast.error('Error occured while  performing action!');
      console.error('Error occured', error);
    }
  };
  return (
    <div className="flex flex-col gap-10 text-white bg-tertiary p-5 rounded-md mt-10">
      <div className="flex flex-col gap-5">
        <h1 className="name">
          <b>Name:</b> <i>{name}</i>
        </h1>
        <p className="email">
          <b>Email:</b> <i>{email}</i>
        </p>
        <p className="phone">
          <b>Phone</b>: <i>{phone}</i>
        </p>
        <p className="message flex flex-col gap-3">
          <b>Message:</b>
          <p>
            <i>{message}</i>
          </p>
        </p>
      </div>
      <button
        type="button"
        className="bg-danger text-white py-2 rounded-md"
        onClick={handleDelete}
        id={_id}
      >
        {' '}
        Delete
      </button>
    </div>
  );
};

export default Query;
