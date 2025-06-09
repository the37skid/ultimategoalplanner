import React from 'react';
import { Goal } from '../types';
import { CheckCircle2, Circle, Clock, Flag } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onEdit?: (goal: Goal) => void;
}

const categoryColors = {
  health: 'bg-green-100 text-green-800',
  career: 'bg-blue-100 text-blue-800',
  personal: 'bg-purple-100 text-purple-800',
  finance: 'bg-yellow-100 text-yellow-800',
  education: 'bg-indigo-100 text-indigo-800',
  relationships: 'bg-pink-100 text-pink-800',
};

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export function GoalCard({ goal, onToggle, onEdit }: GoalCardProps) {
  return (
    <div className={`p-4 rounded-lg border transition-all hover:shadow-md ${
      goal.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(goal.id)}
          className="mt-1 transition-colors"
        >
          {goal.completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 hover:text-blue-600" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {goal.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Flag className={`h-4 w-4 ${priorityColors[goal.priority]}`} />
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[goal.category]}`}>
                {goal.category}
              </span>
            </div>
          </div>
          
          {goal.description && (
            <p className={`text-sm mb-2 ${goal.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {goal.description}
            </p>
          )}
          
          {goal.dueDate && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
