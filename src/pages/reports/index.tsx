import type { ReactElement } from 'react';

import { Sidebar } from '@/components/Sidebar';

export const Reports = () => {

  return (
    <>
      <h1>Reports works!</h1>
    </>
  );

};

Reports.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default Reports;
