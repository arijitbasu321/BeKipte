import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useStore } from '../store/useStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  const { monthlyIncome, expenses, budgets, goals } = useStore();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = monthlyIncome - totalExpenses;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [monthlyIncome, totalExpenses],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Monthly Income</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            ${monthlyIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Expenses</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Savings</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${savings.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Financial Overview
        </h3>
        <Line data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Budget Overview
          </h3>
          {budgets.map((budget) => (
            <div key={budget.id} className="mb-4">
              <div className="flex justify-between text-sm font-medium text-gray-900">
                <span>{budget.category}</span>
                <span>
                  ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                </span>
              </div>
              <div className="mt-1 relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(budget.spent / budget.limit) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Financial Goals
          </h3>
          {goals.map((goal) => (
            <div key={goal.id} className="mb-4">
              <div className="flex justify-between text-sm font-medium text-gray-900">
                <span>{goal.name}</span>
                <span>
                  ${goal.currentAmount.toFixed(2)} / $
                  {goal.targetAmount.toFixed(2)}
                </span>
              </div>
              <div className="mt-1 relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${(goal.currentAmount / goal.targetAmount) * 100}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}