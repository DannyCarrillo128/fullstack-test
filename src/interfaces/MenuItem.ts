import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { LucideProps } from 'lucide-react';

export interface MenuItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
};
