import React from 'react';
import { Profile } from '../../components';

const page = () => {
  return (
    <div className='relative'>
      <div className='absolute w-full h-screen flex items-center'>
        <Profile />
      </div>
    </div>
  );
};

export default page;
