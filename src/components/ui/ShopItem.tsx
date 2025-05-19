
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { ShopItem as ShopItemType } from '@/data/shopItems';
import { useCart } from '@/hooks/useCart';

interface ShopItemProps {
  item: ShopItemType;
}

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addToCart(item.id, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 rounded-full bg-black/70">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center bg-white/90 text-amber-500 text-xs rounded-full px-2 py-1">
            <Star className="fill-amber-500 h-3 w-3 mr-1" />
            {item.rating}
          </span>
        </div>
      </div>
      
      <CardHeader className="p-3 pb-0">
        <div className="space-y-1">
          <h3 className="font-medium text-base leading-tight">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-2 text-sm flex-grow">
        <p className="line-clamp-2 text-gray-600 text-xs">{item.description}</p>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex flex-col space-y-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-ur-green font-medium">₹{item.price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6" 
              onClick={decrement}
              disabled={!item.inStock}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6" 
              onClick={increment}
              disabled={!item.inStock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full bg-ur-green hover:bg-ur-green/90 text-white" 
          size="sm"
          onClick={handleAddToCart}
          disabled={!item.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopItem;
