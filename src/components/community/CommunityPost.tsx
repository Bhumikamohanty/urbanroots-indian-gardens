
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Share } from 'lucide-react';
import { CommunityPostType } from './CommunityFeed';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface CommunityPostProps {
  post: CommunityPostType;
}

// Function to format relative time (e.g. "2 days ago")
const getRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

// Function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(post.likes);
  
  const handleLike = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to like posts");
      return;
    }
    
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const handleComment = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to comment");
      return;
    }
    
    toast.info("Comments feature coming soon!");
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    toast.success("Post link copied to clipboard!");
  };

  // Format content with line breaks
  const formattedContent = post.content.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < post.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center space-y-0 gap-3 pb-3">
        <Avatar>
          <AvatarImage src={post.userImage} />
          <AvatarFallback className="bg-ur-green text-white">
            {getInitials(post.userName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="font-semibold">{post.userName}</div>
          <div className="text-sm text-gray-500">
            {getRelativeTime(post.createdAt)}
            {post.region && ` · ${post.region}`}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-3">
        <p className="text-gray-700 whitespace-pre-line mb-3">
          {formattedContent}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="bg-gray-50 text-gray-600">
                #{tag.toLowerCase().replace(/\s+/g, '')}
              </Badge>
            ))}
          </div>
        )}
        
        {post.images && post.images.length > 0 && (
          <div className="mt-3">
            {post.images.length === 1 ? (
              <img 
                src={post.images[0]} 
                alt="Post content" 
                className="rounded-md w-full object-cover max-h-96"
              />
            ) : (
              <Carousel className="w-full">
                <CarouselContent>
                  {post.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image} 
                        alt={`Post image ${index + 1}`}
                        className="rounded-md w-full object-cover max-h-96"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-gray-100">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm"
            className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleComment}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommunityPost;
