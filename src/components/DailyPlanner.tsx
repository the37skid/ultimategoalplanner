import React, { useState } from 'react';
import { Goal } from '../types';
import { GoalCard } from './GoalCard';
import { AddGoalForm } from './AddGoalForm';
import { Plus, Calendar, Smile, Meh, Frown, Battery } from 'lucide-react';

interface DailyPlannerProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  onToggleGoal: (id: string) => void;
}

export function DailyPlanner({ goals, onAddGoal, onToggleGoal }: DailyPlannerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState<'excellent' | 'good' | 'neutral' | 'poor'>('good');
  const [energyLevel, setEnergyLevel] = useState(7);
  const [notes, setNotes] = useState('');

  const todayGoals = goals.filter(goal => {
    const goalDate = goal.dueDate ? new Date(goal.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    return goalDate === selectedDate;
  });

  const completedGoals = todayGoals.filter(goal => goal.completed);
  const completionRate = todayGoals.length > 0 ? (completedGoals.length / todayGoals.length) * 100 : 0;

  const moodIcons = {
    excellent: <Smile className="h-5 w-5 text-green-500" />,
    good: <Smile className="h-5 w-5 text-blue-500" />,
    neutral: <Meh className="h-5 w-5 text-yellow-500" />,
    poor: <Frown className="h-5 w-5 text-red-500" />,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Daily Planner</h2>
            <p className="text-blue-100">Plan your day for success</p>
          </div>
          <Calendar className="h-8 w-8 text-blue-200" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-blue-100">Completion Rate</p>
            <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-blue-100">Goals Today</p>
            <p className="text-2xl font-bold">{todayGoals.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-blue-100">Completed</p>
            <p className="text-2xl font-bold">{completedGoals.length}</p>
          </div>
        </div>
      </div>

      {/* Date and Mood Tracker */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood
            </label>
            <div className="flex space-x-2">
              {(['excellent', 'good', 'neutral', 'poor'] as const).map((moodOption) => (
                <button
                  key={moodOption}
                  onClick={() => setMood(moodOption)}
                  className={`p-2 rounded-lg transition-colors ${
                    mood === moodOption ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {moodIcons[moodOption]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Level: {energyLevel}/10
            </label>
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Goals for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
                  dueDate: new Date(selectedDate),
                });
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="space-y-3">
          {todayGoals.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No goals set for this day</p>
              <p className="text-sm text-gray-400">Add your first goal to get started!</p>
            </div>
          ) : (
            todayGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={onToggleGoal}
              />
            ))
          )}
        </div>
      </div>

      {/* Daily Notes */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Reflect on your day, jot down thoughts, or plan for tomorrow..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
      </div>
    </div>
  );
}
