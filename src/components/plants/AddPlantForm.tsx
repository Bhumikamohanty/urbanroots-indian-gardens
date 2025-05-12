
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Image, Search, Leaf, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

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

// Predefined plant suggestions based on conditions
const suggestedPlants = {
  beginner: {
    hot: ['Aloe Vera', 'Snake Plant', 'Mint', 'Basil'],
    moderate: ['Mint', 'Basil', 'Spinach', 'Cherry Tomatoes'],
    cold: ['Kale', 'Spinach', 'Parsley', 'Rosemary']
  },
  intermediate: {
    hot: ['Tulsi', 'Chillies', 'Curry Leaves', 'Ginger'],
    moderate: ['Tomatoes', 'Bell Peppers', 'Strawberries', 'Cilantro'],
    cold: ['Broccoli', 'Cauliflower', 'Lettuce', 'Radish']
  },
  advanced: {
    hot: ['Bitter Gourd', 'Okra', 'Eggplant', 'Lemongrass'],
    moderate: ['Cucumber', 'Zucchini', 'Beans', 'Peas'],
    cold: ['Cabbage', 'Brussels Sprouts', 'Onion', 'Garlic']
  }
};

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onAddPlant, isLoading }) => {
  // Known plant form fields
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [waterFrequency, setWaterFrequency] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Unknown plant form fields
  const [climate, setClimate] = useState<'hot' | 'moderate' | 'cold'>('moderate');
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [careTimeAvailable, setCareTimeAvailable] = useState<number>(3);
  const [suggestedPlantsList, setSuggestedPlantsList] = useState<string[]>([]);
  const [selectedSuggestedPlant, setSelectedSuggestedPlant] = useState<string | null>(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState('known');
  
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

  const handlePlantSearch = () => {
    setIsSearching(true);
    // Simulate plant search API call
    setTimeout(() => {
      if (searchQuery.trim() !== '') {
        setName(searchQuery);
        setIsSearching(false);
        toast.success(`Found information for ${searchQuery}`);
        
        // Set default values based on search
        if (!type) setType('Herb');
        if (!waterFrequency) setWaterFrequency('Weekly');
        if (!sunlight) setSunlight('Partial Sun');
      } else {
        toast.error("Please enter a plant name to search");
        setIsSearching(false);
      }
    }, 1500);
  };
  
  const getSuggestedPlants = () => {
    const plants = suggestedPlants[experience][climate] || [];
    setSuggestedPlantsList(plants);
    return plants;
  };
  
  const handleSelectSuggestedPlant = (plantName: string) => {
    setSelectedSuggestedPlant(plantName);
    setName(plantName);
    
    // Set default values based on suggestion
    const plantTypeMap: Record<string, string> = {
      'Mint': 'Herb',
      'Basil': 'Herb',
      'Tulsi': 'Herb',
      'Aloe Vera': 'Succulent',
      'Snake Plant': 'Indoor Plant',
      'Cherry Tomatoes': 'Vegetable',
      'Tomatoes': 'Vegetable',
      'Chillies': 'Vegetable',
      'Spinach': 'Vegetable',
    };
    
    setType(plantTypeMap[plantName] || 'Herb');
    setWaterFrequency(climate === 'hot' ? 'Daily' : climate === 'moderate' ? 'Every 2-3 days' : 'Weekly');
    setSunlight(climate === 'hot' ? 'Partial Sun' : climate === 'moderate' ? 'Full Sun' : 'Partial Sun');
    
    toast.success(`Selected ${plantName}. Details pre-filled based on your conditions.`);
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
      setSearchQuery('');
      setSelectedSuggestedPlant(null);
      
    } catch (error) {
      console.error('Add plant error:', error);
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="known" className="text-center">
            I know my plant
          </TabsTrigger>
          <TabsTrigger value="unknown" className="text-center">
            Suggest plants for me
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="known" className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="search">Search Plant</Label>
                <div className="flex gap-2">
                  <Input 
                    id="search"
                    placeholder="e.g., Tulsi, Aloe Vera"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ur-input"
                  />
                  <Button 
                    type="button" 
                    onClick={handlePlantSearch} 
                    disabled={isSearching}
                  >
                    {isSearching ? 'Searching...' : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Search for plant information or enter details manually
                </p>
              </div>
            </div>
          
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
          </div>
        </TabsContent>
        
        <TabsContent value="unknown" className="space-y-4">
          <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div>
              <Label className="mb-2 block">What's your local climate?</Label>
              <RadioGroup 
                value={climate} 
                onValueChange={(value) => setClimate(value as 'hot' | 'moderate' | 'cold')}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hot" id="hot" />
                  <Label htmlFor="hot" className="cursor-pointer">Hot</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="cursor-pointer">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cold" id="cold" />
                  <Label htmlFor="cold" className="cursor-pointer">Cold</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="mb-2 block">Your gardening experience</Label>
              <RadioGroup 
                value={experience} 
                onValueChange={(value) => setExperience(value as 'beginner' | 'intermediate' | 'advanced')}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">Advanced</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="mb-2 block">
                Time available for gardening (minutes/day): {careTimeAvailable}
              </Label>
              <Slider 
                value={[careTimeAvailable]} 
                onValueChange={(value) => setCareTimeAvailable(value[0])}
                min={1}
                max={30}
                step={1}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 min</span>
                <span>15 min</span>
                <span>30 min</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={() => getSuggestedPlants()}
              className="w-full"
            >
              <Leaf className="mr-2 h-4 w-4" />
              Get Plant Suggestions
            </Button>
            
            {suggestedPlantsList.length > 0 && (
              <div className="mt-4">
                <Label className="mb-2 block">Suggested Plants</Label>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedPlantsList.map((plant) => (
                    <Button
                      key={plant}
                      type="button"
                      variant={selectedSuggestedPlant === plant ? "default" : "outline"}
                      className={`justify-start ${selectedSuggestedPlant === plant ? 'bg-ur-green text-white' : ''}`}
                      onClick={() => handleSelectSuggestedPlant(plant)}
                    >
                      {selectedSuggestedPlant === plant && <Check className="mr-2 h-4 w-4" />}
                      {plant}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {selectedSuggestedPlant && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  You've selected <strong>{selectedSuggestedPlant}</strong>. Additional details have been filled below.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
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
            setSearchQuery('');
            setActiveTab('known');
            setSelectedSuggestedPlant(null);
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
