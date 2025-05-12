
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CommunityPostForm from './CommunityPostForm';
import CommunityPost from './CommunityPost';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MessageSquare, Heart, Share, List, Plus } from 'lucide-react';

// Sample interface for community post type (for demonstration)
export interface CommunityPostType {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  region?: string;
  tags?: string[];
}

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPostType[]>([]);
  const [sortOption, setSortOption] = useState<string>('recent');
  const [showNewPostSheet, setShowNewPostSheet] = useState(false);
  
  // This would normally come from authentication context
  const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
  const loggedInUserName = isLoggedIn ? JSON.parse(localStorage.getItem('user') || '{"name":"User"}').name : '';
  
  const handleAddPost = (post: CommunityPostType) => {
    setPosts(prevPosts => [post, ...prevPosts]);
    setShowNewPostSheet(false);
  };
  
  const sortPosts = (postsToSort: CommunityPostType[]): CommunityPostType[] => {
    switch (sortOption) {
      case 'recent':
        return [...postsToSort].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'liked':
        return [...postsToSort].sort((a, b) => b.likes - a.likes);
      case 'commented':
        return [...postsToSort].sort((a, b) => b.comments - a.comments);
      default:
        return postsToSort;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-ur-green">Community Garden Showcase</h2>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full md:w-[180px]">
              <List className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="liked">Most Liked</SelectItem>
              <SelectItem value="commented">Most Commented</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="bg-ur-green hover:bg-ur-green/90 text-white"
                disabled={!isLoggedIn}
                title={!isLoggedIn ? "Please log in to share your experience" : ""}
              >
                <Plus className="h-4 w-4 mr-2" />
                Share
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Share Your Garden Experience</SheetTitle>
                <SheetDescription>
                  Share your gardening journey, tips, or questions with the community.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <CommunityPostForm onPostSubmit={handleAddPost} userName={loggedInUserName} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto justify-start mb-6 overflow-x-auto">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="north">North India</TabsTrigger>
          <TabsTrigger value="south">South India</TabsTrigger>
          <TabsTrigger value="east">East India</TabsTrigger>
          <TabsTrigger value="west">West India</TabsTrigger>
          <TabsTrigger value="central">Central India</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-700">No Posts Yet</h3>
              <p className="text-gray-500 mt-2">
                Be the first to share your gardening experience!
              </p>
              {!isLoggedIn && (
                <p className="text-gray-500 mt-1">
                  (Log in to share your posts)
                </p>
              )}
              {isLoggedIn && (
                <Button 
                  className="mt-4 bg-ur-green hover:bg-ur-green/90 text-white"
                  onClick={() => setShowNewPostSheet(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              )}
            </div>
          ) : (
            sortPosts(posts).map(post => (
              <CommunityPost key={post.id} post={post} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="north" className="space-y-4">
          {posts.filter(post => post.region === 'North India').length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No posts from North India yet.</p>
            </div>
          ) : (
            sortPosts(posts.filter(post => post.region === 'North India')).map(post => (
              <CommunityPost key={post.id} post={post} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="south" className="space-y-4">
          {posts.filter(post => post.region === 'South India').length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No posts from South India yet.</p>
            </div>
          ) : (
            sortPosts(posts.filter(post => post.region === 'South India')).map(post => (
              <CommunityPost key={post.id} post={post} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="east" className="space-y-4">
          {posts.filter(post => post.region === 'East India').length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No posts from East India yet.</p>
            </div>
          ) : (
            sortPosts(posts.filter(post => post.region === 'East India')).map(post => (
              <CommunityPost key={post.id} post={post} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="west" className="space-y-4">
          {posts.filter(post => post.region === 'West India').length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No posts from West India yet.</p>
            </div>
          ) : (
            sortPosts(posts.filter(post => post.region === 'West India')).map(post => (
              <CommunityPost key={post.id} post={post} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="central" className="space-y-4">
          {posts.filter(post => post.region === 'Central India').length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No posts from Central India yet.</p>
            </div>
          ) : (
            sortPosts(posts.filter(post => post.region === 'Central India')).map(post => (
              <CommunityPost key={post.id} post={post} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityFeed;
