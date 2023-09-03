'use client';
import React, { useState } from 'react';
import Item from './Item';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';
import Image from 'next/image';

const Nav = () => {
  const [isOpen, toggleMenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  const urls = [
    {
      url: '/queries',
      name: 'Queries',
    },
    {
      url: '/blogs',
      name: 'Blogs',
    },
    {
      url: '/profile',
      name: 'Profile',
    },
  ];

  const handleMenu = () => {
    toggleMenu((prev) => !prev);
  };
  return (
    <nav>
      <nav
        className={`h-screen transform w-[200px] ${
          isOpen ? 'translate-x-0' : '-translate-x-[200px]'
        }  md:translate-x-0 transition-all duration-300 bg-secondary text-white py-10 px-10 z-[999] fixed`}
      >
        <Link
          href="/"
          className="logo flex flex-col gap-2 items-center justify-center rounded-full shadow-lg  px-8 border border-tertiary/20 py-3"
        >
          <Image src="/mcts.png" alt="logo" height={100} width={100} />
          <div>MCTS</div>
        </Link>
        <div className="links flex flex-col gap-10 mt-10">
          {urls.map((item, idx) => (
            <Item {...item} toggleMenu={handleMenu} key={idx} />
          ))}
          <Link href="/auth/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </nav>
      <div
        className={`menu-button md:hidden sticky ${
          isOpen ? 'translate-x-[200px]' : 'translate-x-0'
        } transition-all duration-300`}
      >
        <IconButton onClick={handleMenu} className="text-white">
          {isOpen ? <Close /> : <Menu />}
        </IconButton>
      </div>
    </nav>
  );
};

export default Nav;
