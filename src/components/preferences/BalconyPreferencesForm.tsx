
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Image, MapPin, Save } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

interface BalconyPreferencesFormProps {
  onSave: (preferences: {
    length: number;
    width: number;
    location: string;
    image?: string;
    yieldExpectation: string;
    purpose: string[];
  }) => Promise<void>;
  isLoading: boolean;
}

const purposeOptions = [
  'Health',
  'Hobby',
  'Aesthetics',
  'Sustainability',
  'Food Security',
  'Educational',
  'Stress Relief'
];

const yieldOptions = [
  'Few herbs only',
  'Mixed herbs and greens',
  'Full vegetable set',
  'Herbs and flowers',
  'Maximum possible yield'
];

const BalconyPreferencesForm: React.FC<BalconyPreferencesFormProps> = ({ onSave, isLoading }) => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [locationSearchTerm, setLocationSearchTerm] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [yieldExpectation, setYieldExpectation] = useState<string>('');
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [sunlightHours, setSunlightHours] = useState<number>(4);

  // Mock data for location suggestions
  const locationSuggestions = [
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bengaluru, Karnataka',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Pune, Maharashtra',
    'Jaipur, Rajasthan'
  ];
  
  const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false);
  
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
      setImage('');
    }
  };
  
  const handleLocationSearch = (term: string) => {
    setLocationSearchTerm(term);
    if (term.length > 1) {
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  };
  
  const selectLocation = (loc: string) => {
    setLocation(loc);
    setLocationSearchTerm(loc);
    setShowLocationSuggestions(false);
  };
  
  const togglePurpose = (purpose: string) => {
    setSelectedPurposes(prev => 
      prev.includes(purpose) 
        ? prev.filter(p => p !== purpose) 
        : [...prev, purpose]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!length || !width || !location || !yieldExpectation || selectedPurposes.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    let balconyImage = image;
    
    // If we have an uploaded image, use the preview URL
    if (uploadedImage && imagePreview) {
      balconyImage = imagePreview;
    }
    
    try {
      await onSave({
        length,
        width,
        location,
        image: balconyImage,
        yieldExpectation,
        purpose: selectedPurposes
      });
      
      toast.success('Garden preferences saved successfully!');
      
    } catch (error) {
      console.error('Save preferences error:', error);
      toast.error('Failed to save preferences. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="length">Balcony Length (feet)*</Label>
          <Input 
            id="length"
            type="number"
            placeholder="e.g., 10"
            value={length || ''}
            onChange={(e) => setLength(Number(e.target.value))}
            required
            min={1}
            className="ur-input"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="width">Balcony Width (feet)*</Label>
          <Input 
            id="width"
            type="number"
            placeholder="e.g., 5"
            value={width || ''}
            onChange={(e) => setWidth(Number(e.target.value))}
            required
            min={1}
            className="ur-input"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Your Location*</Label>
        <div className="relative">
          <div className="flex">
            <div className="relative flex-1">
              <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="location"
                placeholder="Search for your city"
                value={locationSearchTerm}
                onChange={(e) => handleLocationSearch(e.target.value)}
                className="ur-input pl-9"
              />
            </div>
          </div>
          
          {showLocationSuggestions && locationSearchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {locationSuggestions
                .filter(loc => loc.toLowerCase().includes(locationSearchTerm.toLowerCase()))
                .map((loc, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectLocation(loc)}
                  >
                    {loc}
                  </div>
                ))
              }
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">
          This helps us suggest plants suitable for your climate zone
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sunlightHours">
          Average hours of sunlight per day: {sunlightHours}
        </Label>
        <Slider 
          id="sunlightHours"
          value={[sunlightHours]} 
          onValueChange={(value) => setSunlightHours(value[0])}
          min={0}
          max={12}
          step={1}
          className="my-4"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0 hrs (Shade)</span>
          <span>6 hrs</span>
          <span>12 hrs (Full Sun)</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="yield">Expected Yield*</Label>
        <Select 
          value={yieldExpectation} 
          onValueChange={setYieldExpectation} 
          required
        >
          <SelectTrigger className="ur-input">
            <SelectValue placeholder="What do you want to grow?" />
          </SelectTrigger>
          <SelectContent>
            {yieldOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Purpose of Your Garden* (Select all that apply)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-1">
          {purposeOptions.map((purpose) => (
            <Button
              key={purpose}
              type="button"
              variant={selectedPurposes.includes(purpose) ? "default" : "outline"}
              className={
                selectedPurposes.includes(purpose) 
                  ? "bg-ur-green hover:bg-ur-green/90 text-white" 
                  : ""
              }
              onClick={() => togglePurpose(purpose)}
            >
              {purpose}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Upload a photo of your garden space (optional)</Label>
        {imagePreview ? (
          <div className="relative w-full h-60 rounded-md overflow-hidden border border-gray-300">
            <img 
              src={imagePreview} 
              alt="Balcony/Garden Space" 
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
              onClick={() => document.getElementById('balcony-image-upload')?.click()}
            >
              <Image className="h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload a photo of your space</p>
              <p className="text-xs text-gray-500">
                This helps us provide more tailored suggestions
              </p>
              <input
                id="balcony-image-upload"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-ur-green hover:bg-ur-green/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : (
          <>
            <Save className="mr-2 h-4 w-4" /> 
            Save Garden Preferences
          </>
        )}
      </Button>
    </form>
  );
};

export default BalconyPreferencesForm;
