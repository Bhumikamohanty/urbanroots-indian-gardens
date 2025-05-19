
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Settings, Bell, LogOut, Lock, User, Mail } from 'lucide-react';

interface ProfileSettingsProps {
  onLogout: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onLogout }) => {
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    reminders: true,
    marketing: false,
    tips: true
  });
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Bell className="h-5 w-5 mr-2 text-ur-green" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Control what notifications you receive and how you receive them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="order-notifications">Order Updates</Label>
              <p className="text-sm text-gray-500">Receive notifications about your order status</p>
            </div>
            <Switch
              id="order-notifications"
              checked={emailNotifications.orderUpdates}
              onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, orderUpdates: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reminder-notifications">Care Reminders</Label>
              <p className="text-sm text-gray-500">Notifications for plant watering and care</p>
            </div>
            <Switch
              id="reminder-notifications"
              checked={emailNotifications.reminders}
              onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, reminders: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-notifications">Marketing</Label>
              <p className="text-sm text-gray-500">Special offers, promotions and new products</p>
            </div>
            <Switch
              id="marketing-notifications"
              checked={emailNotifications.marketing}
              onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, marketing: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="tips-notifications">Gardening Tips</Label>
              <p className="text-sm text-gray-500">Seasonal gardening tips and advice</p>
            </div>
            <Switch
              id="tips-notifications"
              checked={emailNotifications.tips}
              onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, tips: checked})}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Settings className="h-5 w-5 mr-2 text-ur-green" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select defaultValue="inr">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">₹ INR</SelectItem>
                  <SelectItem value="usd">$ USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Lock className="h-5 w-5 mr-2 text-ur-green" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button variant="outline" className="justify-start text-left">
              <Mail className="h-4 w-4 mr-2" />
              Change Email Address
            </Button>
            <Button variant="outline" className="justify-start text-left">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="justify-start text-left">
              <User className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="w-full flex flex-col space-y-2">
            <Button 
              variant="destructive" 
              className="w-full md:w-auto md:self-start"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
