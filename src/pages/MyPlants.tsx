
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plant, samplePlants } from '@/data/plants';
import PlantList from '@/components/plants/PlantList';
import AddPlantForm from '@/components/plants/AddPlantForm';
import ReminderManager from '@/components/plants/ReminderManager';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Bell } from 'lucide-react';
import { toast } from 'sonner';

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error('Please log in to access your plants');
      navigate('/login');
      return;
    }
    
    // Load plants from localStorage or use sample plants for demo
    const storedPlants = localStorage.getItem('myPlants');
    if (storedPlants) {
      setMyPlants(JSON.parse(storedPlants));
    } else {
      // For demo purposes, use sample plants
      setMyPlants(samplePlants);
      localStorage.setItem('myPlants', JSON.stringify(samplePlants));
    }
    
    // Request notification permission for reminders
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, [navigate]);
  
  const handleAddPlant = async (plantData: any) => {
    setIsAddingPlant(true);
    
    try {
      // For demonstration purposes we'll simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPlant: Plant = {
        id: Date.now().toString(),
        name: plantData.name,
        type: plantData.type,
        image: plantData.image,
        waterFrequency: plantData.waterFrequency,
        sunlight: plantData.sunlight,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      
      const updatedPlants = [...myPlants, newPlant];
      setMyPlants(updatedPlants);
      localStorage.setItem('myPlants', JSON.stringify(updatedPlants));
      
      toast.success(`${newPlant.name} added to your plants!`);
    } catch (error) {
      console.error('Add plant error:', error);
      toast.error('Failed to add plant. Please try again.');
    } finally {
      setIsAddingPlant(false);
    }
  };
  
  const handleDeletePlant = (plantId: string) => {
    try {
      const updatedPlants = myPlants.filter(plant => plant.id !== plantId);
      setMyPlants(updatedPlants);
      localStorage.setItem('myPlants', JSON.stringify(updatedPlants));
      
      // Also remove any associated reminders
      const reminders = JSON.parse(localStorage.getItem('plantReminders') || '[]');
      const updatedReminders = reminders.filter((reminder: any) => reminder.plantId !== plantId);
      localStorage.setItem('plantReminders', JSON.stringify(updatedReminders));
    } catch (error) {
      console.error('Delete plant error:', error);
      toast.error('Failed to delete plant. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Plants</h1>
              <p className="text-white/90">Keep track of all your plants and their care requirements</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                className="bg-white text-ur-green hover:bg-ur-yellow hover:text-ur-green"
                onClick={() => setShowReminders(!showReminders)}
              >
                <Bell className="mr-2 h-5 w-5" />
                {showReminders ? 'Hide Reminders' : 'View Reminders'}
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-white text-ur-green hover:bg-ur-yellow hover:text-ur-green">
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Plant
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Add a new plant</SheetTitle>
                    <SheetDescription>
                      Fill in the details about your new plant to add it to your collection.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <AddPlantForm onAddPlant={handleAddPlant} isLoading={isAddingPlant} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="ur-container mt-8">
        <div className={`grid grid-cols-1 ${showReminders ? 'lg:grid-cols-3' : ''} gap-6`}>
          <div className={showReminders ? 'lg:col-span-2' : ''}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full md:w-auto justify-start mb-6">
                <TabsTrigger value="all">All Plants ({myPlants.length})</TabsTrigger>
                <TabsTrigger value="herbs">Herbs</TabsTrigger>
                <TabsTrigger value="indoors">Indoor Plants</TabsTrigger>
                <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
                <TabsTrigger value="medicinal">Medicinal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <PlantList plants={myPlants} onDeletePlant={handleDeletePlant} />
              </TabsContent>
              
              <TabsContent value="herbs">
                <PlantList 
                  plants={myPlants.filter(plant => plant.type === 'Herb')} 
                  onDeletePlant={handleDeletePlant} 
                />
              </TabsContent>
              
              <TabsContent value="indoors">
                <PlantList 
                  plants={myPlants.filter(plant => plant.type === 'Indoor Plant' || plant.type === 'Succulent')} 
                  onDeletePlant={handleDeletePlant} 
                />
              </TabsContent>
              
              <TabsContent value="vegetables">
                <PlantList 
                  plants={myPlants.filter(plant => plant.type === 'Vegetable' || plant.type === 'Fruit')} 
                  onDeletePlant={handleDeletePlant} 
                />
              </TabsContent>
              
              <TabsContent value="medicinal">
                <PlantList 
                  plants={myPlants.filter(plant => plant.type === 'Medicinal')} 
                  onDeletePlant={handleDeletePlant} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {showReminders && (
            <div>
              <ReminderManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPlants;
