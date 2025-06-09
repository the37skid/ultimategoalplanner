import React from 'react';
import { Goal } from '../types';
import { TrendingUp, Target, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface OverviewProps {
  goals: Goal[];
}

export function Overview({ goals }: OverviewProps) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.completed).length;
  const pendingGoals = totalGoals - completedGoals;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const categoryStats = goals.reduce((acc, goal) => {
    acc[goal.category] = (acc[goal.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityStats = goals.reduce((acc, goal) => {
    acc[goal.priority] = (acc[goal.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentGoals = goals
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const upcomingGoals = goals
    .filter(goal => !goal.completed && goal.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-8 text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Goal Journey</h1>
          <p className="text-indigo-100 text-lg">Track your progress and celebrate your achievements</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-3 text-indigo-200" />
            <p className="text-2xl font-bold">{totalGoals}</p>
            <p className="text-sm text-indigo-100">Total Goals</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-300" />
            <p className="text-2xl font-bold">{completedGoals}</p>
            <p className="text-sm text-indigo-100">Completed</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
            <p className="text-2xl font-bold">{pendingGoals}</p>
            <p className="text-sm text-indigo-100">In Progress</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-pink-300" />
            <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
            <p className="text-sm text-indigo-100">Success Rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Goals by Category</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = (count / totalGoals) * 100;
              const categoryColors = {
                health: 'bg-green-500',
                career: 'bg-blue-500',
                personal: 'bg-purple-500',
                finance: 'bg-yellow-500',
                education: 'bg-indigo-500',
                relationships: 'bg-pink-500',
              };
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${categoryColors[category as keyof typeof categoryColors]}`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${categoryColors[category as keyof typeof categoryColors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(priorityStats).map(([priority, count]) => {
              const percentage = (count / totalGoals) * 100;
              const priorityColors = {
                high: 'bg-red-500',
                medium: 'bg-yellow-500',
                low: 'bg-gray-500',
              };
              
              return (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${priorityColors[priority as keyof typeof priorityColors]}`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">{priority} Priority</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${priorityColors[priority as keyof typeof priorityColors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Goals */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Goals</h3>
          
          {recentGoals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No goals yet</p>
              <p className="text-sm text-gray-400">Start by adding your first goal!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${goal.completed ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {goal.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(goal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                    goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {goal.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Deadlines</h3>
          
          {upcomingGoals.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming deadlines</p>
              <p className="text-sm text-gray-400">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingGoals.map((goal) => {
                const daysUntilDue = Math.ceil((new Date(goal.dueDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isOverdue = daysUntilDue < 0;
                const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;
                
                return (
                  <div key={goal.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      isOverdue ? 'bg-red-500' : isDueSoon ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                      <p className={`text-xs ${
                        isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {isOverdue ? `Overdue by ${Math.abs(daysUntilDue)} days` :
                         daysUntilDue === 0 ? 'Due today' :
                         daysUntilDue === 1 ? 'Due tomorrow' :
                         `Due in ${daysUntilDue} days`}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      goal.category === 'health' ? 'bg-green-100 text-green-800' :
                      goal.category === 'career' ? 'bg-blue-100 text-blue-800' :
                      goal.category === 'personal' ? 'bg-purple-100 text-purple-800' :
                      goal.category === 'finance' ? 'bg-yellow-100 text-yellow-800' :
                      goal.category === 'education' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {goal.category}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
