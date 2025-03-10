import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DollarSign, FileChartColumnIncreasing, UsersRound } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';

const Home = () => {

  const router = useRouter();

  const items = [
    { title: "Movimientos", url: '/finance', icon: DollarSign },
    { title: "Usuarios", url: "/users", icon: UsersRound },
    { title: "Reportes", url: "/reports", icon: FileChartColumnIncreasing }
  ];

  return (
    <div className="grid grid-cols-3 px-5">
      {
        items.map((item) => (
          <div className="flex items-center justify-center mt-16">
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
