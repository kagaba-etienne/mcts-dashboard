'use client';
import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const LoginForm = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!LoginForm.current) {
      return {};
    }
    const credentials = new FormData(LoginForm.current);
    try {
      const resp = await axios.post(
        'https://mcts-bn.cyclic.app/auth/login',
        credentials,
      );
      if (resp.data.status === 200) {
        localStorage.setItem('token', resp.data.access_token);
        toast.success('Logged in successfully');
        // setTimeout(() => {
        //   window.location.pathname = "/"
        // }, 200);
        window.location.pathname = '/';
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error('Error occured during login!');
      console.error('Error logging in!', error);
    }
  };
  return (
    <div className="max-w-[500px] mx-auto max-[768px]:p-10 h-screen flex items-center">
      <form
        ref={LoginForm}
        className="bg-tertiary rounded-lg p-10 flex flex-col gap-3 h-min flex-1"
        name="login_form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-white font-[700] leading-[30px] text-[20px] self-center">
          Login
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            className="p-2 rounded-md"
            name="email"
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
          className="text-white bg-primary w-min px-5 py-2 self-center rounded-md"
        >
          Login
        </button>
        <Link
          href="/auth/signup"
          className="text-white leading-[13px] font-[300] text-[11px] underline self-center mt-10"
        >
          or Signup
        </Link>
      </form>
    </div>
  );
};

export default Page;
