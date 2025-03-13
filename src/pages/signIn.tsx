import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import { toast } from 'sonner';

const SignIn = () => {

  const handleSignIn = () => {
    try {
      signIn('auth0', { callbackUrl: '/home' });
    } catch (error) {
      toast('Algo salió mal.', {
        description: 'Parece que hubo un error.',
        icon: <CircleX />,
        style: {
          background: '#FFB5C0',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
      console.log(error);
    }
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
