
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sun, CloudSun, CloudMoonRain, Layers, Sprout, Recycle } from 'lucide-react';

interface SeasonalTip {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'seasonal' | 'diy' | 'eco';
  season?: 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';
}

// Updated seasonal tips data with better images
const seasonalTipsData: SeasonalTip[] = [
  {
    id: '1',
    title: 'Summer Gardening Tips',
    description: 'Protect your plants from extreme heat with these simple steps. Use shade cloth for delicate plants, water early morning or evening, and mulch to retain moisture.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop',
    category: 'seasonal',
    season: 'summer'
  },
  {
    id: '2',
    title: 'Monsoon Plant Care',
    description: 'Keep your plants healthy during heavy rains by ensuring proper drainage, checking for fungus, and protecting from waterlogging.',
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=800&auto=format&fit=crop',
    category: 'seasonal',
    season: 'monsoon'
  },
  {
    id: '3',
    title: 'DIY Upcycled Pot Ideas',
    description: 'Transform everyday household items into beautiful plant containers. Turn old buckets, cans, plastic bottles, and even broken ceramics into unique planters.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format&fit=crop',
    category: 'diy'
  },
  {
    id: '4',
    title: 'Eco-friendly Pest Repellents',
    description: 'Make your own natural pest repellents using common kitchen ingredients like neem oil, garlic, chili powder, and vinegar.',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=800&auto=format&fit=crop',
    category: 'eco'
  },
  {
    id: '5',
    title: 'Winter Plant Protection',
    description: 'Shield sensitive plants from cold weather by moving them indoors, using jute covers at night, and reducing watering frequency.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
    category: 'seasonal',
    season: 'winter'
  },
  {
    id: '6',
    title: 'Homemade Compost Guide',
    description: 'Create nutrient-rich compost from kitchen scraps and garden waste. Learn the layering technique, proper moisture maintenance, and turning schedule.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
    category: 'eco'
  }
];

// Function to get current season in India
const getCurrentSeason = (): 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter' => {
  const month = new Date().getMonth(); // 0-11 (Jan-Dec)
  
  // Simplified seasons for India
  if (month >= 2 && month <= 3) return 'spring';      // March-April
  if (month >= 4 && month <= 5) return 'summer';      // May-June
  if (month >= 6 && month <= 8) return 'monsoon';     // July-September
  if (month >= 9 && month <= 10) return 'autumn';     // October-November
  return 'winter';                                   // December-February
};

// Get seasonal icon based on season
const getSeasonalIcon = (category: string, season?: string) => {
  if (category !== 'seasonal') {
    if (category === 'diy') {
      return <Sprout className="h-5 w-5" />;
    } else if (category === 'eco') {
      return <Recycle className="h-5 w-5" />;
    }
    return <Layers className="h-5 w-5" />;
  }
  
  switch (season) {
    case 'summer':
      return <Sun className="h-5 w-5" />;
    case 'winter':
      return <CloudSun className="h-5 w-5" />;
    case 'monsoon':
      return <CloudMoonRain className="h-5 w-5" />;
    default:
      return <Sun className="h-5 w-5" />;
  }
};

const SeasonalTipsCarousel: React.FC = () => {
  const [tips, setTips] = useState<SeasonalTip[]>([]);
  const currentSeason = getCurrentSeason();
  
  // Sort tips to prioritize current season
  useEffect(() => {
    const sortedTips = [...seasonalTipsData].sort((a, b) => {
      // Current season tips first
      if (a.season === currentSeason && b.season !== currentSeason) return -1;
      if (a.season !== currentSeason && b.season === currentSeason) return 1;
      return 0;
    });
    
    setTips(sortedTips);
    
    // Simulate refreshing content every 2 days
    const simulateContentRefresh = () => {
      // In a real app, this would fetch new content from an API
      // For now, we'll just shuffle the existing tips
      setTips(prev => [...prev].sort(() => Math.random() - 0.5));
    };
    
    // Check if we should update based on localStorage timestamp
    const lastUpdated = localStorage.getItem('seasonalTipsLastUpdated');
    const now = new Date().getTime();
    
    if (!lastUpdated || (now - Number(lastUpdated)) > (2 * 24 * 60 * 60 * 1000)) {
      // It's been more than 2 days, update
      localStorage.setItem('seasonalTipsLastUpdated', now.toString());
      simulateContentRefresh();
    }
    
  }, [currentSeason]);

  if (tips.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-ur-green">Seasonal Tips & Eco DIY</h2>
        <Button variant="link" className="text-ur-green">
          View All
        </Button>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {tips.map((tip) => (
            <CarouselItem key={tip.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="overflow-hidden hover-glow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover hover-grow transition-transform duration-300" 
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-ur-green">{tip.title}</h3>
                    <div 
                      className={`rounded-full p-1 ${
                        tip.category === 'seasonal' 
                          ? 'bg-ur-orange/10 text-ur-orange' 
                          : tip.category === 'diy' 
                            ? 'bg-ur-blue/10 text-ur-blue' 
                            : 'bg-ur-green/10 text-ur-green'
                      }`}
                    >
                      {getSeasonalIcon(tip.category, tip.season)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {tip.description.length > 120 
                      ? `${tip.description.substring(0, 120)}...` 
                      : tip.description
                    }
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default SeasonalTipsCarousel;
