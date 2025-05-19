
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Bell, CalendarDays, Droplet, Sun, Cloud, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const reminderTypes = {
  watering: { icon: Droplet, color: "text-ur-blue", bg: "bg-ur-blue/10" },
  sunshine: { icon: Sun, color: "text-ur-orange", bg: "bg-ur-orange/10" },
  misting: { icon: Cloud, color: "text-ur-green", bg: "bg-ur-green/10" },
  fertilizing: { icon: Check, color: "text-purple-500", bg: "bg-purple-100" }
};

const reminders = [
  {
    id: 1,
    plantName: "Tulsi (Holy Basil)",
    type: "watering",
    date: "2025-05-21T08:00:00",
    completed: false,
    recurrence: "Every 2 days"
  },
  {
    id: 2,
    plantName: "Aloe Vera",
    type: "watering",
    date: "2025-05-24T08:00:00",
    completed: false,
    recurrence: "Weekly"
  },
  {
    id: 3,
    plantName: "Mint (Pudina)",
    type: "sunshine",
    date: "2025-05-20T10:00:00",
    completed: true,
    recurrence: "Daily"
  },
  {
    id: 4,
    plantName: "Curry Leaves (Kadi Patta)",
    type: "fertilizing",
    date: "2025-05-28T08:00:00",
    completed: false,
    recurrence: "Monthly"
  },
  {
    id: 5,
    plantName: "Tomato Plant",
    type: "misting",
    date: "2025-05-22T16:00:00",
    completed: false,
    recurrence: "Every 3 days"
  }
];

const ProfileReminders: React.FC = () => {
  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);
  
  const formatReminderDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-IN', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-ur-green" />
                  Upcoming Plant Care Reminders
                </CardTitle>
                <Button variant="outline" size="sm">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingReminders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">No upcoming reminders</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingReminders.map(reminder => {
                    const ReminderIcon = reminderTypes[reminder.type as keyof typeof reminderTypes].icon;
                    const iconColor = reminderTypes[reminder.type as keyof typeof reminderTypes].color;
                    const bgColor = reminderTypes[reminder.type as keyof typeof reminderTypes].bg;
                    
                    return (
                      <div key={reminder.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor}`}>
                            <ReminderIcon className={`h-5 w-5 ${iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{reminder.plantName}</h3>
                            <p className="text-sm text-gray-500">
                              {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)} • {formatReminderDate(reminder.date)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
                          {reminder.recurrence}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full flex justify-between">
                <span className="text-sm text-gray-500">
                  {upcomingReminders.length} upcoming reminder{upcomingReminders.length !== 1 ? 's' : ''}
                </span>
                <Button variant="link" className="text-ur-green p-0" size="sm">
                  Add New Reminder
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recently Completed</CardTitle>
            </CardHeader>
            <CardContent>
              {completedReminders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">No completed tasks</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {completedReminders.map(reminder => {
                    const ReminderIcon = reminderTypes[reminder.type as keyof typeof reminderTypes].icon;
                    
                    return (
                      <div key={reminder.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{reminder.plantName} • {reminder.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatReminderDate(reminder.date)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Plant Care Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single" 
                className="rounded border-none" 
              />
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">Key Activities</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-ur-blue"></div>
                    <span>Watering</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-ur-orange"></div>
                    <span>Sunshine</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-ur-green"></div>
                    <span>Misting</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Fertilizing</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileReminders;
