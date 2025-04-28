
import React, { useState } from 'react';
import { videoTutorials } from '@/data/videoTutorials';
import VideoCard from '@/components/ui/VideoCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, BookOpen } from 'lucide-react';

const Learn: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const categories = Array.from(new Set(videoTutorials.map(video => video.category)));
  
  const filteredVideos = videoTutorials.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container text-center">
          <div className="flex justify-center mb-4">
            <BookOpen size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Learn Indian Gardening</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Explore our collection of tutorials and guides specifically created for
            gardening in Indian weather conditions and spaces.
          </p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="ur-container mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No tutorials match your search</h3>
            <p className="text-gray-500 mt-2">Try changing your filters or search term</p>
          </div>
        )}
      </div>
      
      {/* Resources Section */}
      <div className="ur-container mt-16">
        <h2 className="text-2xl font-bold text-ur-green mb-6">Additional Gardening Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Resource Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <h3 className="text-lg font-bold text-ur-green mb-2">Balcony Garden Guide</h3>
            <p className="text-gray-600 mb-4">
              Complete PDF guide for setting up your first balcony garden in Indian apartments.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-ur-blue hover:underline"
            >
              Download PDF
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Resource Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <h3 className="text-lg font-bold text-ur-green mb-2">Seasonal Planting Calendar</h3>
            <p className="text-gray-600 mb-4">
              Month-by-month guide on what to plant during different seasons in India.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-ur-blue hover:underline"
            >
              View Calendar
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Resource Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <h3 className="text-lg font-bold text-ur-green mb-2">Organic Pest Control</h3>
            <p className="text-gray-600 mb-4">
              Natural remedies and techniques to keep pests away from your plants.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-ur-blue hover:underline"
            >
              Read Guide
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Resource Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <h3 className="text-lg font-bold text-ur-green mb-2">DIY Garden Projects</h3>
            <p className="text-gray-600 mb-4">
              Creative projects to enhance your balcony garden using locally available materials.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-ur-blue hover:underline"
            >
              Explore Projects
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
