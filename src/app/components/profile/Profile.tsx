'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

type ProfileDto = {
  name: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
};

const Profile = () => {
  const [Profile, setProfile] = useState<ProfileDto | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const ProfileForm = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const get_profile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const profile = await axios.get(
          'https://mcts-bn.cyclic.app/auth/profile',
          config,
        );
        setProfile((prev) => profile.data.profile);
      } catch (error) {
        toast.error('Error occured while getting resources!');
        console.error('Error occured', error);
      }
    };
    get_profile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ProfileForm.current) {
      return {};
    }
    const credentials = new FormData(ProfileForm.current);
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.patch(
        'https://mcts-bn.cyclic.app/user',
        credentials,
        config,
      );
      if (resp.data.status === 200) {
        toast.success('Profile updated successfully! You can now login.');
        setTimeout(() => {
          window.location.pathname = '/auth/login';
        }, 200);
      } else {
        toast.error(`${resp.data.message}`);
      }
    } catch (error) {
      console.error('Error signing up!', error);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto max-[640px]:p-2 max-[768px]:p-10 flex-1">
      <form
        ref={ProfileForm}
        className="bg-tertiary rounded-lg px-5 sm:px-10 py-10 flex flex-col gap-3 flex-1 h-min"
        name="profile_form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-white font-[700] leading-[30px] text-[20px] self-center">
          Update Profile
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            readOnly={!edit}
            defaultValue={Profile?.name}
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
            readOnly={!edit}
            defaultValue={Profile?.email}
            className="p-2 rounded-md"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="text"
            name="password"
            readOnly={!edit}
            className="p-2 rounded-md"
            placeholder="Password"
          />
        </div>
        <div className="flex gap-5">
          <button
            type="button"
            className=" flex-1 text-white bg-good w-min px-5 py-2 self-center rounded-md whitespace-nowrap"
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? 'Cancel' : 'Edit'}
          </button>
          <button
            type="submit"
            className="flex-1 text-white bg-primary w-min px-5 py-2 self-center rounded-md whitespace-nowrap disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={!edit}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
