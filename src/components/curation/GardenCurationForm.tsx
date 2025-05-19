
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Leaf, Sprout, FlowerIcon, Sun } from 'lucide-react';
import GardenTypeSelector from './GardenTypeSelector';
import GoalSelector from './GoalSelector';
import VibeSelector from './VibeSelector';
import PlantTypeSelector from './PlantTypeSelector';
import GardenRecommendations from './GardenRecommendations';

interface CurationFormValues {
  gardenType: string;
  goals: string[];
  vibe: string;
  size: string;
  sunlight: string;
  location: string;
  waterSource: string;
  climate: string;
  issues: string;
  plantTypes: string[];
  experience: string;
  preferredOption: string;
  additionalInfo: string;
}

const GardenCurationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [formData, setFormData] = useState<CurationFormValues | null>(null);
  
  const form = useForm<CurationFormValues>({
    defaultValues: {
      gardenType: '',
      goals: [],
      vibe: '',
      size: '',
      sunlight: '',
      location: '',
      waterSource: '',
      climate: '',
      issues: '',
      plantTypes: [],
      experience: '',
      preferredOption: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data: CurationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real scenario, we would send this data to the backend
      // and get personalized recommendations back
      console.log("Form data submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData(data);
      setShowRecommendations(true);
      toast.success("Recommendations generated successfully!");
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showRecommendations && formData) {
    return <GardenRecommendations data={formData} onBack={() => setShowRecommendations(false)} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Garden Vision Section */}
        <div className="bg-ur-green/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-ur-green flex items-center gap-2 mb-4">
            <Leaf className="h-5 w-5" /> Tell Us About Your Garden Vision
          </h3>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="gardenType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you describe your ideal balcony garden?</FormLabel>
                  <FormControl>
                    <GardenTypeSelector value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your main goals for this garden?</FormLabel>
                  <FormControl>
                    <GoalSelector value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vibe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What vibe are you going for?</FormLabel>
                  <FormControl>
                    <VibeSelector value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Understanding Your Space Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Sun className="h-5 w-5" /> Let's Understand Your Space
          </h3>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the size of your balcony/garden area?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="xs">Under 25 sq ft</SelectItem>
                      <SelectItem value="sm">25–50 sq ft</SelectItem>
                      <SelectItem value="md">50–100 sq ft</SelectItem>
                      <SelectItem value="lg">Over 100 sq ft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sunlight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How much sunlight does your balcony get daily?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount of sunlight" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full">Full sunlight (6–8 hrs+)</SelectItem>
                      <SelectItem value="partial">Partial sunlight (3–5 hrs)</SelectItem>
                      <SelectItem value="low">Low-light (under 3 hrs)</SelectItem>
                      <SelectItem value="unknown">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your city & locality (so we can understand your climate better)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mumbai, Andheri" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll use this to fetch climate data for better recommendations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="waterSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have access to a water source nearby?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select water access" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes, a tap nearby</SelectItem>
                      <SelectItem value="no">No, need low-water solutions</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Environment Section */}
        <div className="bg-ur-green/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-ur-green flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5" /> Tell Us About Your Environment
          </h3>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="climate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the general climate like in your area?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your climate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hot-dry">Hot & dry</SelectItem>
                      <SelectItem value="humid-warm">Humid & warm</SelectItem>
                      <SelectItem value="cold-winters">Cold winters</SelectItem>
                      <SelectItem value="tropical">Tropical/monsoon</SelectItem>
                      <SelectItem value="temperate">Temperate</SelectItem>
                      <SelectItem value="unknown">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    We'll also auto-detect this based on your location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="issues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any known issues in your area?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Heavy rains, pests, monkeys, water scarcity, etc." 
                      className="resize-none" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Personal Touch Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FlowerIcon className="h-5 w-5" /> Personal Touch
          </h3>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="plantTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What kind of plants do you love?</FormLabel>
                  <FormControl>
                    <PlantTypeSelector value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Are you a beginner or experienced in gardening?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Absolute beginner</SelectItem>
                      <SelectItem value="intermediate">Some experience</SelectItem>
                      <SelectItem value="experienced">Seasoned green thumb</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferredOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Would you prefer ready-to-use kits or DIY options?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ready">Ready-made kits</SelectItem>
                      <SelectItem value="diy">DIY guidance</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything else you'd like to share about your dream garden?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., color preferences, favorite plants, decor style, pet safety, etc." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The more details you share, the better we can personalize your recommendations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center gap-4 pt-4">
          <Button type="submit" className="bg-ur-green hover:bg-ur-green/90 w-full md:w-auto px-8" disabled={isSubmitting}>
            {isSubmitting ? "Generating Recommendations..." : "Get Your Personalized Garden Plan"}
          </Button>
          <p className="text-sm text-gray-600">
            We'll analyze your preferences and suggest the perfect plants, planters, and layout ideas for your space.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default GardenCurationForm;
