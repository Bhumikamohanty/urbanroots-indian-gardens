
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Filter, Layers } from 'lucide-react';
import { toast } from 'sonner';
import GardenIdeaForm from './GardenIdeaForm';

export interface GardenIdeaType {
  id: string;
  title: string;
  description: string;
  images: string[];
  space: 'small' | 'medium' | 'large';
  style: string[];
  plantTypes: string[];
  createdBy: string;
  isCurated: boolean;
}

// Sample curated ideas
const curatedIdeas: GardenIdeaType[] = [
  {
    id: 'curated-1',
    title: 'Vertical Herb Wall',
    description: 'A space-saving vertical setup perfect for growing herbs in a small balcony. Uses recycled plastic bottles mounted on a wooden frame with an integrated drip irrigation system.',
    images: [
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1611843467160-25afb8df1074?ixlib=rb-4.0.3'
    ],
    space: 'small',
    style: ['Minimalist', 'Sustainable'],
    plantTypes: ['Herbs'],
    createdBy: 'UrbanRoots Team',
    isCurated: true
  },
  {
    id: 'curated-2',
    title: 'Colorful Container Garden',
    description: 'A vibrant mix of flowering plants and herbs in painted terracotta pots. Perfect for adding color to your kitchen balcony while providing fresh herbs for cooking.',
    images: [
      'https://images.unsplash.com/photo-1595351474245-e40191a28225?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1610706936473-8925be0e1f68?ixlib=rb-4.0.3'
    ],
    space: 'medium',
    style: ['Colorful', 'Decorative'],
    plantTypes: ['Herbs', 'Flowers'],
    createdBy: 'UrbanRoots Team',
    isCurated: true
  },
  {
    id: 'curated-3',
    title: 'Complete Vegetable Setup',
    description: 'A high-yield vegetable garden setup using a combination of vertical and horizontal space. Includes trellises for climbing plants and a tiered shelf system.',
    images: [
      'https://images.unsplash.com/photo-1623241899289-e9a64d8cfcbf?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1621958443248-2c23ead72f22?ixlib=rb-4.0.3'
    ],
    space: 'large',
    style: ['Productive', 'Organized'],
    plantTypes: ['Vegetables', 'Herbs'],
    createdBy: 'UrbanRoots Team',
    isCurated: true
  },
  {
    id: 'curated-4',
    title: 'Hanging Garden Paradise',
    description: 'Utilize ceiling space with beautiful hanging planters for a lush green look without taking up precious floor space.',
    images: [
      'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1603436326446-74e2d65189c7?ixlib=rb-4.0.3'
    ],
    space: 'small',
    style: ['Lush', 'Space-saving'],
    plantTypes: ['Indoor Plants', 'Herbs'],
    createdBy: 'UrbanRoots Team',
    isCurated: true
  },
  {
    id: 'curated-5',
    title: 'Traditional Tulsi Chaura',
    description: 'A modern take on the traditional Tulsi (Holy Basil) planter with integrated storage for gardening supplies.',
    images: [
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3',
    ],
    space: 'small',
    style: ['Traditional', 'Cultural'],
    plantTypes: ['Medicinal', 'Herbs'],
    createdBy: 'UrbanRoots Team',
    isCurated: true
  },
  {
    id: 'curated-6',
    title: 'Urban Jungle Corner',
    description: 'Transform a corner of your balcony into a dense mini-jungle with a mix of large and small plants at varying heights.',
    images: [
      'https://images.unsplash.com/photo-1604762512526-b7896fe04ccf?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3'
    ],
    space: 'medium',
    style: ['Lush', 'Layered'],
    plantTypes: ['Indoor Plants', 'Flowering Plants'],
    createdBy: 'UrbanRoots Team',
    isCurated: true
  }
];

const spaceOptions = ['All Sizes', 'Small', 'Medium', 'Large'];
const styleOptions = [
  'All Styles',
  'Minimalist',
  'Colorful',
  'Sustainable',
  'Productive', 
  'Traditional',
  'Space-saving',
  'Decorative'
];
const plantTypeOptions = [
  'All Types',
  'Herbs',
  'Vegetables', 
  'Flowers',
  'Indoor Plants', 
  'Medicinal'
];

const GardenIdeas: React.FC = () => {
  const [ideas, setIdeas] = useState<GardenIdeaType[]>(curatedIdeas);
  const [spaceFilter, setSpaceFilter] = useState<string>('All Sizes');
  const [styleFilter, setStyleFilter] = useState<string>('All Styles');
  const [plantTypeFilter, setPlantTypeFilter] = useState<string>('All Types');
  
  // This would normally come from authentication context
  const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
  const loggedInUserName = isLoggedIn ? JSON.parse(localStorage.getItem('user') || '{"name":"User"}').name : '';
  
  const handleAddIdea = (idea: GardenIdeaType) => {
    setIdeas(prevIdeas => [idea, ...prevIdeas]);
  };
  
  const filterIdeas = (ideaList: GardenIdeaType[]): GardenIdeaType[] => {
    return ideaList.filter(idea => {
      // Filter by space
      if (spaceFilter !== 'All Sizes' && idea.space !== spaceFilter.toLowerCase()) {
        return false;
      }
      
      // Filter by style
      if (styleFilter !== 'All Styles' && !idea.style.includes(styleFilter)) {
        return false;
      }
      
      // Filter by plant type
      if (plantTypeFilter !== 'All Types' && !idea.plantTypes.includes(plantTypeFilter)) {
        return false;
      }
      
      return true;
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-ur-green">Kitchen Balcony Garden Ideas</h2>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="bg-ur-green hover:bg-ur-green/90 text-white"
              disabled={!isLoggedIn}
              title={!isLoggedIn ? "Please log in to share your ideas" : ""}
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Your Setup
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Share Your Garden Setup</SheetTitle>
              <SheetDescription>
                Upload photos and details of your balcony or kitchen garden to inspire others.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <GardenIdeaForm onIdeaSubmit={handleAddIdea} userName={loggedInUserName} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg flex flex-wrap gap-3">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-3 flex-1">
          <Select value={spaceFilter} onValueChange={setSpaceFilter}>
            <SelectTrigger className="h-9 w-[150px] bg-white">
              <SelectValue placeholder="Space Size" />
            </SelectTrigger>
            <SelectContent>
              {spaceOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={styleFilter} onValueChange={setStyleFilter}>
            <SelectTrigger className="h-9 w-[150px] bg-white">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={plantTypeFilter} onValueChange={setPlantTypeFilter}>
            <SelectTrigger className="h-9 w-[150px] bg-white">
              <SelectValue placeholder="Plant Types" />
            </SelectTrigger>
            <SelectContent>
              {plantTypeOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto justify-start mb-6">
          <TabsTrigger value="all">All Ideas</TabsTrigger>
          <TabsTrigger value="curated">Curated Examples</TabsTrigger>
          <TabsTrigger value="community">Community Shared</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filterIdeas(ideas).length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Layers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-700">No matching ideas found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or share your own garden setup!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterIdeas(ideas).map(idea => (
                <GardenIdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="curated" className="space-y-6">
          {filterIdeas(ideas.filter(idea => idea.isCurated)).length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No curated ideas match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterIdeas(ideas.filter(idea => idea.isCurated)).map(idea => (
                <GardenIdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="community" className="space-y-6">
          {filterIdeas(ideas.filter(idea => !idea.isCurated)).length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Layers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-700">No community ideas yet</h3>
              <p className="text-gray-500 mt-2">
                Be the first to share your garden setup!
              </p>
              {!isLoggedIn && (
                <p className="text-gray-500 mt-1">
                  (Log in to share your ideas)
                </p>
              )}
              {isLoggedIn && (
                <Button 
                  className="mt-4 bg-ur-green hover:bg-ur-green/90 text-white"
                  onClick={() => 
                    document.querySelector<HTMLButtonElement>('[data-sheet-trigger="true"]')?.click()
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Setup
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterIdeas(ideas.filter(idea => !idea.isCurated)).map(idea => (
                <GardenIdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Garden Idea Card Component
const GardenIdeaCard: React.FC<{ idea: GardenIdeaType }> = ({ idea }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === idea.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? idea.images.length - 1 : prev - 1
    );
  };
  
  return (
    <Card className="overflow-hidden hover-glow">
      <div className="relative h-48">
        <img 
          src={idea.images[currentImageIndex]} 
          alt={idea.title}
          className="w-full h-full object-cover" 
        />
        
        {idea.images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80"
              onClick={prevImage}
            >
              &#10094;
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80"
              onClick={nextImage}
            >
              &#10095;
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {idea.images.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute top-2 left-2 bg-ur-green text-white text-xs px-2 py-1 rounded">
          {idea.space.charAt(0).toUpperCase() + idea.space.slice(1)} space
        </div>
        
        {idea.isCurated && (
          <div className="absolute top-2 right-2 bg-ur-orange text-white text-xs px-2 py-1 rounded">
            Curated
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-ur-green mb-1">{idea.title}</h3>
        <p className="text-xs text-gray-500 mb-2">By: {idea.createdBy}</p>
        
        <p className="text-sm text-gray-700 line-clamp-3 mb-3">
          {idea.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {idea.style.map(style => (
            <span 
              key={style}
              className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded"
            >
              {style}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {idea.plantTypes.map(type => (
            <span 
              key={type}
              className="text-xs bg-ur-green/10 text-ur-green px-2 py-0.5 rounded"
            >
              {type}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GardenIdeas;
