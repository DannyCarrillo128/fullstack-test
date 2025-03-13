import type { ReactElement } from 'react';

import { useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { GET_USERS_FINANCIALS } from '../../../lib/graphql/queries';
import { Sidebar } from '@/components/Sidebar';

export const Reports = () => {

  const { data } = useQuery(GET_USERS_FINANCIALS);
  const financials = data?.getUsersFinancials;

  const chartConfig = {
    incomes: {
      label: "Ingresos",
      color: "#ffb900",
    },
    expenses: {
      label: "Egresos",
      color: "#ff9339",
    },
  } satisfies ChartConfig;

  const downloadCSV = async () => {
    const csvData = financials.map(({ __typename, ...rest }: any) => rest);
    
    try {
      const response = await fetch('/api/generate-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(csvData)
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporte.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {
        financials
        ?  <>
            <div className="grid justify-items-center">
              <Card className="w-[800px] h-max">
                <CardHeader>
                  <CardTitle>Resumen de movimientos financieros</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={ chartConfig }>
                    <BarChart accessibilityLayer data={ financials }>
                      <CartesianGrid vertical={ false } />
                      <XAxis
                        dataKey="name"
                        tickLine={ false }
                        tickMargin={ 10 }
                        axisLine={ false }
                        tickFormatter={ (value) => value.slice(0, 4) }
                      />
                      <ChartTooltip cursor={ false } content={ <ChartTooltipContent indicator="dashed" /> } />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="incomes" fill="var(--color-incomes)" radius={ 4 } />
                      <Bar dataKey="expenses" fill="var(--color-expenses)" radius={ 4 } />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    Monto total de ingresos y egresos por usuario
                  </div>
                </CardFooter>
              </Card>
              <Button
                onClick={ downloadCSV }
                className="my-7"
                size={ 'lg' }
              >
                Descargar .csv
              </Button>
            </div>
          </>
        : <>
            <div className="grid justify-items-center">
              <Skeleton className="w-[800px] h-[700px] rounded-xl" />
              <Skeleton className="w-[150px] h-[50px] rounded-xl my-7" />
            </div>
          </>
      }
    </>
  );

};

Reports.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default Reports;
