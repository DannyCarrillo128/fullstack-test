import {
  DollarSign,
  FileChartColumnIncreasing,
  UsersRound
} from 'lucide-react';

export const Menu = {
  user: [
    { title: 'Movimientos', url: '/finance', icon: DollarSign }
  ],
  admin: [
    { title: 'Movimientos', url: '/finance', icon: DollarSign },
    { title: 'Usuarios', url: '/users', icon: UsersRound },
    { title: 'Reportes', url: '/reports', icon: FileChartColumnIncreasing }
  ]
};
