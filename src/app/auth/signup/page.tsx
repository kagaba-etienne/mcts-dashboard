'use client';
import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const SignUpForm = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!SignUpForm.current) {
      return {};
    }
    const credentials = new FormData(SignUpForm.current);
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.post(
        'https://mcts-bn.cyclic.app/user',
        credentials,
        config,
      );
      if (resp.data.status === 200) {
        toast.success('Signed up successfully! You can now login.');
        setTimeout(() => {
          redirect('/login');
        }, 200);
      }
    } catch (error) {
      console.error('Error signing up!', error);
    }
  };
  return (
    <div className="max-w-[500px] mx-auto max-[768px]:p-10 h-screen flex items-center">
      <form
        ref={SignUpForm}
        encType="multipart/form-data"
        className="bg-tertiary rounded-lg p-10 flex flex-col gap-3 flex-1 h-min"
        name="signup_form"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white font-[700] leading-[30px] text-[20px] self-center">
          Signup
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="p-2 rounded-md"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="p-2 rounded-md"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="p-2 rounded-md"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-primary w-min px-5 py-2 self-center rounded-md whitespace-nowrap"
        >
          Sign up
        </button>
        <Link
          href="/auth/login"
          className="text-white leading-[13px] font-[300] text-[11px] underline self-center mt-10"
        >
          or Login
        </Link>
      </form>
    </div>
  );
};

export default Page;
