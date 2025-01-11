export type ExpenseCategory =
  | 'groceries'
  | 'utilities'
  | 'entertainment'
  | 'transportation'
  | 'housing'
  | 'healthcare'
  | 'education'
  | 'other';

export type Investment = {
  id: string;
  type: 'stocks' | 'mutualFunds' | 'bonds' | 'gold' | 'realEstate';
  name: string;
  amount: number;
  purchaseDate: string;
  currentValue: number;
  details: Record<string, any>;
};

export type Expense = {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string;
};

export type FinancialGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  type: 'savings' | 'investment';
};

export type Budget = {
  id: string;
  category: ExpenseCategory;
  limit: number;
  spent: number;
};