
import React, { useState, useEffect } from 'react';
import { PlantReminder, reminderTypeLabels } from '@/data/reminderTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Trash2, Check, Calendar, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface ReminderManagerProps {
  className?: string;
}

const ReminderManager: React.FC<ReminderManagerProps> = ({ className }) => {
  const [reminders, setReminders] = useState<PlantReminder[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  
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
    
    return () => clearInterval(checkInterval);
  }, []);
  
  const loadReminders = () => {
    const stored = localStorage.getItem('plantReminders');
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  };
  
  const checkDueReminders = () => {
    const now = new Date();
    const storedReminders: PlantReminder[] = JSON.parse(localStorage.getItem('plantReminders') || '[]');
    
    const dueReminders = storedReminders.filter(reminder => {
      if (!reminder.enabled) return false;
      
      const nextDue = new Date(reminder.nextDue);
      return nextDue <= now && (!reminder.lastCompleted || new Date(reminder.lastCompleted) < nextDue);
    });
    
    if (dueReminders.length > 0) {
      // Show notification if permission granted
      if (Notification.permission === 'granted') {
        dueReminders.forEach(reminder => {
          new Notification(`Time to ${reminderTypeLabels[reminder.type].toLowerCase()}`, {
            body: `Your ${reminder.plantName} needs attention!`,
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
                
                return (
                  <div 
                    key={reminder.id} 
                    className={`p-3 border rounded-lg flex items-center justify-between ${
                      isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    } ${!reminder.enabled ? 'opacity-60' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm truncate">{reminder.plantName}</h4>
                        {isOverdue && (
                          <Badge variant="destructive" className="ml-2 px-1 py-0 h-5">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {reminderTypeLabels[reminder.type]}
                      </p>
                      <p className="text-xs text-gray-400">
                        Every {reminder.frequency} days
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
