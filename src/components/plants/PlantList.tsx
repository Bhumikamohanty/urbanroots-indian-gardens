
import React from 'react';
import { Plant } from '@/data/plants';
import PlantCard from '@/components/ui/PlantCard';

interface PlantListProps {
  plants: Plant[];
  onDeletePlant: (id: string) => void;
}

const PlantList: React.FC<PlantListProps> = ({ plants, onDeletePlant }) => {
  if (plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <img 
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=500&auto=format&fit=crop" 
          alt="No plants" 
          className="w-40 h-40 object-cover rounded-full mb-4 opacity-60"
        />
        <h3 className="text-xl font-bold text-ur-green mb-2">No plants yet!</h3>
        <p className="text-gray-500 max-w-md mb-4">
          You haven't added any plants to your collection yet. 
          Start by adding your first plant using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onDelete={onDeletePlant} />
      ))}
    </div>
  );
};

export default PlantList;
