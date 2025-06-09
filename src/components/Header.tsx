import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';

interface HeaderProps {
  activeTab: 'daily' | 'weekly' | 'overview';
  onTabChange: (tab: 'daily' | 'weekly' | 'overview') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Goal Planner</h1>
              <p className="text-sm text-gray-500">Achieve your dreams, one step at a time</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => onTabChange('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'daily'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Daily</span>
            </button>
            <button
              onClick={() => onTabChange('weekly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'weekly'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Weekly</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
