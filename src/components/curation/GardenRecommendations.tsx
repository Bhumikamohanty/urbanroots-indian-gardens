
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Sprout, FlowerIcon, Sun, ArrowLeft } from 'lucide-react';

interface RecommendationsProps {
  data: any;
  onBack: () => void;
}

// Mock recommendations based on user preferences
const getPlantRecommendations = (data: any) => {
  const recommendations = [];
  
  if (data.gardenType === 'herb' || data.plantTypes.includes('herbs')) {
    recommendations.push({
      name: "Tulsi (Holy Basil)",
      description: "Sacred plant with medicinal properties, thrives in Indian climate",
      image: "https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690",
      difficulty: "Easy"
    });
    recommendations.push({
      name: "Mint (Pudina)",
      description: "Perfect for chutney and raita, grows easily in pots",
      image: "https://5.imimg.com/data5/SELLER/Default/2020/8/XQ/ED/UW/106270270/mint-pudina-.jpg",
      difficulty: "Easy"
    });
  }
  
  if (data.gardenType === 'veggie' || data.plantTypes.includes('edibles')) {
    recommendations.push({
      name: "Cherry Tomatoes",
      description: "Compact plants perfect for balconies, produce sweet fruits",
      image: "https://images.unsplash.com/photo-1592841200221-a4f8c8f200e6?q=80&w=800&auto=format&fit=crop",
      difficulty: "Medium"
    });
    recommendations.push({
      name: "Green Chillies",
      description: "Essential for Indian cooking, grows well in pots",
      image: "https://images.unsplash.com/photo-1627816235283-fb5fb8203fa0?q=80&w=800&auto=format&fit=crop",
      difficulty: "Easy"
    });
  }
  
  if (data.gardenType === 'flower' || data.plantTypes.includes('flowers')) {
    recommendations.push({
      name: "Marigold",
      description: "Vibrant flowers that repel pests naturally",
      image: "https://images.unsplash.com/photo-1634913940104-d79b937f5045?q=80&w=800&auto=format&fit=crop",
      difficulty: "Easy"
    });
    recommendations.push({
      name: "Jasmine",
      description: "Fragrant climbing plant perfect for balcony railings",
      image: "https://images.unsplash.com/photo-1627931539006-49bfb7f93c68?q=80&w=800&auto=format&fit=crop",
      difficulty: "Medium"
    });
  }
  
  // Add default recommendations if none match
  if (recommendations.length === 0) {
    recommendations.push({
      name: "Snake Plant",
      description: "Nearly indestructible, purifies air, requires minimal water",
      image: "https://images.unsplash.com/photo-1593482892290-f54c7f8ed703?q=80&w=800&auto=format&fit=crop",
      difficulty: "Very Easy"
    });
    recommendations.push({
      name: "Money Plant",
      description: "Hardy vine that grows in water or soil, brings good fortune",
      image: "https://images.unsplash.com/photo-1614594805320-e6a5549d3e4f?q=80&w=800&auto=format&fit=crop",
      difficulty: "Easy"
    });
  }
  
  return recommendations;
};

// Mock layout suggestions based on user preferences
const getLayoutSuggestions = (data: any) => {
  const layouts = [];
  
  if (data.size === 'xs' || data.size === 'sm') {
    layouts.push({
      name: "Vertical Garden Setup",
      description: "Maximize your small space with wall-mounted planters",
      image: "/lovable-uploads/38fffba7-931d-4ea7-8380-8937c7953a55.png"
    });
  }
  
  if (data.size === 'md' || data.size === 'lg') {
    layouts.push({
      name: "Multi-level Arrangement",
      description: "Plant stands of different heights create visual interest",
      image: "/lovable-uploads/6439b2fe-cfe0-49e8-8fdf-09c8926e06c8.png"
    });
  }
  
  if (data.vibe === 'rustic') {
    layouts.push({
      name: "Terracotta Collection",
      description: "Earthy pots with herbs and flowering plants for rustic charm",
      image: "/lovable-uploads/aa9ce943-6592-4572-aa4e-34e05202603c.png"
    });
  }
  
  if (data.vibe === 'modern') {
    layouts.push({
      name: "Geometric Minimalism",
      description: "Clean lines with monochromatic planters for contemporary look",
      image: "/lovable-uploads/9644e160-4ea7-422d-a85f-7b3f4d30a65e.png"
    });
  }
  
  // Add default layout if none match
  if (layouts.length === 0) {
    layouts.push({
      name: "Balanced Combination",
      description: "Mix of flowers, herbs and decorative elements",
      image: "/lovable-uploads/e480c8e6-6e6d-4c23-a22b-17c28b86047e.png"
    });
  }
  
  return layouts;
};

// Mock kit recommendations based on user preferences
const getKitRecommendations = (data: any) => {
  const kits = [];
  
  if (data.preferredOption === 'ready' || data.preferredOption === 'both') {
    if (data.gardenType === 'herb' || data.plantTypes.includes('herbs')) {
      kits.push({
        name: "Herb Garden Starter Kit",
        description: "Everything you need to grow 5 essential herbs for Indian cooking",
        price: 1299,
        image: "/lovable-uploads/1558ac92-a1f1-4f60-8c98-4d8ee34a2245.png"
      });
    }
    
    if (data.gardenType === 'veggie' || data.plantTypes.includes('edibles')) {
      kits.push({
        name: "Balcony Vegetable Kit",
        description: "Grow tomatoes, chillies and leafy greens in your balcony",
        price: 1499,
        image: "/lovable-uploads/2ead0e2e-7276-467d-ad02-8b5819033e73.png"
      });
    }
  }
  
  if (data.experience === 'beginner') {
    kits.push({
      name: "Beginner's Success Kit",
      description: "Foolproof plants with all supplies needed for gardening newbies",
      price: 1099,
      image: "/lovable-uploads/a736f928-0d1b-4acf-b12c-5ad4d09681e7.png"
    });
  }
  
  // Add default kit if none match
  if (kits.length === 0) {
    kits.push({
      name: "Urban Balcony Transformation Kit",
      description: "Complete package with soil, plants, pots and garden tools",
      price: 1999,
      image: "/lovable-uploads/c65cf37b-3d2d-4727-ba81-83ee6abb23fe.png"
    });
  }
  
  return kits;
};

const GardenRecommendations: React.FC<RecommendationsProps> = ({ data, onBack }) => {
  const plantRecommendations = getPlantRecommendations(data);
  const layoutSuggestions = getLayoutSuggestions(data);
  const kitRecommendations = getKitRecommendations(data);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to form
        </Button>
        <Button variant="outline" onClick={() => window.print()} className="hidden md:flex">
          Save recommendations
        </Button>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-ur-green mb-2">Your Personalized Garden Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your preferences, we've curated the perfect selection of plants, layout ideas, 
          and garden kits to help you create your dream balcony garden.
        </p>
      </div>
      
      <Tabs defaultValue="plants">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="plants" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" /> Plants
          </TabsTrigger>
          <TabsTrigger value="layouts" className="flex items-center gap-2">
            <FlowerIcon className="h-4 w-4" /> Layout Ideas
          </TabsTrigger>
          <TabsTrigger value="kits" className="flex items-center gap-2">
            <Sprout className="h-4 w-4" /> Garden Kits
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plants">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plantRecommendations.map((plant, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plant.name}
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      plant.difficulty === 'Easy' || plant.difficulty === 'Very Easy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {plant.difficulty}
                    </span>
                  </CardTitle>
                  <CardDescription>{plant.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button className="bg-ur-green hover:bg-ur-green/90">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-ur-green/5 rounded-lg">
            <h3 className="text-lg font-semibold text-ur-green mb-2">Care Tips For Your Climate</h3>
            <p className="text-gray-700">
              Based on your location ({data.location || "your region"}), these plants will need regular watering in the 
              {data.climate === 'hot-dry' ? ' hot and dry' : data.climate === 'humid-warm' ? ' humid and warm' : ''} climate. 
              {data.sunlight === 'low' ? ' Place them in the brightest spot available as they need adequate sunlight.' : ''} 
              {data.waterSource === 'yes' ? ' Having a nearby water source will make maintenance easier.' : ' Consider installing a drip irrigation system since you don\'t have a nearby water source.'}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="layouts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layoutSuggestions.map((layout, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={layout.image} 
                    alt={layout.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{layout.name}</CardTitle>
                  <CardDescription>{layout.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-ur-green hover:bg-ur-green/90">Get This Look</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-ur-green/5 rounded-lg">
            <h3 className="text-lg font-semibold text-ur-green mb-2">Layout Considerations</h3>
            <p className="text-gray-700">
              For your {data.size === 'xs' ? 'very small' : data.size === 'sm' ? 'small' : data.size === 'md' ? 'medium-sized' : 'large'} space, 
              we recommend focusing on {data.size === 'xs' || data.size === 'sm' ? 'vertical arrangements and hanging planters' : 'layered displays with ground and elevated plants'}. 
              The {data.vibe || 'selected'} style works well with the suggested layouts above.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="kits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kitRecommendations.map((kit, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={kit.image} 
                    alt={kit.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{kit.name}</CardTitle>
                  <CardDescription>{kit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-ur-green">₹{kit.price}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Contents</Button>
                  <Button className="bg-ur-green hover:bg-ur-green/90">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-ur-green/5 rounded-lg">
            <h3 className="text-lg font-semibold text-ur-green mb-2">Kit Recommendation Notes</h3>
            <p className="text-gray-700">
              {data.experience === 'beginner' 
                ? "Since you're new to gardening, these kits include detailed instructions and easy-to-grow plants." 
                : data.experience === 'intermediate'
                ? "With your existing experience, these kits contain some varieties that need moderate attention."
                : "As an experienced gardener, these kits include some specialty plants that will challenge and delight you."}
              {data.preferredOption === 'ready' 
                ? " These ready-to-use kits require minimal setup." 
                : data.preferredOption === 'diy'
                ? " While these are kits, they allow for customization and personal touches."
                : " These kits offer both convenience and opportunities for customization."}
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-ur-green mb-4">Maintenance Schedule Based On Your Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Watering</h4>
            <p className="text-gray-600 text-sm">
              {data.climate === 'hot-dry' 
                ? "Daily in summer, every 2-3 days in winter" 
                : data.climate === 'humid-warm'
                ? "Every 2-3 days, check soil moisture"
                : data.climate === 'tropical'
                ? "Every 2-3 days, more during dry spells"
                : "Every 3-4 days, adjust based on weather"}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Fertilizing</h4>
            <p className="text-gray-600 text-sm">
              {data.plantTypes.includes('edibles') || data.plantTypes.includes('herbs') || data.gardenType === 'veggie' || data.gardenType === 'herb'
                ? "Every 2-3 weeks with organic fertilizer" 
                : "Monthly with balanced fertilizer"}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Pruning</h4>
            <p className="text-gray-600 text-sm">
              {data.plantTypes.includes('herbs') || data.gardenType === 'herb'
                ? "Regular harvesting serves as pruning" 
                : data.plantTypes.includes('flowers') || data.gardenType === 'flower'
                ? "Deadhead spent flowers regularly"
                : "Trim leggy growth as needed"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <Button className="bg-ur-green hover:bg-ur-green/90">
          Shop All Recommended Products
        </Button>
      </div>
    </div>
  );
};

export default GardenRecommendations;
