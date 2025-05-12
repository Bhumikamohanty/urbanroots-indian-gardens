
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Image, Upload, Check, X } from 'lucide-react';
import { GardenIdeaType } from './GardenIdeas';

interface GardenIdeaFormProps {
  onIdeaSubmit: (idea: GardenIdeaType) => void;
  userName: string;
}

const styleOptions = [
  'Minimalist',
  'Colorful',
  'Sustainable',
  'Productive',
  'Traditional',
  'Space-saving',
  'Modern',
  'Vertical',
  'Decorative',
  'Compact'
];

const plantTypeOptions = [
  'Herbs',
  'Vegetables',
  'Flowers',
  'Indoor Plants',
  'Medicinal',
  'Climbers',
  'Succulents',
  'Fruit Plants'
];

const GardenIdeaForm: React.FC<GardenIdeaFormProps> = ({ onIdeaSubmit, userName }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [space, setSpace] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedPlantTypes, setSelectedPlantTypes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Check if adding these would exceed the limit
      if (images.length + selectedFiles.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }
      
      // Check file size for each (5MB limit)
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast.error("Some images exceed the 5MB limit");
        return;
      }
      
      setImages(prev => [...prev, ...selectedFiles]);
      
      // Generate previews
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // Clean up URL object to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style) 
        : [...prev, style]
    );
  };
  
  const togglePlantType = (type: string) => {
    setSelectedPlantTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || imagePreviews.length === 0 || selectedStyles.length === 0 || selectedPlantTypes.length === 0) {
      toast.error("Please fill in all required fields and upload at least one image");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Normally we would upload images to a server here
      // For now we'll just use the local preview URLs
      
      const newIdea: GardenIdeaType = {
        id: Date.now().toString(),
        title,
        description,
        images: imagePreviews,
        space,
        style: selectedStyles,
        plantTypes: selectedPlantTypes,
        createdBy: userName || 'Anonymous User',
        isCurated: false
      };
      
      // Artificial delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onIdeaSubmit(newIdea);
      
      // Reset form
      setTitle('');
      setDescription('');
      setSpace('medium');
      setSelectedStyles([]);
      setSelectedPlantTypes([]);
      setImages([]);
      setImagePreviews([]);
      
      toast.success("Your garden idea has been shared!");
      
    } catch (error) {
      console.error("Error submitting garden idea:", error);
      toast.error("Failed to share your idea. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title*</Label>
        <Input
          id="title"
          placeholder="e.g., Vertical Herb Garden, Minimalist Balcony Setup"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ur-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          placeholder="Describe your setup, including materials used, maintenance tips, and any special features..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="ur-input min-h-[120px]"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Space Size*</Label>
        <RadioGroup 
          value={space} 
          onValueChange={(value) => setSpace(value as 'small' | 'medium' | 'large')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small" className="cursor-pointer">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large" className="cursor-pointer">Large</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label className="flex justify-between">
          <span>Photos* (max 5)</span>
          <span className="text-gray-500 text-sm">{images.length}/5</span>
        </Label>
        
        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img 
                  src={preview} 
                  alt={`Garden idea ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {images.length < 5 && (
              <div 
                className="border border-dashed border-gray-300 rounded-md flex items-center justify-center h-32 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => document.getElementById('garden-idea-images')?.click()}
              >
                <div className="text-center">
                  <Image className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500 mt-1">Add photo</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div 
            className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('garden-idea-images')?.click()}
          >
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Click to upload photos of your setup</p>
            <p className="text-xs text-gray-500">JPG, PNG or WEBP (max 5MB each)</p>
          </div>
        )}
        
        <input
          id="garden-idea-images"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          onChange={handleImageUpload}
          multiple
        />
      </div>
      
      <div className="space-y-2">
        <Label>Garden Style* (Select at least one)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {styleOptions.map(style => (
            <Button
              key={style}
              type="button"
              variant="outline"
              className={selectedStyles.includes(style) ? "bg-ur-green text-white" : ""}
              onClick={() => toggleStyle(style)}
            >
              {selectedStyles.includes(style) && <Check className="mr-1 h-3 w-3" />}
              {style}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Plant Types* (Select at least one)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {plantTypeOptions.map(type => (
            <Button
              key={type}
              type="button"
              variant="outline"
              className={selectedPlantTypes.includes(type) ? "bg-ur-green text-white" : ""}
              onClick={() => togglePlantType(type)}
            >
              {selectedPlantTypes.includes(type) && <Check className="mr-1 h-3 w-3" />}
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-ur-green hover:bg-ur-green/90 text-white"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Share Your Garden Idea'}
      </Button>
    </form>
  );
};

export default GardenIdeaForm;
