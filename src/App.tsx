import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Calculator } from './components/calculator/Calculator';
import { FoodDiary } from './components/diary/FoodDiary';
import { Progress } from './components/progress/Progress';
import { Profile } from './components/profile/Profile';

const PageRouter: React.FC = () => {
  const { currentPage } = useUser();

  switch (currentPage) {
    case 'dashboard': return <Dashboard />;
    case 'calculator': return <Calculator />;
    case 'diary': return <FoodDiary />;
    case 'progress': return <Progress />;
    case 'profile': return <Profile />;
    default: return <Dashboard />;
  }
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Layout>
        <PageRouter />
      </Layout>
    </UserProvider>
  );
};

export default App;
