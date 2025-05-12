
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GuidanceItem {
  title: string;
  description: string;
  image: string;
  tips: string[];
}

const verticalGardenItems: GuidanceItem[] = [
  {
    title: 'Pocket Planters',
    description: 'Utilize vertical space with fabric pocket planters mounted on walls.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Select plants with shallow root systems like herbs and small flowers.',
      'Install proper drainage to avoid wall damage.',
      'Consider a drip irrigation system for easier watering.'
    ]
  },
  {
    title: 'Stack Planters',
    description: 'Create a tower of stacked pots for an elegant vertical display.',
    image: 'https://images.unsplash.com/photo-1427587558728-6643cb6c4473?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Use larger pots at the bottom and smaller ones at the top.',
      'Consider stability and weight distribution.',
      'Plant cascading varieties at the edges.'
    ]
  },
  {
    title: 'Trellis Gardens',
    description: 'Install trellises for climbing plants like peas, beans, and flowering vines.',
    image: 'https://images.unsplash.com/photo-1509253111019-88b464597648?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Choose appropriate trellis material based on plant weight.',
      'Position trellises to maximize sunlight without blocking other plants.',
      'Consider decorative trellises as focal points.'
    ]
  },
];

const colorCoordinationItems: GuidanceItem[] = [
  {
    title: 'Monochromatic Scheme',
    description: 'Create a sophisticated garden using variations of a single color.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Use different textures to add visual interest.',
      'Vary the shades and tints of your chosen color.',
      'Add white or silver plants as highlights.'
    ]
  },
  {
    title: 'Complementary Colors',
    description: 'Pair plants with opposite colors on the color wheel for vibrant contrast.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Combine purple and yellow flowers for striking impact.',
      'Use blue and orange for a balanced yet vibrant look.',
      'Incorporate green foliage as a neutral element.'
    ]
  },
  {
    title: 'Seasonal Color Transition',
    description: 'Plan your garden to showcase different colors as seasons change.',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Research blooming periods to ensure continuous color.',
      'Include evergreen plants for year-round structure.',
      'Consider foliage that changes color in fall or winter.'
    ]
  },
];

const companionPlantingItems: GuidanceItem[] = [
  {
    title: 'Herbs & Vegetables',
    description: 'Strategic companion planting enhances growth and deters pests.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Plant basil near tomatoes to improve flavor and repel pests.',
      'Grow marigolds throughout the garden to deter insects.',
      'Pair carrots with onions to confuse pests with strong scents.'
    ]
  },
  {
    title: 'Three Sisters Method',
    description: 'Traditional planting of corn, beans, and squash that work symbiotically.',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Corn provides support for climbing beans.',
      'Beans fix nitrogen in soil, benefiting all three plants.',
      'Squash leaves provide ground cover, reducing weeds and water evaporation.'
    ]
  },
  {
    title: 'Beneficial Insect Attractors',
    description: 'Include flowers that attract pollinators and beneficial insects.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Plant lavender, sunflowers and zinnias to attract bees.',
      'Include dill and fennel to attract predatory insects like ladybugs.',
      'Create mini insect "hotels" near your garden.'
    ]
  },
];

const upcycledMaterialsItems: GuidanceItem[] = [
  {
    title: 'Tin Can Planters',
    description: 'Convert old tin cans into charming herb planters with minimal effort.',
    image: 'https://images.unsplash.com/photo-1610890547793-bc215d8e0702?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Punch drainage holes in the bottom of cans.',
      'Paint cans with outdoor paint for durability and aesthetics.',
      'Create hanging displays with string or wire.'
    ]
  },
  {
    title: 'Pallet Gardens',
    description: 'Transform wooden pallets into vertical gardens or raised beds.',
    image: 'https://images.unsplash.com/photo-1593193583589-2972258a31f5?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Check for treatment stamps and only use heat-treated (HT) pallets.',
      'Sand rough edges and consider sealing wood for outdoor durability.',
      'Line with landscape fabric to contain soil.'
    ]
  },
  {
    title: 'Boot & Shoe Planters',
    description: 'Give old footwear new life as whimsical container gardens.',
    image: 'https://images.unsplash.com/photo-1587500919209-9bb3d7602996?q=80&w=800&auto=format&fit=crop',
    tips: [
      'Drill drainage holes in the soles.',
      'Choose small shallow-rooted plants like succulents or small herbs.',
      'Group several together for greater visual impact.'
    ]
  },
];

const AestheticGuidance: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-ur-green">Aesthetic Garden Design</h2>
      
      <p className="text-gray-700">
        Transform your kitchen garden into a visually stunning space that enhances your home while remaining functional.
        Explore these design ideas to create a garden that's both beautiful and productive.
      </p>
      
      <Tabs defaultValue="vertical" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="vertical">Vertical Gardens</TabsTrigger>
          <TabsTrigger value="color">Color Coordination</TabsTrigger>
          <TabsTrigger value="companion">Companion Planting</TabsTrigger>
          <TabsTrigger value="upcycled">Upcycled Materials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vertical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {verticalGardenItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover-glow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover-grow"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-ur-green">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <ScrollArea className="h-32 rounded">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Tips:</h4>
                      <ul className="list-disc pl-4 text-sm text-gray-600">
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="color" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {colorCoordinationItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover-glow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover-grow"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-ur-green">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <ScrollArea className="h-32 rounded">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Tips:</h4>
                      <ul className="list-disc pl-4 text-sm text-gray-600">
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="companion" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {companionPlantingItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover-glow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover-grow"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-ur-green">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <ScrollArea className="h-32 rounded">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Tips:</h4>
                      <ul className="list-disc pl-4 text-sm text-gray-600">
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcycled" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcycledMaterialsItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover-glow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover-grow"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-ur-green">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <ScrollArea className="h-32 rounded">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Tips:</h4>
                      <ul className="list-disc pl-4 text-sm text-gray-600">
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AestheticGuidance;
