import { FormEvent } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AtSign, Lock } from 'lucide-react';

import { useForm } from '@/hooks/useForm';

const SignIn = () => {

  const router = useRouter();

  const { email, password, formState, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    router.push('/home');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-2">
      <div className="bg-amber-400"></div>
      <div className="grid items-center justify-center shadow-lg shadow-slate-500">
        <div className="w-full">
          <div className="w-full flex justify-center">
            <span className="text-5xl font-semibold whitespace-nowrap relative top-[-20px]">FinanTrack</span> {/* Movemos el span hacia arriba */}
          </div>
          <form onSubmit={ handleSignIn }>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900">
                  <AtSign />
                </div>
                <Input
                  type="email"
                  className="w-[300px] h-12 pl-10"
                  name="email"
                  placeholder="Correo electrónico"
                  value={ email }
                  onChange={ onInputChange }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900">
                  <Lock />
                </div>
                <Input
                  type="password"
                  className="w-[300px] h-12 pl-10"
                  name="password"
                  placeholder="Contraseña"
                  value={ password }
                  onChange={ onInputChange }
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-[100px] h-10 text-lg">Ingresar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default SignIn;
