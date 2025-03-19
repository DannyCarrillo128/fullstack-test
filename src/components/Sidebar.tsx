import type { ReactElement } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { LogOut } from 'lucide-react';

import { useRole } from '@/hooks/useRole';
import { MenuItem }  from '@/interfaces/MenuItem';
import { Menu } from '../../public/menu';

export interface Props {
  children?: ReactElement | ReactElement[];
};

export const Sidebar = ({ children }: Props) => {

  const role = useRole() as 'user' | 'admin';

  let items: MenuItem[] = [];
  items = Menu[role];

  const handleSignOut = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  return (
    <>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link href="/home" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">FinanTrack</span>
          </Link>
          <ul className="space-y-2 font-medium">
            {
              items.length > 0 &&
              items.map((item: MenuItem, index: number) => (
                <li key={ index }>
                  <Link
                    href={ item.url }
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <item.icon />
                    <span className="ms-3">{ item.title }</span>
                  </Link>
                </li>
              ))
            }
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a onClick={ handleSignOut } className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
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
