'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Query from './Query';
type QueryDto = {
  _id: string;
  name: string;
  email: string;
  message: string;
  phone: string;
};

const Queries = () => {
  const [Queries, setQueries] = useState<Array<QueryDto> | null>(null);

  useEffect(() => {
    const get_queries = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const queries = await axios.get(
          'https://mcts-bn.cyclic.app/contact',
          config,
        );
        setQueries((prev) => queries.data.queries);
      } catch (error) {
        toast.error('Error occured while getting resources!');
        console.error('Error occured', error);
      }
    };
    get_queries();
  }, []);

  const filterDeleted = (id: string) => {
    setQueries((prev) =>
      prev ? prev.filter((item) => item._id !== id) : prev,
    );
  };

  return (
    <div className="pt-10">
      <h1 className="text-white font-[700] text-[26px]">Queries</h1>
      <div className=" flex flex-col">
        {Queries?.map((item, idx) => (
          <Query {...item} filterDeleted={filterDeleted} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Queries;
