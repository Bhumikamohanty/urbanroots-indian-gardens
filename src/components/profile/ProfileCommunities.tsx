
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const communities = [
  {
    id: 1,
    name: "Balcony Gardeners India",
    members: 1243,
    image: "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=500&auto=format",
    description: "A community for Indian apartment dwellers who grow plants on their balconies.",
    posts: 85,
    joined: true
  },
  {
    id: 2,
    name: "Organic Growers Network",
    members: 856,
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&auto=format",
    description: "Share organic gardening tips and tricks for healthier plants and produce.",
    posts: 42,
    joined: true
  },
  {
    id: 3,
    name: "Mumbai Plant Swap",
    members: 324,
    image: "https://images.unsplash.com/photo-1581281698582-1ddd231111b1?w=500&auto=format",
    description: "For Mumbai-based gardeners to exchange plants, cuttings, and seeds.",
    posts: 28,
    joined: true
  }
];

const recommendedCommunities = [
  {
    id: 4,
    name: "Vertical Gardening Hub",
    members: 725,
    image: "https://images.unsplash.com/photo-1582131987200-5aa688765ae7?w=500&auto=format",
    description: "Learn how to maximize your growing space with vertical gardening techniques."
  },
  {
    id: 5,
    name: "Delhi Urban Farmers",
    members: 412,
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500&auto=format",
    description: "For NCR residents growing food in urban spaces - connect with local gardeners."
  }
];

const ProfileCommunities: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="h-5 w-5 mr-2 text-ur-green" />
            My Communities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {communities.length === 0 ? (
            <div className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-base font-medium text-gray-900">No communities joined</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't joined any communities yet. Join a community to connect with fellow gardeners!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {communities.map((community) => (
                <div key={community.id} className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-6 gap-4">
                  <div className="w-full md:w-40 h-24 md:h-auto rounded-md overflow-hidden">
                    <img 
                      src={community.image} 
                      alt={community.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{community.name}</h3>
                      <Badge variant="outline" className="bg-ur-green/10 text-ur-green border-none">
                        Member
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{community.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{community.members} members</span>
                      <span>{community.posts} posts</span>
                    </div>
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <Avatar key={i} className="border-2 border-white w-6 h-6">
                            <AvatarFallback className="text-[10px] bg-ur-green text-white">
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">and many more</span>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-ur-blue hover:text-ur-blue hover:bg-ur-blue/10"
                    >
                      View Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Recommended Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedCommunities.map((community) => (
              <div key={community.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="h-36 overflow-hidden">
                  <img 
                    src={community.image} 
                    alt={community.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{community.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{community.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{community.members} members</span>
                    <Button variant="outline" size="sm" className="h-8">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCommunities;
