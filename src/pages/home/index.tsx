import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { Sidebar } from '@/components/Sidebar';
import { useRole } from '@/hooks/useRole';
import { MenuItem } from '@/interfaces/MenuItem';
import { Menu } from '../../../public/menu';

const Home = () => {

  const router = useRouter();

  const role = useRole() as 'user' | 'admin';
  
  let items: MenuItem[] = [];
  items = Menu[role];

  return (
    <div className="grid grid-cols-3 px-5">
      {
        items.map((item) => (
          <div key={ item.url } className="flex items-center justify-center mt-16">
            <Button
              onClick={ () => router.push(item.url) }
              className="w-45 h-45 flex flex-col items-center justify-center text-xl font-bold cursor-pointer">
              <item.icon className="icon-lg"/>
              { item.title }
            </Button>
          </div>
        ))
      }
    </div>
  );

};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default Home;
