import { User } from './User';

export interface Movement {
  id: string;
  amount: number;
  concept: string;
  createdAt: string;
  userId?: string;
  user?: User;
}

export interface Financials {
  name: string;
  incomes: number;
  expenses: number;
}
