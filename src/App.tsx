import React, { useState } from 'react';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { DailyPlanner } from './components/DailyPlanner';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { Goal } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'overview'>('overview');
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', []);

  const addGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setGoals([...goals, newGoal]);
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview goals={goals} />;
      case 'daily':
        return (
          <DailyPlanner
            goals={goals}
            onAddGoal={addGoal}
            onToggleGoal={toggleGoal}
          />
        );
      case 'weekly':
        return (
          <WeeklyPlanner
            goals={goals}
            onAddGoal={addGoal}
            onToggleGoal={toggleGoal}
          />
        );
      default:
        return <Overview goals={goals} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
