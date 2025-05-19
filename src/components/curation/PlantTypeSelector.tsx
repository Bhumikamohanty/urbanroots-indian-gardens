
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface PlantTypeSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const plantTypes = [
  {
    id: 'herbs',
    label: 'Herbs',
    emoji: '🌿',
  },
  {
    id: 'edibles',
    label: 'Edibles',
    emoji: '🍓',
  },
  {
    id: 'flowers',
    label: 'Flowers',
    emoji: '🌷',
  },
  {
    id: 'succulents',
    label: 'Succulents',
    emoji: '🌵',
  },
  {
    id: 'bonsai',
    label: 'Bonsai',
    emoji: '🎍',
  },
  {
    id: 'medicinal',
    label: 'Medicinal',
    emoji: '🍀',
  },
];

const PlantTypeSelector: React.FC<PlantTypeSelectorProps> = ({ value, onChange }) => {
  const handleCheckboxChange = (plantId: string, checked: boolean) => {
    if (checked) {
      onChange([...value, plantId]);
    } else {
      onChange(value.filter((id) => id !== plantId));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {plantTypes.map((plant) => (
        <div key={plant.id} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
          <Checkbox 
            id={`plant-${plant.id}`} 
            checked={value.includes(plant.id)}
            onCheckedChange={(checked) => handleCheckboxChange(plant.id, checked as boolean)}
          />
          <Label htmlFor={`plant-${plant.id}`} className="cursor-pointer flex items-center gap-2">
            <span className="text-xl">{plant.emoji}</span> {plant.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default PlantTypeSelector;
