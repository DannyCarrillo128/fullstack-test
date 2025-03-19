import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';


const SignIn = () => {

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status]);

  const handleSignIn = () => {
    signIn('auth0');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-2">
      <div className="bg-amber-400"></div>
      <div className="grid items-center justify-center shadow-lg shadow-slate-500">
        <div className="w-full">
          <div className="w-full flex justify-center">
            <span className="text-5xl font-semibold whitespace-nowrap relative top-[-20px]">FinanTrack</span>
          </div>
          <div className="flex justify-center">
            <Button onClick={ handleSignIn } type="button" className="w-[100px] h-10 text-lg">Ingresar</Button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SignIn;
