import type { ReactElement } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import {
  DollarSign,
  UsersRound,
  FileChartColumnIncreasing,
  LogOut,
  CircleX
} from 'lucide-react';
import { toast } from 'sonner';

export interface Props {
  children?: ReactElement | ReactElement[];
}

export const Sidebar = ({ children }: Props) => {

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: process.env.AUTH0_BASE_URL });
    } catch(error) {
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
    <>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link href="/home" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">FinanTrack</span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/finance" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <DollarSign />
                <span className="ms-3">Movimientos</span>
              </Link>
            </li>
            <li>
              <Link href="/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <UsersRound />
                <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
              </Link>
            </li>
            <li>
              <Link href="/reports" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FileChartColumnIncreasing />
                <span className="flex-1 ms-3 whitespace-nowrap">Reportes</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a onClick={ handleSignOut } className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LogOut />
                <span className="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <main>{ children }</main>
      </div>
    </>
  );

};
