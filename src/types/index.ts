export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'career' | 'personal' | 'finance' | 'education' | 'relationships';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export interface DailyPlan {
  id: string;
  date: Date;
  goals: Goal[];
  notes: string;
  mood: 'excellent' | 'good' | 'neutral' | 'poor';
  energyLevel: number; // 1-10
}

export interface WeeklyPlan {
  id: string;
  weekStart: Date;
  weekEnd: Date;
  goals: Goal[];
  priorities: string[];
  reflection: string;
  achievements: string[];
}
