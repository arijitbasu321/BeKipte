import React from 'react';
import { Menu, PieChart, Target, Wallet, IndianRupee } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function Layout({ children, currentTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'dashboard', icon: PieChart, label: 'Dashboard' },
    { id: 'expenses', icon: Wallet, label: 'Expenses' },
    { id: 'investments', icon: Target, label: 'Investments' },
    { id: 'more', icon: Menu, label: 'More' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BeKipte
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="flex justify-around bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-indigo-100 p-2 mx-2">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={cn(
                  'flex flex-col items-center py-2 px-4 rounded-xl transition-all',
                  currentTab === id
                    ? 'text-indigo-600 bg-indigo-50 scale-110'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}