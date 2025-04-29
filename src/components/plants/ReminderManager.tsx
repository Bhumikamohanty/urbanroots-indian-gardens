
import React, { useState, useEffect } from 'react';
import { PlantReminder, reminderTypeLabels } from '@/data/reminderTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Trash2, Check, Calendar, AlertTriangle, CloudRain, Sun, CloudSun } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface ReminderManagerProps {
  className?: string;
}

interface WeatherData {
  description: string;
  temperature: number;
  humidity: number;
  isRainy: boolean;
  isSunny: boolean;
}

const ReminderManager: React.FC<ReminderManagerProps> = ({ className }) => {
  const [reminders, setReminders] = useState<PlantReminder[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  
  useEffect(() => {
    loadReminders();
    
    // Check for notification permission
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    
    // Setup interval to check reminders (every hour)
    const checkInterval = setInterval(() => {
      checkDueReminders();
    }, 3600000); // 1 hour
    
    // Request location permission for weather data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission(true);
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Location permission denied:', error);
          setLocationPermission(false);
          toast.error('Weather-based reminders require location access');
        }
      );
    }
    
    return () => clearInterval(checkInterval);
  }, []);
  
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      // In a real app, you would use a proper weather API like OpenWeatherMap
      // For demo purposes, we'll use a mock response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock weather data
      const isMonsoonSeason = new Date().getMonth() >= 5 && new Date().getMonth() <= 8; // June to September
      const isRainy = isMonsoonSeason ? Math.random() > 0.4 : Math.random() > 0.8;
      const isSunny = !isRainy && Math.random() > 0.5;
      
      const mockWeather: WeatherData = {
        description: isRainy ? 'Rainy' : isSunny ? 'Sunny' : 'Cloudy',
        temperature: Math.round(20 + Math.random() * 15), // 20-35°C
        humidity: Math.round(60 + Math.random() * 30), // 60-90%
        isRainy,
        isSunny
      };
      
      setWeatherData(mockWeather);
      
      if (isRainy) {
        toast.info('Rainy weather detected! Adjusting your plant watering schedule.', {
          position: 'bottom-right',
          duration: 5000
        });
      }
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error('Failed to fetch weather data');
    }
  };
  
  const loadReminders = () => {
    const stored = localStorage.getItem('plantReminders');
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  };
  
  const checkDueReminders = () => {
    const now = new Date();
    const storedReminders: PlantReminder[] = JSON.parse(localStorage.getItem('plantReminders') || '[]');
    
    // Adjust reminders based on weather if available
    const adjustedReminders = weatherData ? adjustRemindersBasedOnWeather(storedReminders) : storedReminders;
    
    const dueReminders = adjustedReminders.filter(reminder => {
      if (!reminder.enabled) return false;
      
      const nextDue = new Date(reminder.nextDue);
      return nextDue <= now && (!reminder.lastCompleted || new Date(reminder.lastCompleted) < nextDue);
    });
    
    if (dueReminders.length > 0) {
      // Show notification if permission granted
      if (Notification.permission === 'granted') {
        dueReminders.forEach(reminder => {
          new Notification(`Time to ${reminderTypeLabels[reminder.type].toLowerCase()}`, {
            body: `Your ${reminder.plantName} needs attention!${weatherData ? ' Weather: ' + weatherData.description : ''}`,
            icon: '/favicon.ico'
          });
        });
      }
      
      // Show toast notification in app
      if (dueReminders.length === 1) {
        toast(`Time to ${reminderTypeLabels[dueReminders[0].type].toLowerCase()}`, {
          description: `Your ${dueReminders[0].plantName} needs attention!`
        });
      } else {
        toast(`${dueReminders.length} plants need attention!`, {
          description: `You have multiple plant care tasks due.`
        });
      }
    }
  };
  
  const adjustRemindersBasedOnWeather = (reminders: PlantReminder[]): PlantReminder[] => {
    if (!weatherData) return reminders;
    
    return reminders.map(reminder => {
      // Create a copy to avoid modifying the original
      const adjustedReminder = { ...reminder };
      
      if (reminder.type === 'water') {
        // If it's raining, push watering schedule forward
        if (weatherData.isRainy) {
          const nextDue = new Date(reminder.nextDue);
          nextDue.setDate(nextDue.getDate() + 1); // Add one more day to watering schedule
          adjustedReminder.nextDue = nextDue.toISOString();
        }
        
        // If it's very sunny and hot, move watering schedule earlier
        if (weatherData.isSunny && weatherData.temperature > 32) {
          const nextDue = new Date(reminder.nextDue);
          nextDue.setDate(nextDue.getDate() - 1); // Reduce one day from watering schedule
          adjustedReminder.nextDue = nextDue.toISOString();
        }
      }
      
      return adjustedReminder;
    });
  };
  
  const handleToggleReminder = (id: string, enabled: boolean) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === id ? { ...reminder, enabled } : reminder
    );
    
    localStorage.setItem('plantReminders', JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
    
    toast(`Reminder ${enabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleDeleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    
    localStorage.setItem('plantReminders', JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
    
    toast('Reminder deleted');
  };
  
  const handleCompleteReminder = (reminder: PlantReminder) => {
    const now = new Date();
    
    // Calculate next due date based on frequency
    const nextDue = new Date(now);
    nextDue.setDate(nextDue.getDate() + reminder.frequency);
    
    const updatedReminders = reminders.map(r => 
      r.id === reminder.id 
        ? { 
            ...r, 
            lastCompleted: now.toISOString(),
            nextDue: nextDue.toISOString()
          } 
        : r
    );
    
    localStorage.setItem('plantReminders', JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
    
    toast(`${reminderTypeLabels[reminder.type]} completed for ${reminder.plantName}!`, {
      description: `Next reminder in ${reminder.frequency} days`
    });
  };
  
  // Filter reminders based on showCompleted setting
  const filteredReminders = reminders.filter(reminder => {
    if (!showCompleted) {
      // If not showing completed, check if it's due
      const now = new Date();
      const nextDue = new Date(reminder.nextDue);
      
      if (reminder.lastCompleted) {
        const lastCompleted = new Date(reminder.lastCompleted);
        return nextDue <= now && lastCompleted < nextDue;
      }
      
      return nextDue <= now;
    }
    return true;
  });
  
  // Sort reminders by due date
  const sortedReminders = [...filteredReminders].sort((a, b) => {
    return new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime();
  });

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-ur-orange" />
            Plant Care Reminders
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Show All</span>
            <Switch
              checked={showCompleted}
              onCheckedChange={setShowCompleted}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Weather indication */}
        {weatherData && (
          <div className={`p-3 mb-4 rounded-lg border ${
            weatherData.isRainy ? 'bg-blue-50 border-blue-200' : 
            weatherData.isSunny ? 'bg-yellow-50 border-yellow-200' : 
            'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {weatherData.isRainy ? (
                  <CloudRain className="h-6 w-6 text-blue-500 mr-2" />
                ) : weatherData.isSunny ? (
                  <Sun className="h-6 w-6 text-yellow-500 mr-2" />
                ) : (
                  <CloudSun className="h-6 w-6 text-gray-500 mr-2" />
                )}
                <div>
                  <h4 className="font-medium text-sm">{weatherData.description} Weather</h4>
                  <p className="text-xs text-gray-500">{weatherData.temperature}°C, {weatherData.humidity}% Humidity</p>
                </div>
              </div>
              <Badge variant={weatherData.isRainy ? "info" : "secondary"} className="px-2">
                {weatherData.isRainy ? 'Skip Watering Today' : weatherData.isSunny ? 'Water Earlier' : 'Regular Schedule'}
              </Badge>
            </div>
          </div>
        )}
        
        <ScrollArea className="h-[400px] pr-4">
          {sortedReminders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="mx-auto h-12 w-12 opacity-20 mb-2" />
              <p>No reminders found</p>
              <p className="text-sm mt-1">Add reminders from your plant cards</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedReminders.map(reminder => {
                const isOverdue = new Date(reminder.nextDue) < new Date() && 
                  (!reminder.lastCompleted || new Date(reminder.lastCompleted) < new Date(reminder.nextDue));
                
                // Conditionally adjust the card style based on weather and reminder type
                let cardStyle = `p-3 border rounded-lg flex items-center justify-between ${
                  isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
                } ${!reminder.enabled ? 'opacity-60' : ''}`;
                
                if (weatherData && reminder.type === 'water') {
                  if (weatherData.isRainy) {
                    cardStyle = `p-3 border rounded-lg flex items-center justify-between border-blue-200 bg-blue-50/30 ${!reminder.enabled ? 'opacity-60' : ''}`;
                  } else if (weatherData.isSunny && weatherData.temperature > 32) {
                    cardStyle = `p-3 border rounded-lg flex items-center justify-between border-yellow-200 bg-yellow-50/30 ${!reminder.enabled ? 'opacity-60' : ''}`;
                  }
                }
                
                return (
                  <div key={reminder.id} className={cardStyle}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm truncate">{reminder.plantName}</h4>
                        {isOverdue && (
                          <Badge variant="destructive" className="ml-2 px-1 py-0 h-5">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                        
                        {weatherData && reminder.type === 'water' && weatherData.isRainy && (
                          <Badge variant="outline" className="ml-2 px-1 py-0 h-5 text-blue-600 border-blue-200 bg-blue-50">
                            <CloudRain className="h-3 w-3 mr-1" />
                            Rainy
                          </Badge>
                        )}
                        
                        {weatherData && reminder.type === 'water' && weatherData.isSunny && weatherData.temperature > 32 && (
                          <Badge variant="outline" className="ml-2 px-1 py-0 h-5 text-yellow-600 border-yellow-200 bg-yellow-50">
                            <Sun className="h-3 w-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {reminderTypeLabels[reminder.type]}
                      </p>
                      <p className="text-xs text-gray-400">
                        Every {reminder.frequency} days
                        {weatherData && reminder.type === 'water' && weatherData.isRainy && ' (skip today)'}
                        {weatherData && reminder.type === 'water' && weatherData.isSunny && weatherData.temperature > 32 && ' (water now)'}
                      </p>
                    </div>
                    
                    <div className="flex gap-1 ml-2">
                      <Switch
                        checked={reminder.enabled}
                        onCheckedChange={(checked) => handleToggleReminder(reminder.id, checked)}
                        className="mr-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-green-600"
                        onClick={() => handleCompleteReminder(reminder)}
                        disabled={!reminder.enabled}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReminderManager;
