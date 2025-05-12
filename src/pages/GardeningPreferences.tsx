
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BalconyPreferencesForm from '@/components/preferences/BalconyPreferencesForm';
import AestheticGuidance from '@/components/guidance/AestheticGuidance';
import GardenIdeas from '@/components/ideas/GardenIdeas';

const GardeningPreferences: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSavePreferences = async (preferences: any) => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage for persistence
      localStorage.setItem('gardenPreferences', JSON.stringify(preferences));
      
      toast.success('Garden preferences saved successfully!');
    } catch (error) {
      console.error('Save preferences error:', error);
      toast.error('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container">
          <h1 className="text-3xl font-bold mb-2">Garden Preferences & Ideas</h1>
          <p className="text-white/90">
            Customize your gardening experience and discover inspiring setups
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="ur-container mt-8">
        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="preferences">Balcony Preferences</TabsTrigger>
            <TabsTrigger value="aesthetics">Aesthetic Guidance</TabsTrigger>
            <TabsTrigger value="ideas">Garden Ideas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-ur-green mb-6">Your Balcony & Garden Preferences</h2>
            <BalconyPreferencesForm onSave={handleSavePreferences} isLoading={isSaving} />
          </TabsContent>
          
          <TabsContent value="aesthetics" className="bg-white p-6 rounded-lg shadow-sm">
            <AestheticGuidance />
          </TabsContent>
          
          <TabsContent value="ideas" className="bg-white p-6 rounded-lg shadow-sm">
            <GardenIdeas />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GardeningPreferences;
