import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Calculator } from './components/calculator/Calculator';
import { FoodDiary } from './components/diary/FoodDiary';
import { Progress } from './components/progress/Progress';
import { Profile } from './components/profile/Profile';
import { WellnessDiary } from './components/wellness/WellnessDiary';
import { ActivityDiary } from './components/activity/ActivityDiary';
import { MeasurementsPage } from './components/measurements/MeasurementsPage';
import { Library } from './components/library/Library';

const PageRouter: React.FC = () => {
  const { currentPage } = useUser();

  switch (currentPage) {
    case 'dashboard': return <Dashboard />;
    case 'calculator': return <Calculator />;
    case 'diary': return <FoodDiary />;
    case 'progress': return <Progress />;
    case 'profile': return <Profile />;
    case 'wellness': return <WellnessDiary />;
    case 'activity': return <ActivityDiary />;
    case 'measurements': return <MeasurementsPage />;
    case 'library': return <Library />;
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
