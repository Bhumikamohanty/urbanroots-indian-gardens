
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Filter, ShoppingBag, BookOpen, Heart, Star, ThumbsUp, MessageSquare, Users } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'shop_visit',
    icon: ShoppingBag,
    color: 'text-ur-green',
    description: 'Browsed Herb plants in Shop',
    timestamp: '2025-05-17T14:30:00'
  },
  {
    id: 2,
    type: 'learn_view',
    icon: BookOpen,
    color: 'text-ur-blue',
    description: 'Viewed "Balcony Garden Setup Guide"',
    timestamp: '2025-05-16T10:15:00'
  },
  {
    id: 3,
    type: 'wishlist_add',
    icon: Heart,
    color: 'text-red-500',
    description: 'Added "Terracotta Pots" to wishlist',
    timestamp: '2025-05-15T18:45:00'
  },
  {
    id: 4,
    type: 'review_add',
    icon: Star,
    color: 'text-yellow-500',
    description: 'Posted a 5-star review for "Tulsi (Holy Basil)"',
    timestamp: '2025-05-14T09:20:00'
  },
  {
    id: 5,
    type: 'community_like',
    icon: ThumbsUp,
    color: 'text-ur-orange',
    description: 'Liked a post in "Balcony Gardeners India"',
    timestamp: '2025-05-13T16:10:00'
  },
  {
    id: 6,
    type: 'community_comment',
    icon: MessageSquare,
    color: 'text-purple-500',
    description: 'Commented on "Growing Tomatoes in Containers"',
    timestamp: '2025-05-12T11:25:00'
  },
  {
    id: 7,
    type: 'community_join',
    icon: Users,
    color: 'text-teal-500',
    description: 'Joined "Organic Growers Network" community',
    timestamp: '2025-05-10T14:30:00'
  }
];

const ProfileActivityLog: React.FC = () => {
  const formatActivityDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-IN', { weekday: 'long' }) + ', ' + 
             date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
             date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center">
            <Clock className="h-5 w-5 mr-2 text-ur-green" />
            Recent Activity
          </CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-10">
            <Clock className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-base font-medium text-gray-900">No recent activity</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your activity history will appear here as you use UrbanRoots.
            </p>
          </div>
        ) : (
          <div className="relative space-y-0">
            <div className="absolute top-0 bottom-0 left-6 border-l-2 border-dashed border-gray-200"></div>
            {activities.map((activity, index) => {
              const ActivityIcon = activity.icon;
              
              return (
                <div 
                  key={activity.id} 
                  className={`relative pl-14 py-4 ${index !== activities.length - 1 ? '' : ''}`}
                >
                  <div className={`absolute left-1 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100`}>
                    <ActivityIcon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div>
                    <p className="text-gray-700">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {formatActivityDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileActivityLog;
