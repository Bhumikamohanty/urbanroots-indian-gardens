
import React from 'react';

interface VibeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const vibeOptions = [
  {
    id: 'rustic',
    name: 'Rustic charm',
    emoji: '🧺',
    description: 'Earthy tones, terracotta pots, and natural materials'
  },
  {
    id: 'modern',
    name: 'Modern minimalist',
    emoji: '✨',
    description: 'Clean lines, geometric planters, and organized layouts'
  },
  {
    id: 'jungle',
    name: 'Jungle vibes',
    emoji: '🏕️',
    description: 'Lush, dense greenery with diverse plant varieties'
  },
  {
    id: 'homely',
    name: 'Homely warmth',
    emoji: '🏡',
    description: 'Cozy, inviting setup with comfortable seating'
  },
  {
    id: 'colorful',
    name: 'Color burst',
    emoji: '🎨',
    description: 'Vibrant blooms and bright, cheerful elements'
  }
];

const VibeSelector: React.FC<VibeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {vibeOptions.map((vibe) => (
        <div
          key={vibe.id}
          className={`
            border rounded-md p-4 cursor-pointer transition-all hover:border-ur-green hover:bg-ur-green/5
            ${value === vibe.id ? 'border-ur-green bg-ur-green/10 ring-2 ring-ur-green/20' : 'border-gray-200'}
          `}
          onClick={() => onChange(vibe.id)}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{vibe.emoji}</span>
            <h4 className="font-medium text-gray-900">{vibe.name}</h4>
          </div>
          <p className="text-sm text-gray-500">{vibe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default VibeSelector;
