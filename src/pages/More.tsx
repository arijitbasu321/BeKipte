import React from 'react';
import { useStore } from '../store/useStore';

export function More() {
  const { monthlyIncome, setMonthlyIncome } = useStore();

  const handleIncomeChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const income = Number(formData.get('income'));
    setMonthlyIncome(income);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Monthly Income
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Update your monthly income to better track your finances.</p>
          </div>
          <form onSubmit={handleIncomeChange} className="mt-5">
            <div className="flex items-end space-x-4">
              <div>
                <label
                  htmlFor="income"
                  className="block text-sm font-medium text-gray-700"
                >
                  Income Amount
                </label>
                <input
                  type="number"
                  name="income"
                  id="income"
                  defaultValue={monthlyIncome}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            AI Financial Assistant
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Get personalized financial advice and insights based on your spending
              patterns and goals.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            About BeKipte
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              BeKipte is your personal finance companion, helping you track
              expenses, manage investments, and achieve your financial goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}