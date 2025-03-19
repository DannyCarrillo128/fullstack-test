import { useSession } from 'next-auth/react';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
    };
  }
};

export const useRole = () => {

  const { data } = useSession();
  
  if (data) {
    return data.user.role || 'user';
  }

  return 'user';

};
