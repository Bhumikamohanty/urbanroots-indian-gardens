
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface GoalSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const goals = [
  {
    id: 'grow_food',
    label: 'Grow your own veggies/herbs',
  },
  {
    id: 'aesthetics',
    label: 'Create a peaceful aesthetic space',
  },
  {
    id: 'air_quality',
    label: 'Improve air quality',
  },
  {
    id: 'hobby',
    label: 'Hobbies/stress relief',
  },
  {
    id: 'pet_friendly',
    label: 'Pet-friendly garden',
  },
  {
    id: 'educational',
    label: 'Educational for kids',
  },
];

const GoalSelector: React.FC<GoalSelectorProps> = ({ value, onChange }) => {
  const handleCheckboxChange = (goalId: string, checked: boolean) => {
    if (checked) {
      onChange([...value, goalId]);
    } else {
      onChange(value.filter((id) => id !== goalId));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {goals.map((goal) => (
        <div key={goal.id} className="flex items-center space-x-2">
          <Checkbox 
            id={`goal-${goal.id}`} 
            checked={value.includes(goal.id)}
            onCheckedChange={(checked) => handleCheckboxChange(goal.id, checked as boolean)}
          />
          <Label htmlFor={`goal-${goal.id}`} className="cursor-pointer">{goal.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default GoalSelector;
