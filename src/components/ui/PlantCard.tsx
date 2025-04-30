
import React, { useState, useEffect } from 'react';
import { Plant } from '@/data/plants';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Bell, Calendar, MoreVertical, Flower, CloudRain, Sprout } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { PlantReminder, ReminderType, reminderTypeLabels, defaultReminders } from '@/data/reminderTypes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface PlantCardProps {
  plant: Plant;
  onDelete: (id: string) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onDelete }) => {
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [plantReminders, setPlantReminders] = useState<PlantReminder[]>([]);
  
  useEffect(() => {
    // Load all reminders and filter for this specific plant
    const allReminders: PlantReminder[] = JSON.parse(localStorage.getItem('plantReminders') || '[]');
    const thisPlantReminders = allReminders.filter(r => r.plantId === plant.id);
    setPlantReminders(thisPlantReminders);
  }, [plant.id]);
  
  const handleDelete = () => {
    onDelete(plant.id);
    toast.success(`${plant.name} has been removed from your plants`);
  };

  const handleCreateReminder = (type: ReminderType) => {
    // Using the default reminders based on plant type
    const defaultReminder = defaultReminders[plant.type]?.find(r => r.type === type);
    
    const newReminder: PlantReminder = {
      id: `reminder_${Date.now()}`,
      plantId: plant.id,
      plantName: plant.name,
      type: type,
      frequency: defaultReminder?.frequency || 7, // Default to weekly if no match
      nextDue: new Date(Date.now() + 86400000).toISOString(), // Default to tomorrow
      notes: defaultReminder?.notes || '',
      enabled: true
    };
    
    // Get existing reminders from localStorage or initialize empty array
    const existingReminders: PlantReminder[] = JSON.parse(localStorage.getItem('plantReminders') || '[]');
    
    // Add new reminder
    const updatedReminders = [...existingReminders, newReminder];
    localStorage.setItem('plantReminders', JSON.stringify(updatedReminders));
    
    // Update local state
    setPlantReminders([...plantReminders, newReminder]);
    
    // Request notification permission if not granted yet
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    
    toast.success(`Reminder set for ${plant.name}`, {
      description: `${reminderTypeLabels[type]} every ${newReminder.frequency} day(s)`
    });
    
    setIsReminderDialogOpen(false);
  };

  // Format date
  const formattedDate = new Date(plant.dateAdded).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Fallback image based on plant type
  const getFallbackImage = () => {
    const typeMap: Record<string, string> = {
      'Herb': "https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690",
      'Succulent': "https://plantlife.ie/wp-content/uploads/2022/10/alar1535__000000.jpg",
      'Indoor Plant': "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=500&auto=format&fit=crop",
      'Vegetable': "https://images.unsplash.com/photo-1592841200221-a4f8cad509a4?q=80&w=500&auto=format&fit=crop",
      'Fruit': "https://images.unsplash.com/photo-1572364709125-9a4557550efb?q=80&w=500&auto=format&fit=crop",
      'Medicinal': "https://plantlife.ie/wp-content/uploads/2022/10/alar1535__000000.jpg"
    };
    
    return typeMap[plant.type] || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=500&auto=format&fit=crop';
  };

  // Get icons for reminder types
  const getReminderIcon = (type: ReminderType) => {
    switch (type) {
      case 'water':
        return <CloudRain className="h-3 w-3 mr-1" />;
      case 'fertilize':
        return <Sprout className="h-3 w-3 mr-1" />;
      case 'prune':
        return <Trash2 className="h-3 w-3 mr-1" />;
      default:
        return <Bell className="h-3 w-3 mr-1" />;
    }
  };

  // Count active reminders
  const activeReminders = plantReminders.filter(r => r.enabled).length;

  return (
    <Card className="ur-card hover-glow animate-fade-in">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageError ? getFallbackImage() : plant.image} 
          alt={plant.name} 
          className="w-full h-full object-cover hover-grow"
          onError={() => setImageError(true)}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-ur-green">{plant.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsReminderDialogOpen(true)}>
                <Bell className="mr-2 h-4 w-4" />
                Add Reminder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Plant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-gray-500 mb-2">{plant.type}</p>
        <div className="space-y-1 mt-3">
          <p className="text-sm"><span className="font-medium">Water:</span> {plant.waterFrequency}</p>
          <p className="text-sm"><span className="font-medium">Sunlight:</span> {plant.sunlight}</p>
          <p className="text-sm"><span className="font-medium">Added on:</span> {formattedDate}</p>
        </div>
        
        {/* Plant-specific reminders list */}
        {plantReminders.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-medium flex items-center mb-2">
              <Bell className="h-4 w-4 mr-1 text-ur-orange" />
              Plant Reminders ({activeReminders})
            </h4>
            <div className="flex flex-wrap gap-1">
              {plantReminders.map(reminder => (
                reminder.enabled && (
                  <Badge 
                    key={reminder.id} 
                    variant="outline"
                    className="text-xs py-0"
                  >
                    {getReminderIcon(reminder.type as ReminderType)}
                    {reminderTypeLabels[reminder.type as ReminderType]}
                  </Badge>
                )
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" className="text-ur-blue border-ur-blue hover:bg-ur-blue hover:text-white">
          <Calendar className="mr-2 h-4 w-4" />
          View Details
        </Button>
        <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Reminder for {plant.name}</DialogTitle>
              <DialogDescription>
                Choose the type of reminder you want to set up for your plant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-4">
              {(Object.keys(reminderTypeLabels) as ReminderType[]).map((type) => (
                <Button 
                  key={type} 
                  variant="outline" 
                  className="flex-col h-24 space-y-2"
                  onClick={() => handleCreateReminder(type)}
                >
                  {getReminderIcon(type)}
                  <span>{reminderTypeLabels[type]}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
