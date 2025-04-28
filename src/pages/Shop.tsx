
import React, { useState } from 'react';
import { shopItems, shopCategories } from '@/data/shopItems';
import ShopItem from '@/components/ui/ShopItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, SlidersHorizontal } from 'lucide-react';
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
      
      {/* Search and Filters */}
      <div className="ur-container mt-8">
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
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredItems.length} Products Available
          </h2>
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
    </div>
  );
};

export default Shop;
