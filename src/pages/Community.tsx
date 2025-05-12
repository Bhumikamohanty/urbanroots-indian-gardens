
import React from 'react';
import CommunityFeed from '@/components/community/CommunityFeed';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';

const Community: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white to-ur-yellow/10 min-h-screen pb-12">
      {/* Header with colorful gradient */}
      <div className="bg-gradient-to-r from-ur-green to-ur-blue py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute -left-10 top-10 w-40 h-40 rounded-full bg-ur-yellow"></div>
          <div className="absolute right-20 top-5 w-20 h-20 rounded-full bg-ur-orange"></div>
          <div className="absolute left-1/3 bottom-5 w-24 h-24 rounded-full bg-ur-blue"></div>
        </div>
        <div className="ur-container relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-sm">Community Garden Showcase</h1>
          <p className="text-white/90 md:text-lg max-w-2xl">
            Share your gardening journey and learn from fellow gardeners across India. Connect, inspire, and grow together!
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
              #IndianGardens
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
              #BalconyFarming
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
              #UrbanRoots
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
              #GrowYourOwn
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Community Stats Summary */}
      <div className="bg-white py-4 shadow-sm border-b border-gray-100">
        <div className="ur-container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format" alt="User" />
                  <AvatarFallback className="bg-ur-green text-white">AB</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format" alt="User" />
                  <AvatarFallback className="bg-ur-orange text-white">CD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&auto=format" alt="User" />
                  <AvatarFallback className="bg-ur-blue text-white">EF</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white">
                  <AvatarFallback className="bg-ur-yellow text-ur-brown">+42</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm text-gray-600">Join our growing community!</span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-ur-green mr-2"></div>
                <span className="text-gray-700">230 Gardens Shared</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-ur-orange mr-2"></div>
                <span className="text-gray-700">45 Cities</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-ur-blue mr-2"></div>
                <span className="text-gray-700">1,204 Plants Grown</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="ur-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feed Content - Takes 2/3 of space on desktop */}
          <div className="md:col-span-2">
            <CommunityFeed />
          </div>
          
          {/* Sidebar - Calendar, Events, etc */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-lg text-ur-brown mb-3">Garden Calendar</h3>
              <Calendar 
                mode="single" 
                className="rounded border-none" 
              />
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming Gardening Events</h4>
                <div className="space-y-2">
                  <div className="bg-ur-green/10 p-2 rounded text-sm">
                    <p className="font-medium text-ur-green">May 21 - Seed Swap Day</p>
                    <p className="text-xs text-gray-600">Lodi Gardens, Delhi</p>
                  </div>
                  <div className="bg-ur-orange/10 p-2 rounded text-sm">
                    <p className="font-medium text-ur-orange">June 5 - Workshop: Urban Farming</p>
                    <p className="text-xs text-gray-600">Online Event</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-lg text-ur-brown mb-3">Garden Spotlight</h3>
              <div className="aspect-video rounded-md overflow-hidden mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1610448985567-4f9eb36cd3a5?w=500&auto=format" 
                  alt="Featured Garden" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium">Priya's Terrace Oasis</h4>
              <p className="text-sm text-gray-600">A beautiful Mumbai terrace transformed into an edible garden paradise.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
