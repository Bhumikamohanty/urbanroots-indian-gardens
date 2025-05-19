
import React from 'react';
import { Leaf, Carrot, FlowerIcon, Sprout, Sun } from 'lucide-react';

interface GardenTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const gardenTypes = [
  {
    id: 'herb',
    name: 'Cozy herb corner',
    icon: <Leaf className="h-5 w-5" />,
    description: 'Perfect for fresh seasonings for your meals'
  },
  {
    id: 'veggie',
    name: 'Mini vegetable patch',
    icon: <Carrot className="h-5 w-5" />,
    description: 'Grow your own nutritious vegetables'
  },
  {
    id: 'flower',
    name: 'Flower oasis',
    icon: <FlowerIcon className="h-5 w-5" />,
    description: 'Beautiful blooms and fragrant plants'
  },
  {
    id: 'lowmaint',
    name: 'Low-maintenance greenery',
    icon: <Sprout className="h-5 w-5" />,
    description: 'Minimal care required, maximum beauty'
  },
  {
    id: 'relaxation',
    name: 'Relaxation + nature blend',
    icon: <Sun className="h-5 w-5" />,
    description: 'Create a peaceful retreat'
  }
];

const GardenTypeSelector: React.FC<GardenTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {gardenTypes.map((type) => (
        <div
          key={type.id}
          className={`
            border rounded-md p-4 cursor-pointer transition-all hover:border-ur-green hover:bg-ur-green/5
            ${value === type.id ? 'border-ur-green bg-ur-green/10 ring-2 ring-ur-green/20' : 'border-gray-200'}
          `}
          onClick={() => onChange(type.id)}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${value === type.id ? 'bg-ur-green text-white' : 'bg-gray-100'}`}>
              {type.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{type.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{type.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GardenTypeSelector;
