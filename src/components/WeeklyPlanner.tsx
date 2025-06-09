import React, { useState } from 'react';
import { Goal } from '../types';
import { GoalCard } from './GoalCard';
import { AddGoalForm } from './AddGoalForm';
import { Plus, Calendar, TrendingUp, Star } from 'lucide-react';

interface WeeklyPlannerProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  onToggleGoal: (id: string) => void;
}

export function WeeklyPlanner({ goals, onAddGoal, onToggleGoal }: WeeklyPlannerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  });
  const [priorities, setPriorities] = useState<string[]>(['']);
  const [reflection, setReflection] = useState('');
  const [achievements, setAchievements] = useState<string[]>(['']);

  const weekStart = new Date(selectedWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekGoals = goals.filter(goal => {
    if (!goal.dueDate) return false;
    const goalDate = new Date(goal.dueDate);
    return goalDate >= weekStart && goalDate <= weekEnd;
  });

  const completedGoals = weekGoals.filter(goal => goal.completed);
  const completionRate = weekGoals.length > 0 ? (completedGoals.length / weekGoals.length) * 100 : 0;

  const addPriority = () => {
    setPriorities([...priorities, '']);
  };

  const updatePriority = (index: number, value: string) => {
    const newPriorities = [...priorities];
    newPriorities[index] = value;
    setPriorities(newPriorities);
  };

  const removePriority = (index: number) => {
    setPriorities(priorities.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    setAchievements([...achievements, '']);
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Weekly Planner</h2>
            <p className="text-purple-100">Plan your week strategically</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-200" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-purple-100">Week Progress</p>
            <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-purple-100">Total Goals</p>
            <p className="text-2xl font-bold">{weekGoals.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-purple-100">Completed</p>
            <p className="text-2xl font-bold">{completedGoals.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-purple-100">Remaining</p>
            <p className="text-2xl font-bold">{weekGoals.length - completedGoals.length}</p>
          </div>
        </div>
      </div>

      {/* Week Selection */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Week (Monday)
            </label>
            <input
              type="date"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Week of</p>
            <p className="font-semibold text-gray-900">
              {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Priorities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Weekly Priorities</span>
            </h3>
            <button
              onClick={addPriority}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Priority
            </button>
          </div>
          
          <div className="space-y-3">
            {priorities.map((priority, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={priority}
                  onChange={(e) => updatePriority(index, e.target.value)}
                  placeholder="Enter a priority for this week..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {priorities.length > 1 && (
                  <button
                    onClick={() => removePriority(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Achievements */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Achievements</span>
            </h3>
            <button
              onClick={addAchievement}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Achievement
            </button>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(index, e.target.value)}
                  placeholder="Celebrate your wins..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Goals for Week of {weekStart.toLocaleDateString()}
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Goal</span>
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6">
            <AddGoalForm
              onAdd={(goal) => {
                onAddGoal({
                  ...goal,
                  dueDate: goal.dueDate || weekEnd,
                });
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="space-y-3">
          {weekGoals.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No goals set for this week</p>
              <p className="text-sm text-gray-400">Add your first goal to get started!</p>
            </div>
          ) : (
            weekGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={onToggleGoal}
              />
            ))
          )}
        </div>
      </div>

      {/* Weekly Reflection */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Reflection</h3>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Reflect on your week: What went well? What could be improved? What did you learn?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={6}
        />
      </div>
    </div>
  );
}
