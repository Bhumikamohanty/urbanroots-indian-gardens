
import React, { useState } from 'react';
import { shopItems } from '@/data/shopItems';
import ShopItem from '@/components/ui/ShopItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const categories = ['Herb', 'Vegetable', 'Succulent', 'Flowering Plant', 'Indoor Plant'];
  
  const filteredItems = shopItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Shop Plants for Your Indian Home</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Discover quality plants perfect for Indian balconies and terraces.
            All plants come with care instructions for our local climate.
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
              placeholder="Search plants..."
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
            <h3 className="text-xl font-medium text-gray-700">No plants match your search</h3>
            <p className="text-gray-500 mt-2">Try changing your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
