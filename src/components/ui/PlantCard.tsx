
import React from 'react';
import { Plant } from '@/data/plants';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PlantCardProps {
  plant: Plant;
  onDelete: (id: string) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onDelete }) => {
  const handleDelete = () => {
    onDelete(plant.id);
    toast.success(`${plant.name} has been removed from your plants`);
  };

  // Format date
  const formattedDate = new Date(plant.dateAdded).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className="ur-card hover-glow animate-fade-in">
      <div className="h-48 overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-full object-cover hover-grow"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-ur-green">{plant.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{plant.type}</p>
        <div className="space-y-1 mt-3">
          <p className="text-sm"><span className="font-medium">Water:</span> {plant.waterFrequency}</p>
          <p className="text-sm"><span className="font-medium">Sunlight:</span> {plant.sunlight}</p>
          <p className="text-sm"><span className="font-medium">Added on:</span> {formattedDate}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" className="text-ur-blue border-ur-blue hover:bg-ur-blue hover:text-white">
          View Details
        </Button>
        <Button 
          variant="ghost" 
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
