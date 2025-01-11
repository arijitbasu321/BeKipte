import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Investment } from '../types';

export function Investments() {
  const { investments, addInvestment, updateInvestment, deleteInvestment } =
    useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);

  const investmentTypes = [
    'stocks',
    'mutualFunds',
    'bonds',
    'gold',
    'realEstate',
  ] as const;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const investment: Investment = {
      id: selectedInvestment?.id || crypto.randomUUID(),
      type: formData.get('type') as Investment['type'],
      name: formData.get('name') as string,
      amount: Number(formData.get('amount')),
      purchaseDate: formData.get('purchaseDate') as string,
      currentValue: Number(formData.get('currentValue')),
      details: {},
    };

    if (selectedInvestment) {
      updateInvestment(selectedInvestment.id, investment);
    } else {
      addInvestment(investment);
    }

    setIsAdding(false);
    setSelectedInvestment(null);
    e.currentTarget.reset();
  };

  const calculateReturn = (investment: Investment) => {
    const returnAmount = investment.currentValue - investment.amount;
    const returnPercentage = (returnAmount / investment.amount) * 100;
    return {
      amount: returnAmount,
      percentage: returnPercentage,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Investments</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Investment
        </button>
      </div>

      {(isAdding || selectedInvestment) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedInvestment ? 'Edit Investment' : 'Add Investment'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  defaultValue={selectedInvestment?.type}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {investmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={selectedInvestment?.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Investment Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  defaultValue={selectedInvestment?.amount}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="currentValue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Value
                </label>
                <input
                  type="number"
                  id="currentValue"
                  name="currentValue"
                  defaultValue={selectedInvestment?.currentValue}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="purchaseDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  defaultValue={selectedInvestment?.purchaseDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setSelectedInvestment(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {selectedInvestment ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {investments.map((investment) => {
          const returns = calculateReturn(investment);
          return (
            <div
              key={investment.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {investment.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {investment.type}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedInvestment(investment)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteInvestment(investment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Invested Amount
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      ${investment.amount.toFixed(2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Current Value
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      ${investment.currentValue.toFixed(2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Returns</dt>
                    <dd
                      className={`mt-1 text-lg font-semibold ${
                        returns.amount >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      ${returns.amount.toFixed(2)} ({returns.percentage.toFixed(2)}
                      %)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Purchase Date
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {new Date(investment.purchaseDate).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}