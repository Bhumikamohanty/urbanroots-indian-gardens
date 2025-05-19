
import React, { useState } from 'react';
import { shopItems, shopCategories } from '@/data/shopItems';
import ShopItem from '@/components/ui/ShopItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, SlidersHorizontal, Leaf, FlowerIcon, Soil, Plant } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Get unique subcategories based on the current category filter
  const getSubCategories = () => {
    const allItems = categoryFilter === 'all' 
      ? shopItems 
      : shopItems.filter(item => item.category === categoryFilter);
    
    const subCategories = new Set<string>();
    allItems.forEach(item => {
      if (item.subCategory) {
        subCategories.add(item.subCategory);
      }
    });
    
    return Array.from(subCategories);
  };
  
  const filteredItems = shopItems.filter(item => {
    // Filter by search term
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by main category
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    // Filter by subcategory if available
    const matchesSubCategory = subCategoryFilter === 'all' || item.subCategory === subCategoryFilter;
    
    // Filter by price range
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    // Filter by stock availability
    const matchesStock = !inStockOnly || item.inStock;
    
    return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice && matchesStock;
  });

  const resetFilters = () => {
    setCategoryFilter('all');
    setSubCategoryFilter('all');
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSearchTerm('');
  };

  // Featured categories section with uploaded images
  const featuredCategories = [
    { 
      name: "Decorative Pots", 
      icon: <FlowerIcon className="h-5 w-5" />,
      image: "/lovable-uploads/38fffba7-931d-4ea7-8380-8937c7953a55.png",
      description: "Colorful metal planters for your balcony garden"
    },
    { 
      name: "Soil & Cocopeat", 
      icon: <Soil className="h-5 w-5" />,
      image: "/lovable-uploads/aa9ce943-6592-4572-aa4e-34e05202603c.png",
      description: "Nutrient-rich growing medium for healthy plants"
    },
    { 
      name: "Fresh Herbs", 
      icon: <Leaf className="h-5 w-5" />,
      image: "/lovable-uploads/e480c8e6-6e6d-4c23-a22b-17c28b86047e.png",
      description: "Coriander and other kitchen herbs for cooking"
    },
    { 
      name: "Garden Tools", 
      icon: <Plant className="h-5 w-5" />,
      image: "/lovable-uploads/9644e160-4ea7-422d-a85f-7b3f4d30a65e.png",
      description: "Quality pruning tools for plant maintenance"
    }
  ];

  // Featured products with uploaded images
  const featuredProducts = [
    {
      name: "Gardening Gloves Set",
      price: 299,
      image: "/lovable-uploads/1558ac92-a1f1-4f60-8c98-4d8ee34a2245.png",
      description: "Comfortable, durable gloves for all your gardening needs"
    },
    {
      name: "Garden Towel",
      price: 199,
      image: "/lovable-uploads/2ead0e2e-7276-467d-ad02-8b5819033e73.png",
      description: "Absorbent microfiber towel for garden cleanup"
    },
    {
      name: "Organic Compost",
      price: 449,
      image: "/lovable-uploads/c65cf37b-3d2d-4727-ba81-83ee6abb23fe.png",
      description: "Nutrient-rich organic compost for healthy plants"
    },
    {
      name: "Neem Oil Spray",
      price: 299,
      image: "/lovable-uploads/a736f928-0d1b-4acf-b12c-5ad4d09681e7.png",
      description: "Natural pest control solution for organic gardening"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Shop Plants & Gardening Supplies</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Discover quality plants and gardening tools perfect for Indian balconies and terraces.
            Everything you need for your urban gardening journey.
          </p>
        </div>
      </div>
      
      {/* Featured Categories with Images */}
      <div className="ur-container mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {featuredCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-ur-green/10 p-2 rounded-full mr-2">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-ur-green">{category.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
                <Button 
                  variant="link" 
                  className="mt-2 p-0 text-ur-green font-semibold" 
                  onClick={() => setCategoryFilter(category.name.split(" ")[0])}
                >
                  Browse {category.name} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="ur-container mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Gardening Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-ur-green font-medium">₹{product.price}</span>
                  <Button size="sm" className="bg-ur-green hover:bg-ur-green/90 text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="ur-container">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Find Your Perfect Garden Companion</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search plants, tools, supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {shopCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <SlidersHorizontal size={16} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    {categoryFilter !== 'all' && getSubCategories().length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Sub Categories</h3>
                        <Select value={subCategoryFilter} onValueChange={setSubCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Sub-Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sub-Categories</SelectItem>
                            {getSubCategories().map(subCat => (
                              <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="number" 
                          placeholder="Min" 
                          className="w-24" 
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        />
                        <span>to</span>
                        <Input 
                          type="number" 
                          placeholder="Max" 
                          className="w-24"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Availability</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="in-stock" 
                          checked={inStockOnly}
                          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                        />
                        <Label htmlFor="in-stock">In Stock Only</Label>
                      </div>
                    </div>
                    
                    <Button onClick={resetFilters} variant="outline" className="w-full">
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredItems.length} Products Available
          </h2>
          
          {/* Container Gardening Feature */}
          {categoryFilter === 'all' && (
            <div className="hidden md:block">
              <Button 
                variant="link" 
                className="text-ur-green"
                onClick={() => {
                  setCategoryFilter('Tool');
                }}
              >
                Container Gardening Supplies →
              </Button>
            </div>
          )}
        </div>
        
        <Separator className="mb-6" />
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No products match your search</h3>
            <p className="text-gray-500 mt-2">Try changing your filters or search term</p>
          </div>
        )}
      </div>

      {/* Tomato Growing Feature */}
      <div className="ur-container mt-12">
        <div className="bg-ur-green/5 rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-ur-green mb-3">Grow Fresh Tomatoes at Home</h2>
              <p className="text-gray-600 mb-4">
                Transform your balcony into a tomato garden with our premium tomato plants.
                Fresh, homegrown tomatoes just steps from your kitchen!
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-ur-green mr-2 mt-0.5" />
                  <span>Easy to grow in containers</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-ur-green mr-2 mt-0.5" />
                  <span>Requires just 4-6 hours of sunlight</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-ur-green mr-2 mt-0.5" />
                  <span>Perfect for Indian weather conditions</span>
                </li>
              </ul>
              <Button 
                className="bg-ur-green hover:bg-ur-green/90 text-white"
                onClick={() => {
                  setCategoryFilter('Plant');
                  setSubCategoryFilter('Vegetable');
                  setSearchTerm('Tomato');
                }}
              >
                Explore Tomato Plants
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/1db0a6d1-dc6a-4470-a430-6d8a3482c2e4.png" 
                alt="Tomato Plant in Container" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
