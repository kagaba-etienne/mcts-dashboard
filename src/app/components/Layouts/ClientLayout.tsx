'use client';
import { useEffect } from 'react';
import axios from 'axios';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get('https://mcts-bn.cyclic.app/auth/profile', config)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
          } else {
            window.location.pathname = '/auth/login';
          }
        })
        .catch((error) => {
          console.error(error);
          window.location.pathname = '/auth/login';
        });
    }
  }, []);

  return <>{children}</>;
};

export default ClientLayout;
