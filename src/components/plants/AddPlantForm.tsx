
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Image } from 'lucide-react';

interface AddPlantFormProps {
  onAddPlant: (plantData: {
    name: string;
    species?: string;
    type: string;
    image: string;
    waterFrequency: string;
    sunlight: string;
    notes?: string;
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
  'Medicinal',
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
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [waterFrequency, setWaterFrequency] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
      // Clear the URL input since we're using uploaded file
      setImage('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !waterFrequency || !sunlight) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    let plantImage = image;
    
    // If we have an uploaded image, we would normally upload it to a server
    // For this demo, we'll just use the preview URL or fall back to default image
    if (uploadedImage && imagePreview) {
      plantImage = imagePreview;
    }
    
    // Default image if none provided
    if (!plantImage) {
      const typeMap: Record<string, string> = {
        'Herb': "https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690",
        'Succulent': "https://plantlife.ie/wp-content/uploads/2022/10/alar1535__000000.jpg",
        'Indoor Plant': "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=500&auto=format&fit=crop",
        'Vegetable': "https://images.unsplash.com/photo-1592841200221-a4f8cad509a4?q=80&w=500&auto=format&fit=crop",
        'Medicinal': "https://plantlife.ie/wp-content/uploads/2022/10/alar1535__000000.jpg",
        'Fruit': "https://images.unsplash.com/photo-1572364709125-9a4557550efb?q=80&w=500&auto=format&fit=crop"
      };
      
      plantImage = typeMap[type] || 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=500&auto=format&fit=crop';
    }
    
    try {
      await onAddPlant({
        name,
        species: species || undefined,
        type,
        image: plantImage,
        waterFrequency,
        sunlight,
        notes: notes || undefined
      });
      
      // Reset form
      setName('');
      setSpecies('');
      setType('');
      setImage('');
      setWaterFrequency('');
      setSunlight('');
      setNotes('');
      setUploadedImage(null);
      setImagePreview(null);
      
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
        <Label htmlFor="species">Species (optional)</Label>
        <Input 
          id="species"
          placeholder="e.g., Ocimum basilicum"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
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
      
      <div className="space-y-2">
        <Label>Plant Image</Label>
        {imagePreview ? (
          <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-300">
            <img 
              src={imagePreview} 
              alt="Plant preview" 
              className="w-full h-full object-cover"
            />
            <Button 
              type="button" 
              variant="destructive" 
              size="sm" 
              className="absolute top-2 right-2" 
              onClick={() => {
                setImagePreview(null);
                setUploadedImage(null);
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <div
              className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-ur-green"
              onClick={() => document.getElementById('plant-image-upload')?.click()}
            >
              <Image className="h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">JPG, PNG or WEBP (max 5MB)</p>
              <input
                id="plant-image-upload"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Or enter image URL</Label>
              <Input 
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="ur-input"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea 
          id="notes"
          placeholder="Add any special care instructions or notes about your plant"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="ur-input min-h-[100px]"
        />
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-1/3"
          onClick={() => {
            setName('');
            setSpecies('');
            setType('');
            setImage('');
            setWaterFrequency('');
            setSunlight('');
            setNotes('');
            setUploadedImage(null);
            setImagePreview(null);
          }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="w-2/3 bg-ur-green hover:bg-ur-green/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Adding Plant...' : (
            <>
              <Plus className="mr-2 h-4 w-4" /> 
              Add Plant
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddPlantForm;
