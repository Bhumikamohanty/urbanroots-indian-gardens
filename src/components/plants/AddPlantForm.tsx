
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddPlantFormProps {
  onAddPlant: (plantData: {
    name: string;
    type: string;
    image: string;
    waterFrequency: string;
    sunlight: string;
  }) => Promise<void>;
  isLoading: boolean;
}

const plantTypes = [
  'Herb',
  'Vegetable',
  'Fruit',
  'Flowering Plant',
  'Indoor Plant',
  'Succulent',
  'Climber',
  'Other'
];

const sunlightOptions = [
  'Full Sun',
  'Partial Sun',
  'Shade',
  'Indirect Light'
];

const waterFrequencyOptions = [
  'Daily',
  'Every 2-3 days',
  'Weekly',
  'Every 2 weeks',
  'Monthly'
];

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onAddPlant, isLoading }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [waterFrequency, setWaterFrequency] = useState('');
  const [sunlight, setSunlight] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !waterFrequency || !sunlight) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Default image if none provided
    const plantImage = image || 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=500&auto=format&fit=crop';
    
    try {
      await onAddPlant({
        name,
        type,
        image: plantImage,
        waterFrequency,
        sunlight
      });
      
      // Reset form
      setName('');
      setType('');
      setImage('');
      setWaterFrequency('');
      setSunlight('');
      
    } catch (error) {
      console.error('Add plant error:', error);
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">Plant Name*</Label>
        <Input 
          id="name"
          placeholder="e.g., Tulsi, Mint, Aloe Vera"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="ur-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Plant Type*</Label>
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger className="ur-input">
            <SelectValue placeholder="Select plant type" />
          </SelectTrigger>
          <SelectContent>
            {plantTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <Input 
          id="image"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="ur-input"
        />
        <p className="text-xs text-gray-500">Leave blank to use a default image</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="waterFrequency">Watering Frequency*</Label>
        <Select value={waterFrequency} onValueChange={setWaterFrequency} required>
          <SelectTrigger className="ur-input">
            <SelectValue placeholder="How often to water" />
          </SelectTrigger>
          <SelectContent>
            {waterFrequencyOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sunlight">Sunlight Requirement*</Label>
        <Select value={sunlight} onValueChange={setSunlight} required>
          <SelectTrigger className="ur-input">
            <SelectValue placeholder="How much sunlight needed" />
          </SelectTrigger>
          <SelectContent>
            {sunlightOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-ur-green hover:bg-ur-green/90 text-white mt-4"
        disabled={isLoading}
      >
        {isLoading ? 'Adding Plant...' : 'Add Plant'}
      </Button>
    </form>
  );
};

export default AddPlantForm;
