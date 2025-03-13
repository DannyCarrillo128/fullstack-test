import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

import { GET_MOVEMENTS, GET_TOTAL_AMOUNT } from '../../../lib/graphql/queries';
import { Sidebar } from '@/components/Sidebar';
import { Movement } from '@/interfaces/Movement';

const Finance = () => {

  const router = useRouter();

  const { data, loading, error,  } = useQuery(GET_MOVEMENTS);
  const movements: Movement[] = data?.getMovements;

  const resp = useQuery(GET_TOTAL_AMOUNT);
  const totalAmount: number = resp.data?.getTotalAmount;

  const formatDate = (createdAt: string) => {
    return new Date(Number(createdAt)).toLocaleString();
  };

  return (
    <>
      { loading 
        ? <div className="py-5">
            <div className="grid justify-items-end p-4">
              <Skeleton className="w-[100px] h-[40px] rounded-xl" />
            </div>
            <div className="py-5">
              <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
              <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
              <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
              <Skeleton className="w-full h-[30px] rounded-xl mb-8" />
            </div>
          </div>
        : <div className="py-5">
            <div className="grid justify-items-end p-4">
              <Button
                onClick={ () => router.push('/finance/newMovement') }
                className="cursor-pointer"
              >
                <Plus/> Nuevo
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Usuario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  movements.map((movement) => (
                    <TableRow key={ movement.id }>
                      <TableCell>{
                        movement.concept === 'income'
                        ? <p style={ { color: 'green' } }>Ingreso ▲</p>
                        : <p style={ { color: 'red' } }>Egreso ▼</p>
                      }</TableCell>
                      <TableCell>{ movement.amount }</TableCell>
                      <TableCell>{ formatDate(movement.createdAt) }</TableCell>
                      <TableCell>{ movement.user?.name }</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={ 3 }>Total</TableCell>
                  <TableCell>{ totalAmount ? totalAmount : 0 }</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
      }
      {
        error && <h1>Something went wrong.</h1>
      }
    </>
  );

};

Finance.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default Finance;
