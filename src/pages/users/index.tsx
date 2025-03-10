import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@apollo/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';

import { GET_USERS } from '../../../lib/graphql/queries';
import { Sidebar } from '@/components/Sidebar';
import { User } from '@/interfaces/User';

export const Users = () => {

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USERS);
  const users: User[] = data?.getUsers;

  return (
    <>
      { loading 
        ? <div className="py-5">
            <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
            <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
            <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
            <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
          </div>
        : <div className="py-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                users.map((user) => (
                  <TableRow key={ user.id }>
                    <TableCell>{ user.name }</TableCell>
                    <TableCell>{ user.email }</TableCell>
                    <TableCell>{ user.phone }</TableCell>
                    <TableCell>{
                      user.role === 'admin'
                      ? <Badge className="bg-red-900 text-white">Administrador</Badge>
                      : <Badge className="bg-blue-900 text-white">Usuario</Badge>
                    }</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => router.push(`/users/${ user.id }`)}
                        className="cursor-pointer"
                      >
                        <Pencil />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          </div>        
      }
    </>
  );

};

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default Users;
