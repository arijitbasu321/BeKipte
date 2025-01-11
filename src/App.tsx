import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Expenses } from './pages/Expenses';
import { Investments } from './pages/Investments';
import { More } from './pages/More';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <Expenses />;
      case 'investments':
        return <Investments />;
      case 'more':
        return <More />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;