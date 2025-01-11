import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Expense, ExpenseCategory } from '../types';

export function Expenses() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const categories: ExpenseCategory[] = [
    'groceries',
    'utilities',
    'entertainment',
    'transportation',
    'housing',
    'healthcare',
    'education',
    'other',
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const expense: Expense = {
      id: selectedExpense?.id || crypto.randomUUID(),
      category: formData.get('category') as ExpenseCategory,
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      description: formData.get('description') as string,
    };

    if (selectedExpense) {
      updateExpense(selectedExpense.id, expense);
    } else {
      addExpense(expense);
    }

    setIsAdding(false);
    setSelectedExpense(null);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Expense
        </button>
      </div>

      {(isAdding || selectedExpense) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedExpense ? 'Edit Expense' : 'Add Expense'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={selectedExpense?.category}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  defaultValue={selectedExpense?.amount}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={selectedExpense?.date}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={selectedExpense?.description}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setSelectedExpense(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {selectedExpense ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {expense.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {expense.category}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${expense.amount.toFixed(2)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedExpense(expense)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}