import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Budget, Expense, FinancialGoal, Investment } from '../types';

interface State {
  monthlyIncome: number;
  expenses: Expense[];
  investments: Investment[];
  budgets: Budget[];
  goals: FinancialGoal[];
  setMonthlyIncome: (income: number) => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addInvestment: (investment: Investment) => void;
  updateInvestment: (id: string, investment: Investment) => void;
  deleteInvestment: (id: string) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, budget: Budget) => void;
  deleteBudget: (id: string) => void;
  addGoal: (goal: FinancialGoal) => void;
  updateGoal: (id: string, goal: FinancialGoal) => void;
  deleteGoal: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      monthlyIncome: 0,
      expenses: [],
      investments: [],
      budgets: [],
      goals: [],
      setMonthlyIncome: (income) => set({ monthlyIncome: income }),
      addExpense: (expense) =>
        set((state) => ({ expenses: [...state.expenses, expense] })),
      updateExpense: (id, expense) =>
        set((state) => ({
          expenses: state.expenses.map((e) => (e.id === id ? expense : e)),
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      addInvestment: (investment) =>
        set((state) => ({ investments: [...state.investments, investment] })),
      updateInvestment: (id, investment) =>
        set((state) => ({
          investments: state.investments.map((i) => (i.id === id ? investment : i)),
        })),
      deleteInvestment: (id) =>
        set((state) => ({
          investments: state.investments.filter((i) => i.id !== id),
        })),
      addBudget: (budget) =>
        set((state) => ({ budgets: [...state.budgets, budget] })),
      updateBudget: (id, budget) =>
        set((state) => ({
          budgets: state.budgets.map((b) => (b.id === id ? budget : b)),
        })),
      deleteBudget: (id) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        })),
      addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
      updateGoal: (id, goal) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? goal : g)),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),
    }),
    {
      name: 'bekipte-storage',
    }
  )
);